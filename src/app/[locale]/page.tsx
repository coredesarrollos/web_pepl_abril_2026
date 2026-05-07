import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { FeatureCards } from '@/components/sections/FeatureCards';
import { Manifesto } from '@/components/sections/Manifesto';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Audiences } from '@/components/sections/Audiences';
import { ValueStats } from '@/components/sections/ValueStats';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Problem />
        <FeatureCards />
        <Manifesto />
        <HowItWorks />
        <Audiences />
        <ValueStats />
        <CtaBlock />
      </main>
      <SiteFooter />
    </>
  );
}
