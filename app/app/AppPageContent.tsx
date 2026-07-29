'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '../components/ui/Container';
import { APP_CONFIG } from '../config';
import { useTranslations } from '../components/LanguageProvider';

const screenshots = [
  '/app/screenshots/1.jpg',
  '/app/screenshots/2.jpg',
  '/app/screenshots/3.jpg',
  '/app/screenshots/4.jpg',
];

const appStoreUrl = APP_CONFIG.APP_STORE_URL;

export default function AppPageContent() {
  const t = useTranslations().appPage;

  return (
    <Container>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[rgba(158,198,204,0.3)] to-[rgba(99,159,169,0.2)] dark:from-[rgba(158,198,204,0.15)] dark:to-[rgba(99,159,169,0.1)] px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--main-text-color)]">{t.heading}</h1>
          </div>
          <div className="p-6">
            <div className="flex flex-col min-[420px]:flex-row items-center min-[420px]:items-start gap-4 md:gap-6">
              <div className="shrink-0 mb-3 min-[420px]:mb-0">
                <Image src="/app/icon.png" alt={t.iconAlt} width={96} height={96} />
              </div>
              <div className="space-y-4 flex-1">
                <p className="text-[rgba(79,139,149,1)] font-semibold text-xs uppercase tracking-wide text-center min-[420px]:text-left">{t.tagline}</p>
                <div className="pl-4 border-l-4 border-[var(--main-bg-color)] italic space-y-3">
                  <p className="text-gray-600 dark:text-white/90 leading-relaxed text-base md:text-[17px]">
                    {t.intro1}
                  </p>
                  <p className="text-gray-600 dark:text-white/90 leading-relaxed text-base md:text-[17px]">
                    {t.intro2}
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-1 justify-center min-[420px]:justify-start">
                  <Link href={appStoreUrl} target="_blank" rel="noopener" className="inline-flex items-center my-3 md:my-4">
                    <Image src="/app/app_store_light.svg" alt={t.appStoreAlt} width={240} height={72} className="h-12 md:h-14 w-auto block dark:hidden" />
                    <Image src="/app/app_store_dark.svg" alt={t.appStoreAlt} width={240} height={72} className="h-12 md:h-14 w-auto hidden dark:block" />
                  </Link>
                  <span className="text-xs text-[rgba(79,139,149,1)]">{t.freeNoTracking}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {/* Screenshots card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[rgba(158,198,204,0.3)] to-[rgba(99,159,169,0.2)] dark:from-[rgba(158,198,204,0.15)] dark:to-[rgba(99,159,169,0.1)] px-6 py-4">
              <h2 className="text-xl font-bold text-[var(--main-text-color)]">{t.screenshotsTitle}</h2>
            </div>
            <div className="p-6">
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2" style={{scrollbarWidth: 'thin'}}>
                  {screenshots.map((src, idx) => (
                    <div key={src} className="snap-center shrink-0 rounded-xl overflow-hidden border border-[var(--main-bg-color)] dark:border-gray-700">
                      <Image src={src} alt={t.screenshotAlt(idx + 1)} width={900} height={1958} className="w-[260px] md:w-[320px] h-auto" />
                    </div>
                  ))}
                </div>
                <div className="text-xs text-[rgba(79,139,149,1)] mt-2">{t.swipeHint}</div>
              </div>
            </div>
          </div>

          {/* Features card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[rgba(158,198,204,0.3)] to-[rgba(99,159,169,0.2)] dark:from-[rgba(158,198,204,0.15)] dark:to-[rgba(99,159,169,0.1)] px-6 py-4">
              <h2 className="text-xl font-bold text-[var(--main-text-color)]">{t.featuresTitle}</h2>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[var(--main-text-color)] dark:text-[var(--main-text-color)]">{t.builderTitle}</h3>
              <ul className="mt-3 list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                <li>{t.builder1}</li>
                <li>{t.builder2}</li>
                <li>{t.builder3}</li>
                <li>{t.builder4}</li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold text-[var(--main-text-color)] dark:text-[var(--main-text-color)]">{t.notesTitle}</h3>
              <ul className="mt-3 list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                <li>{t.notes1}</li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold text-[var(--main-text-color)] dark:text-[var(--main-text-color)]">{t.privacyTitle}</h3>
              <ul className="mt-3 list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                <li>{t.privacy1}</li>
                <li>{t.privacy2}</li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold text-[var(--main-text-color)] dark:text-[var(--main-text-color)]">{t.exportTitle}</h3>
              <ul className="mt-3 list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                <li>{t.export1}</li>
                <li>{t.export2}</li>
                <li>{t.export3}</li>
                <li>{t.export4}</li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold text-[var(--main-text-color)] dark:text-[var(--main-text-color)]">{t.internationalTitle}</h3>
              <ul className="mt-3 list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                <li>{t.international1}</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Apple trademark credit (very small) */}
        <div className="mt-6 md:mt-8 text-center">
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
            {t.appleTrademark}
          </p>
        </div>
      </div>
    </Container>
  );
}


