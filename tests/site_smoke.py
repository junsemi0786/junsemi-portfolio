"""Read-only HTTP checks against a running production build (not next dev)."""
import argparse,json,re,urllib.request,urllib.error,urllib.parse,xml.etree.ElementTree as ET
from pathlib import Path
from html.parser import HTMLParser
parser=argparse.ArgumentParser();parser.add_argument('base');parser.add_argument('--indexable',action='store_true');args=parser.parse_args();base=args.base.rstrip('/')
class Page(HTMLParser):
 def __init__(self):super().__init__();self.meta={};self.canonical='';self.h1=0;self.links=[];self.title='';self.in_title=False;self.skip=0;self.visible='';self.jsons=[];self.json_buffer=None
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if tag=='title':self.in_title=True
  if tag in ['script','style']:self.skip+=1
  if tag=='script' and a.get('type')=='application/ld+json':self.json_buffer=''
  if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if tag=='link' and a.get('rel')=='canonical':self.canonical=a['href']
  if tag=='a':self.links.append(a.get('href',''))
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if tag in ['script','style']:self.skip=max(0,self.skip-1)
  if tag=='script' and self.json_buffer is not None:self.jsons.append(json.loads(self.json_buffer));self.json_buffer=None
 def handle_data(self,data):
  if self.in_title:self.title+=data
  if not self.skip:self.visible+=data
  if self.json_buffer is not None:self.json_buffer+=data
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*a,**kw):return None
def fetch(path,headers=None,redirect=True):
 request=urllib.request.Request(base+urllib.parse.quote(path,safe='/?=&'),headers=headers or {})
 try:
  response=(urllib.request.urlopen(request) if redirect else urllib.request.build_opener(NoRedirect).open(request))
  return response.status,response.read().decode(),dict(response.headers)
 except urllib.error.HTTPError as e:return e.code,e.read().decode(),dict(e.headers)
code,sitemap,_=fetch('/sitemap.xml');assert code==200
urls=[e.text for e in ET.fromstring(sitemap).findall('{*}url/{*}loc')]
assert len(urls)==len(set(urls))
original=json.loads(Path('data/cases.json').read_text());drafts=[c for c in original if c['status']=='draft']
internal=set()
for url in urls:
 assert url.startswith('https://junsemi.co.kr')
 route=urllib.parse.urlparse(url).path or '/'
 code,body,_=fetch(route);assert code==200,(route,code)
 p=Page();p.feed(body)
 assert p.h1==1,(route,'h1',p.h1)
 assert 'JUNgenius' in p.title,(route,'title')
 assert p.meta.get('description'),(route,'description')
 assert p.canonical.rstrip('/')==url.rstrip('/'),(route,p.canonical,url)
 assert ('noindex' not in p.meta.get('robots',''))==args.indexable,(route,'robots')
 assert p.jsons,(route,'JSON-LD')
 assert not re.search(r'010[- ]?6659[- ]?0786|tel:',body),(route,'telephone')
 assert 'engineering-platform.com' not in body,(route,'wrong domain')
 for d in drafts:assert d['projectName'] not in body,(route,'draft leak in production payload')
 internal.update(h for h in p.links if h.startswith('/') and not h.startswith('/admin'))
for href in internal:
 path=urllib.parse.urlsplit(href).path
 if path.startswith('/images/'):
  assert (Path('public')/urllib.parse.unquote(path).lstrip('/')).is_file(),path
 else:
  code,_,_=fetch(href);assert code==200,(href,code)
for c in drafts:
 code,_,_=fetch('/cases/'+c['id']);assert code==404
 assert c['id'] not in sitemap
code,rss,_=fetch('/rss.xml');assert code==200;ET.fromstring(rss)
for c in drafts:assert c['projectName'] not in rss
for forged in [None,'admin_session=true','admin_session=forged']:
 code,_,headers=fetch('/admin/cases',headers={'Cookie':forged} if forged else {},redirect=False)
 assert code in [307,308] and headers.get('location',headers.get('Location','')).endswith('/admin/login'),(code,headers)
code,robots,_=fetch('/robots.txt');assert code==200 and 'https://junsemi.co.kr/sitemap.xml' in robots
assert ('Allow: /' in robots)==args.indexable
code,_,headers=fetch('/knowledge',redirect=False);assert code==308
result={'pages':len(urls),'internal_links_checked':len(internal),'original_published':len(original)-len(drafts),'drafts_hidden':len(drafts),'indexable':args.indexable,'forged_admin_cookies_rejected':True,'phone_removed':True,'canonical_and_jsonld':'pass'}
print(json.dumps(result,ensure_ascii=False,indent=2))
