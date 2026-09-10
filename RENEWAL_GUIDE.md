# JUNgenius 홈페이지 리뉴얼

GitHub 원본 Next.js 홈페이지에 어두운 그레이·오렌지 디자인, 기술 서비스 4종, 문제 해결 가이드 4편, 이메일 전용 문의를 반영했습니다. 대표 강성준 이름과 기존 프로젝트 ID·사진을 유지합니다. 기존 공개 프로젝트 7건과 FSI Mercury 초안 1건을 보존했습니다.

## 프로젝트 추가·수정

1. 홈페이지 하단 **관리자** → 로그인 → **프로젝트 관리**에서 추가하거나 수정합니다.
2. 제목은 장비와 작업을 구체적으로 적습니다. 예: `정수장 CIMON SCADA 전력량계 데이터 연동`. 요약에는 문제와 실제 수행 범위를 적습니다.
3. 상세 내용은 `## 현장 문제`, `## 수행 작업`, `## 확인 결과` 순서로 작성합니다. 근거 없는 절감률이나 고장 예방률은 넣지 않습니다.
4. 기존 방식대로 GitHub의 `public/images/`에 사진을 넣은 뒤 `/images/파일명.jpg` 경로를 입력합니다. 대표 사진과 여러 갤러리 사진을 사용할 수 있습니다. 지원 형식은 JPG·PNG·WebP·GIF입니다.
5. **초안**은 공개 목록·상세 URL·사이트맵·RSS에서 제외됩니다. **공개**로 저장하면 해당 페이지와 검색 피드에 반영됩니다. 검색 결과에 실제 반영되는 시점은 검색엔진에 따라 다릅니다.

운영 프로젝트의 저장소는 기존과 동일한 Redis의 `cases_data`입니다. 로컬 파일을 운영 Redis에 덮어쓰는 마이그레이션은 없습니다. 기존 데이터가 빈 배열인 경우에도 예전 프로젝트가 되살아나지 않도록 수정했습니다. Redis 연결 실패 시 오래된 파일로 덮어쓰지 않습니다.

FSI Mercury 원본 초안은 그대로 비공개입니다. CVD CMS, 정수장 전력량계 및 추가 Etch Loadlock 사례는 실제 작업 범위·사진·공개 가능 정보를 확인한 뒤 등록해야 합니다. 관련 기획 초안은 `CASE_STUDY_DRAFTS.md`를 참고하세요.

## 문의와 회사 정보

전화·팩스 표시와 전화번호 수집을 제거했습니다. 문의는 `hello@junsemi.co.kr` 이메일을 사용합니다. 문의 양식은 사용자의 브라우저에서 메일 초안을 만들며, **메일 앱에서 보내기를 완료해야 발송됩니다**. 웹메일 이용자는 내용을 복사해 보내면 됩니다. 별도 SMTP 설정은 필요하지 않습니다.

관리자의 **문의처 정보**에서 이메일과 주소를 수정할 수 있습니다. 기존 Redis에 전화·팩스 필드가 남아 있어도 공개 화면에 전달하지 않습니다. 메인 문구는 **메인 페이지 관리**에서 수정합니다. 기존의 검증되지 않은 100% 성공률·24시간 지원 문구를 다시 노출하지 않도록 메인 문구만 새 키 `main_page_data_v2`를 사용합니다. 기존 키와 프로젝트 데이터는 보존합니다. 기술 역량 목록은 기존 `expertise_data`를 계속 사용합니다. 새 서비스 설명과 문제 해결 가이드는 `src/lib/service-content.json`, `src/lib/guide-content.json`에서 수정합니다.

## 로컬 실행

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3000
```

프로젝트 편집을 로컬에서 시험하려면 `.env.local`에 `LOCAL_CONTENT=true`와 로컬 전용 `ADMIN_PASSWORD`를 설정하세요. **운영 REDIS_URL을 넣지 않은 상태에서** 실행하면 `.local-data/`에만 저장합니다. 이 폴더는 Git에 포함되지 않습니다. 운영 모드에서는 로컬 파일 저장을 허용하지 않습니다.

검증:

```sh
npm run lint
npm run build
node --test tests/session.test.mjs
python3 tests/site_smoke.py http://127.0.0.1:3001 --indexable
```

마지막 검사는 `SITE_INDEXABLE=true`로 빌드하고 같은 환경변수로 3001 포트에 실행한 배포용 서버를 대상으로 합니다.

## 배포 시 유지할 설정

- 기존 Vercel 프로젝트·도메인 연결과 **REDIS_URL**을 유지합니다. 새로운 DB를 만들거나 기존 DB를 초기화하지 않습니다.
- 기존 Redis 관리자 비밀번호 또는 **ADMIN_PASSWORD**가 필요합니다. 코드에 있던 기본 비밀번호는 제거했습니다. 배포 후 기존 로그인 쿠키는 더 이상 유효하지 않으므로 다시 로그인합니다.
- 선택적으로 **ADMIN_SESSION_SECRET**에 별도 비밀값을 설정할 수 있습니다. 기존 비밀번호를 변경해도 모든 기존 세션은 무효화됩니다.
- Vercel **Production**은 기본적으로 검색 수집을 허용합니다. **Preview**와 개발 서버는 검색 제외입니다. `SITE_INDEXABLE=false`로 운영 수집을 끌 수 있고, Vercel 외 운영 환경에서는 빌드와 실행 모두 `SITE_INDEXABLE=true`를 설정합니다.
- `.env.local`, `.local-data/`, 실제 접속 비밀번호와 Redis 연결 문자열은 Git에 올리지 않습니다.
- 메일용 MX 레코드는 이 리뉴얼과 관계없으며 변경할 필요가 없습니다.

## 네이버·구글 검색 등록

잘못된 `engineering-platform.com` 주소를 제거하고 실제 도메인 `https://junsemi.co.kr`로 canonical·사이트맵·RSS·구조화 데이터를 통일했습니다. 새 프로젝트는 `/sitemap.xml`과 `/rss.xml`에 자동 반영됩니다. 제목·설명·본문은 PLC 통신 오류, CIMON 알람·보고서, 단종 PLC 교체, 자동제어 예방점검 등 실제 고객 문제에 맞췄습니다.

운영 배포 후 사이트 소유 계정으로 네이버 서치어드바이저와 Google Search Console에 사이트를 확인하고 `https://junsemi.co.kr/sitemap.xml`을 제출합니다. 네이버에는 `https://junsemi.co.kr/rss.xml`도 제출할 수 있습니다. 소유 확인용 메타 태그 값은 Vercel의 `NAVER_SITE_VERIFICATION`, `GOOGLE_SITE_VERIFICATION`에 각각 넣고 다시 배포하면 적용됩니다. 검색 순위나 즉시 색인은 보장되지 않습니다. [네이버 공식 제출 안내](https://searchadvisor.naver.com/guide/request-feed), [Google 공식 사이트맵 안내](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

이번 작업에서는 운영 배포, 운영 Redis 변경, 검색 서비스 소유 확인·제출을 실행하지 않았습니다.
