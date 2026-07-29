import type { Metadata } from 'next';
import { APP_CONFIG } from '../config';
import AppPageContent from './AppPageContent';

export const metadata: Metadata = {
  title: 'Relationship Menu for iPhone and iPad',
  description:
    'Design your connections. Create unique relationship agreements, free from traditional and societal expectations. iPhone and iPad app with PDF export, encrypted sharing, and web compatibility.',
  alternates: { canonical: '/app' },
  openGraph: {
    title: 'Relationship Menu for iPhone and iPad',
    description:
      'Design your connections. Create unique relationship agreements, free from traditional and societal expectations.',
    url: 'https://relationshipmenu.org/app',
    type: 'website',
  },
  other: {
    'apple-itunes-app': `app-id=${APP_CONFIG.APP_STORE_ID}`,
  },
};

export default function IOSAppPage() {
  return <AppPageContent />;
}
