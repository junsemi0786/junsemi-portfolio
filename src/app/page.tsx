import Hero from '@/components/home/Hero';
import HomePageContent from '@/components/home/HomePageContent';
import { getMainPageData } from '@/lib/main-page-db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getMainPageData();

  return (
    <main>
      <Hero
        badge={data.hero.badge}
        titleLine1={data.hero.titleLine1}
        titleLine2={data.hero.titleLine2}
        description={data.hero.description}
        stats={data.stats}
      />
      <HomePageContent
        ctaTitle={data.cta.title}
        ctaDescription={data.cta.description}
      />
    </main>
  );
}

