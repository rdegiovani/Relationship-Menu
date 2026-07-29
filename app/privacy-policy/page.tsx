'use client';

import Link from 'next/link';
import { useTranslations } from '../components/LanguageProvider';
import { Container } from '../components/ui/Container';

export default function PrivacyPolicy() {
  const t = useTranslations().privacyPage;

  return (
    <Container className="max-w-7xl">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--main-text-color)] mb-4">{t.privacyPolicy}</h1>
        <div className="w-24 h-1 bg-[var(--main-bg-color)] mx-auto rounded-full"></div>
      </div>
      
      {/* Core privacy principles (Web + App) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-8 mb-10 transition-all hover:shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-[var(--main-bg-color)] bg-opacity-20 dark:bg-opacity-40 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--main-text-color)] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--main-text-color)]">{t.corePrivacyPrinciplesWebApp}</h2>
        </div>
        
        <div className="pl-3 sm:pl-14">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">{t.theRelationshipMenuWebsiteAnd}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-xl transition-all hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-[var(--main-text-color)]">{t.n100LocalProcessing}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-3 sm:ml-11">{t.allMenuDataIsProcessed}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-xl transition-all hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-[var(--main-text-color)]">{t.noDataCollectionWithoutConsent}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-3 sm:ml-11">{t.neitherTheWebsiteNorThe}</p>
            </div>
          </div>
          
          <div className="bg-blue-50/70 dark:bg-blue-900/20 border-l-4 border-blue-300 dark:border-blue-700 p-4 sm:p-6 rounded-r-xl mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start">
              <div className="flex-shrink-0 mr-3 mb-2 sm:mb-0 sm:mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-blue-700 dark:text-blue-400">{t.sharingYourMenuWithOthers}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t.thereAreThreeWaysTo}</p>
                
                <div className="mt-4 space-y-4">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 13a5 5 0 007.07 0l1.414-1.414a5 5 0 00-7.07-7.07L10 5.93M14 11a5 5 0 00-7.07 0l-1.414 1.414a5 5 0 007.07 7.07l1.414-1.414" />
                    </svg>{t.shareAsLink}</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-3 sm:ml-6">{t.shareACopyOfYour}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-3 sm:ml-6 mb-2">{t.theKeyToDecryptThe}</p>
                  </div>

                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>{t.exportingAsPdf}</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-3 sm:ml-6">{t.exportYourMenuAsA}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-3 sm:ml-6 mb-2">{t.theExportedPdfFileCan}</p>
                  </div>

                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>{t.downloadingAsMenuFileJson}</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-3 sm:ml-6">{t.downloadYourMenuAsA}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm ml-3 sm:ml-6 mb-2">{t.canBeUsedToPut}</p>
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">{t.privacyBenefitsOfAllSharing}</h4>
                <ul className="list-disc ml-3 sm:ml-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>{t.yourPersonalDataRemainsOn}</li>
                  <li>{t.youMaintainAbsoluteControlOver}</li>
                </ul>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <div className="bg-blue-50/70 dark:bg-blue-900/30 p-2 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h5 className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-1">{t.linkAdvantages}</h5>
                    <ul className="list-disc ml-4 sm:ml-5 text-sm text-gray-700 dark:text-gray-300">
                      <li>{t.protectedWithEndToEnd}</li>
                      <li>{t.validFor5Days5}</li>
                      <li>{t.easyToShareViaMessaging}</li>
                      <li>{t.editableOnThisWebsiteOr}</li>
                    </ul>
                  </div>
                  <div className="bg-green-50/70 dark:bg-green-900/30 p-2 rounded-lg border border-green-100 dark:border-green-800">
                    <h5 className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-1">{t.pdfAdvantages}</h5>
                    <ul className="list-disc ml-4 sm:ml-5 text-sm text-gray-700 dark:text-gray-300">
                      <li>{t.professionalPresentation}</li>
                      <li>{t.readyForPrinting}</li>
                      <li>{t.widelyCompatibleFormat}</li>
                      <li>{t.containsJsonMenuData}</li>
                      <li>{t.editableOnThisWebsiteOr}</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50/70 dark:bg-yellow-900/30 p-2 rounded-lg border border-yellow-100 dark:border-yellow-800">
                    <h5 className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-1">{t.jsonFileAdvantages}</h5>
                    <ul className="list-disc ml-4 sm:ml-5 text-sm text-gray-700 dark:text-gray-300">
                      <li>{t.permanentOfflineStorage}</li>
                      <li>{t.easyBackupAndArchiving}</li>
                      <li>{t.versionControlPossibilities}</li>
                      <li>{t.editableOnThisWebsiteOr}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legal Requirements Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-8 mb-10 transition-all hover:shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-[var(--main-bg-color)] bg-opacity-20 dark:bg-opacity-40 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--main-text-color)] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--main-text-color)]">{t.legalRequirements}</h2>
        </div>
        
        <div className="pl-3 sm:pl-14 space-y-8">
          {/* Contact Information Section */}
          <div>
            <h3 className="text-xl font-medium mb-6 text-[var(--main-text-color)]">{t.n1GeneralInformationAndMandatory}</h3>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-xl">
              <div className="flex items-center border-b border-gray-200 dark:border-gray-600 pb-4 mb-6">
                <h4 className="text-lg font-bold text-[var(--main-text-color)]">{t.dataControllerInformation}</h4>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="mb-6 md:mb-0 md:pr-6 md:w-1/2">
                  <p className="font-medium text-lg text-[var(--main-text-color)] mb-2">{t.address}</p>
                  <p className="mb-1 dark:text-gray-300">{t.paulVincentRoll}</p>
                  <p className="mb-1 dark:text-gray-300">{t.gurtelstrae13}</p>
                  <p className="mb-1 dark:text-gray-300">{t.n13088Berlin}</p>
                  <p className="dark:text-gray-300">{t.germany}</p>
                </div>
                
                <div className="md:border-l border-gray-200 dark:border-gray-600 md:pl-6 md:w-1/2">
                  <p className="font-medium text-lg text-[var(--main-text-color)] mb-2">{t.contact}</p>
                  <p className="flex items-center mb-3 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[var(--main-text-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +49 173 1626294
                  </p>
                  <p className="flex items-center dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[var(--main-text-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>{t.paulVincentRelationshipmenuOrg}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">{t.theResponsiblePartyIsThe}</p>
              </div>
            </div>
          </div>
          
          {/* Data collection (Web + App) */}
          <div>
            <h3 className="text-xl font-medium mb-3 text-[var(--main-text-color)]">{t.n2DataCollectionWebApp}</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-xl mb-6">
              <h4 className="text-lg font-medium mb-3 text-[var(--main-text-color)]">{t.n21SharingYourMenu}</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.toLetYouShareA}</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.eachTimeYouCreateA}</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.theGeneratedEncryptionKeyIs}</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.sharingLinksRemainValidFor}</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.noIpAddressesOrAny}</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.menusAreOnlyUploadedWhen}</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.pleaseKeepYourLinkPrivate}</p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded-r-lg">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.menuDataIsStoredAnd}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t.youCanDeleteAnUploaded}</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-xl">
              <h4 className="text-lg font-medium mb-3 text-[var(--main-text-color)]">{t.n22ServerLogFiles}</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.whenYouAccessTheWebsite}</p>
              
              <div className="bg-white dark:bg-gray-600 p-4 rounded-lg border border-gray-200 dark:border-gray-500 mb-4">
                <p className="font-medium mb-2 text-gray-800 dark:text-gray-200">{t.theseLogFilesInclude}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <ul className="list-disc ml-4 sm:ml-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>{t.ipAddressOfTheDevice}</li>
                    <li>{t.hostNameOfTheRequesting}</li>
                    <li>{t.timestampAndDurationOfThe}</li>
                    <li>{t.requestLineIndicatingTheRequested}</li>
                  </ul>
                  <ul className="list-disc ml-4 sm:ml-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>{t.httpStatusCodeReturnedBy}</li>
                    <li>{t.amountOfDataTransmittedDuring}</li>
                    <li>{t.userAgentStringIncludingBrowser}</li>
                    <li>{t.referrerUrlTheWebpageThat}</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.thisDataMayAlsoBe}</p>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded-r-lg">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.theProcessingOfThisData}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t.logFilesAreRetainedFor}</p>
              </div>
            </div>
          </div>
          
          {/* Website-specific details (Website only) */}
          <div>
            <h3 className="text-xl font-medium mb-3 text-[var(--main-text-color)]">{t.n3WebsiteSpecificDetailsWebsite}</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-xl mb-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-500 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a5 5 0 10-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2zM7 9V7a3 3 0 016 0v2" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-[var(--main-text-color)]">{t.localStorageOnly}</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-3 sm:ml-11 mb-4">{t.yourRelationshipMenuIsSaved}</p>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-500 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-[var(--main-text-color)]">{t.noTrackingCookies}</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-3 sm:ml-11">{t.noCookiesAreUsedTo}</p>
            </div>
          </div>

          {/* App–specific details (iOS app only) */}
          <div>
            <h3 className="text-xl font-medium mb-3 text-[var(--main-text-color)]">{t.n4AppAppspecificPrivacyDetails}</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-xl space-y-6">
              {/* Device Storage & Backups */}
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-500 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3-.895 3-2s-1.343-2-3-2-3 .895-3 2 1.343 2 3 2zM5.5 20a2.5 2.5 0 01-2.5-2.5V12a2 2 0 012-2h14a2 2 0 012 2v5.5A2.5 2.5 0 0119.5 20h-14z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-[var(--main-text-color)]">{t.deviceStorageBackups}</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-3 sm:ml-11">{t.allYourRelationshipMenusAre}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-3 sm:ml-11">{t.advancedDataProtectionMayNot}<a href="https://support.apple.com/en-us/108756" className="text-[var(--main-text-color)] hover:underline" target="_blank" rel="noopener noreferrer">{t.applesDocumentation}</a>.
                </p>
              </div>

              {/* On‑Device Encryption */}
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-500 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-.895 3-2V7a3 3 0 10-6 0v2c0 1.105 1.343 2 3 2zM5 11h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-[var(--main-text-color)]">{t.ondeviceEncryption}</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-3 sm:ml-11">{t.theMenuFilesOnYour}</p>
              </div>

              {/* App Lock */}
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-500 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-.895 3-2V7a3 3 0 10-6 0v2c0 1.105 1.343 2 3 2zM5 11h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-[var(--main-text-color)]">{t.appLockFaceIdTouch}</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-3 sm:ml-11">{t.biometricLockUsesFaceId}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-3 sm:ml-11">{t.learnMoreAboutFaceId}<a href="https://support.apple.com/en-gb/guide/security/sec067eb0c9e/web" className="text-[var(--main-text-color)] hover:underline" target="_blank" rel="noopener noreferrer">{t.applesSecurityGuide}</a>.
                </p>
              </div>

              {/* Apple Device Analytics */}
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-500 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V7a4 4 0 10-8 0v4m0 0v4a4 4 0 004 4h4a4 4 0 004-4v-4m-8 0h8" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-[var(--main-text-color)]">{t.appleDeviceAnalytics}</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-3 sm:ml-11">{t.likeAllIosAppsApple}<a href="https://support.apple.com/en-ph/108971" className="text-[var(--main-text-color)] hover:underline" target="_blank" rel="noopener noreferrer">{t.applesAnalyticsInfo}</a>.
                </p>
              </div>
            </div>
          </div>
          
          {/* Third Party Section */}
          <div>
            <h3 className="text-xl font-medium mb-3 text-[var(--main-text-color)]">{t.n5DataProcessingByThird}</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-500 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-[var(--main-text-color)]">{t.phasedrei}</h4>
              </div>
              
              <div className="ml-3 sm:ml-11 space-y-3">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t.thisWebsiteUses}<a href="https://phasedrei.de" className="text-[var(--main-text-color)] hover:underline" target="_blank" rel="noopener noreferrer">{t.phasedrei}</a>{t.richardWagnerRing2e67227}</p>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t.theCollectedDataMentionedIn}</p>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t.aDataProcessingAgreementIs}</p>
                
                <div className="flex items-center bg-white dark:bg-gray-600 p-3 rounded-lg border border-gray-200 dark:border-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{t.thePrivacyPolicyOfPhasedrei}<a href="https://phasedrei.de/datenschutz/" className="text-[var(--main-text-color)] hover:underline break-words" target="_blank" rel="noopener noreferrer">{t.httpsPhasedreiDeDatenschutz}</a>
                  </p>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">{t.theUseOfPhasedreiIs}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Apple trademark credit (very small) */}
      <div className="mt-2 text-center">
        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{t.appleTheAppleLogoIphone}</p>
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