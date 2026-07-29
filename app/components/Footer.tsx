'use client';

import Link from "next/link";
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from './LanguageProvider';

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations().nav;

  // Define paths where we should hide the footer
  const menuPaths = useMemo(() => ['/editor/'], []);
  const hideSourceOnPaths = useMemo(() => ['/app'], []);

  // Don't show footer on specific menu paths
  const showFooter = !menuPaths.some(path => pathname?.startsWith(path));

  if (!showFooter) return null;

  return (
    <footer className="text-center py-6 text-gray-500 dark:text-gray-400">
      <div className="border-t border-gray-300 dark:border-gray-700 w-4/5 mx-auto mt-5 mb-2.5 pt-5">
        <div className="flex gap-4 justify-center flex-wrap">
          <p><Link href="/support" className="hover:underline">{t.support}</Link></p>
          {!hideSourceOnPaths.some(path => pathname?.startsWith(path)) && (
            <p><Link href="https://github.com/rdegiovani/Relationship-Menu" className="hover:underline">{t.sourceCode}</Link></p>
          )}
          <p><Link href="/privacy-policy" className="hover:underline">{t.privacyPolicy}</Link></p>
          <p><Link href="/legal-disclosure" className="hover:underline">{t.legalDisclosure}</Link></p>
        </div>
      </div>
    </footer>
  );
}