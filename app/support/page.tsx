'use client';

import { Container } from '../components/ui/Container';
import { IconInfo, IconEnvelope } from '../components/icons';
import { useTranslations } from '../components/LanguageProvider';

export const dynamic = 'force-static';

export default function SupportPage() {
  const t = useTranslations().supportPage;

  return (
    <Container>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--main-text-color)] mb-4">{t.title}</h1>
          <div className="w-24 h-1 bg-[var(--main-bg-color)] mx-auto rounded-full"></div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[rgba(158,198,204,0.3)] to-[rgba(99,159,169,0.2)] dark:from-[rgba(158,198,204,0.15)] dark:to-[rgba(99,159,169,0.1)] px-6 py-4 flex items-center">
            <IconEnvelope className="h-6 w-6 text-[var(--main-text-color)] mr-2" />
            <h2 className="text-xl font-bold text-[var(--main-text-color)]">{t.contactTitle}</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700 dark:text-gray-300">{t.contactIntro}</p>
            <p>
              <a href="mailto:paul-vincent@relationshipmenu.org" className="text-[var(--main-text-color)] hover:underline">
                paul-vincent@relationshipmenu.org
              </a>
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              This is a one‑person project I run in my spare time. I read every message, but replies may take a little while — thank you for your patience.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[rgba(158,198,204,0.3)] to-[rgba(99,159,169,0.2)] dark:from-[rgba(158,198,204,0.15)] dark:to-[rgba(99,159,169,0.1)] px-6 py-4 flex items-center">
            <IconInfo className="h-6 w-6 text-[var(--main-text-color)] mr-2" />
            <h2 className="text-xl font-bold text-[var(--main-text-color)]">{t.suggestionsTitle}</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I’d love to hear how you’re using the site or app — what’s working well for you, what’s been helpful, and what could be improved. As a solo developer, it always makes my day to hear that someone enjoyed using something I built!
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
             Suggestions and requests are very welcome; while I can’t promise to build everything, your stories and feedback help me decide what to improve next.
            </p>
            <ul className="mt-4 list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{t.bullet1}</li>
              <li>{t.bullet2}</li>
              <li>{t.bullet3}</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}


