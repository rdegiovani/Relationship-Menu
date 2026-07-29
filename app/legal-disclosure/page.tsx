'use client';

import Link from 'next/link';
import { useTranslations } from '../components/LanguageProvider';
import { Container } from '../components/ui/Container';
import { IconEnvelope } from '../components/icons';

export default function LegalNotice() {
  const t = useTranslations().legalPage;

  return (
    <Container className="max-w-7xl">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--main-text-color)] mb-4">{t.legalDisclosure}</h1>
        <div className="w-24 h-1 bg-[var(--main-bg-color)] mx-auto rounded-full"></div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-8 mb-10 transition-all hover:shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-[var(--main-bg-color)] bg-opacity-20 dark:bg-opacity-40 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--main-text-color)] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--main-text-color)]">{t.contactInformation}</h2>
        </div>
        
        <div className="pl-3 sm:pl-14">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-xl">
              <div className="flex items-center border-b border-gray-200 dark:border-gray-600 pb-4 mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--main-text-color)]">{t.paulVincentRoll}</h3>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="mb-6 md:mb-0 md:pr-6 md:w-1/2">
                  <p className="font-medium text-base sm:text-lg text-[var(--main-text-color)] mb-2">{t.address}</p>
                  <p className="mb-1 dark:text-gray-300">{t.gurtelstrae13}</p>
                  <p className="mb-1 dark:text-gray-300">{t.n13088Berlin}</p>
                  <p className="dark:text-gray-300">{t.germany}</p>
                </div>
                
                <div className="md:border-l border-gray-200 dark:border-gray-600 md:pl-6 md:w-1/2">
                  <p className="font-medium text-base sm:text-lg text-[var(--main-text-color)] mb-2">{t.contact}</p>
                  <p className="flex items-center mb-3 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[var(--main-text-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +49 173 1626294
                  </p>
                  <p className="flex items-center dark:text-gray-300">
                    <IconEnvelope className="h-4 w-4 mr-2 text-[var(--main-text-color)]" />
                    <span className="break-words">{t.paulVincentRelationshipmenuOrg}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-8 mb-10 transition-all hover:shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-[var(--main-bg-color)] bg-opacity-20 dark:bg-opacity-40 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--main-text-color)] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--main-text-color)]">{t.disclaimer}</h2>
        </div>
        
        <div className="pl-3 sm:pl-14 space-y-6 sm:space-y-8">
          <div>
            <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 text-[var(--main-text-color)]">{t.accountabilityForContent}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{t.theContentsOfOurPages}</p>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 text-[var(--main-text-color)]">{t.accountabilityForLinks}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{t.responsibilityForTheContentOf}</p>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 text-[var(--main-text-color)]">{t.oppositionToPromotionalEmails}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{t.weHerebyExpresslyProhibitThe}</p>
          </div>
          
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">{t.quelleUbersetzungsdienstTranslate24hDe}</p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 sm:mt-12 mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center px-4 sm:px-6 py-3 bg-[var(--main-text-color)] text-white rounded-lg hover:bg-[var(--main-text-color-hover)] transition-colors shadow-md hover:shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>{t.backToHome}</Link>
      </div>
    </Container>
  );
} 