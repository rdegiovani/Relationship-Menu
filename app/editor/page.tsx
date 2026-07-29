'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RelationshipMenu } from '../components/RelationshipMenu/RelationshipMenu';
import { LoadingIndicator } from '../components/ui/LoadingIndicator';
import { Container } from '../components/ui/Container';
import { MenuMode, MenuData } from '../types';
import { getMenuById, saveMenu, getAllMenus } from '../utils/menuStorage';
import { migrateMenuData } from '../utils/migrations';
import { ErrorModal } from '../components/ui/ErrorModal';
import { FileSelector } from '../components/FileSelector';
import TemplateSelector from '../components/TemplateSelector/TemplateSelector';
import { formatPeopleNames } from '../utils/formatUtils';
import { OnboardingWizard } from '../components/OnboardingWizard/index';
import { IconInfo } from '../components/icons';
import { useTranslations } from '../components/LanguageProvider';

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialMode, setInitialMode] = useState<MenuMode>('view');
  const [showFileSelector, setShowFileSelector] = useState(false);
  const dictionary = useTranslations();
  const t = dictionary.editorPage;
  const tour = dictionary.onboarding;
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [error, setError] = useState<{
    show: boolean;
    title: string;
    message: string;
  }>({ show: false, title: '', message: '' });

  // Onboarding steps for the spotlight wizard
  const onboardingSteps = [
    {
      selector: '[data-onboarding="menu-header"]',
      title: tour.peopleTitle,
      description: tour.peopleDescription
    },
    {
      selector: '[data-onboarding="file-button"]',
      title: tour.fileTitle,
      description: tour.fileDescription
    },
    {
      selector: '[data-onboarding="share-button"]',
      title: tour.shareTitle,
      description: tour.shareDescription
    },
    {
      selector: '[data-onboarding="mode-selector"]',
      title: tour.modeTitle,
      description: tour.modeDescription,
      subSteps: [
        {
          title: tour.modeViewTitle,
          description: tour.modeViewDescription
        },
        {
          title: tour.modeFillTitle,
          description: tour.modeFillDescription
        },
        {
          title: tour.modeEditTitle,
          description: tour.modeEditDescription
        }
      ]
    },
    {
      selector: '[data-onboarding="menu-content"]',
      title: tour.menuTitle,
      description: tour.menuDescription
    }
  ];

  // Welcome screen data for the onboarding wizard
  const welcomeScreen = {
    title: tour.welcomeTitle,
    description: tour.welcomeDescription
  };

  // Update document title when menu data changes
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Function to update the title
    const updateTitle = () => {
      if (menuData?.uuid && menuData.uuid.toLowerCase() === 'example') {
        document.title = t.documentTitleExample;
      } else if (menuData?.people && menuData.people.length > 0) {
        // Filter out empty names and join the remaining ones
        const validNames = menuData.people.filter(name => name && name.trim() !== '');
        
        if (validNames.length > 0) {
          document.title = t.documentTitleFor(formatPeopleNames(validNames));
        } else {
          document.title = t.documentTitleEditor;
        }
      } else {
        document.title = t.documentTitleEditor;
      }
    };

    // Update immediately
    updateTitle();
    
    // And also after a short delay to ensure it happens after any other rendering
    const timeoutId = setTimeout(updateTitle, 500);
    
    return () => clearTimeout(timeoutId);
  }, [menuData, t]);

  // Load the menu from URL parameters
  useEffect(() => {
    const loadMenuFromParams = async () => {
      setIsLoading(true);
      setError({ show: false, title: '', message: '' });
      setShowFileSelector(false);
      setShowTemplateSelector(false);
      
      try {
        // Extract ID and mode from search params
        const menuId = searchParams.get('id');
        const modeParam = searchParams.get('mode') as MenuMode | null;
        
        // Set the initial mode from URL parameter if it exists
        if (modeParam && ['view', 'fill', 'edit'].includes(modeParam)) {
          setInitialMode(modeParam);
          
          // Remove the mode parameter from the URL after using it, without triggering a re-render
          if (menuId && typeof window !== 'undefined') {
            // Small delay to ensure the mode is applied before cleaning the URL
            setTimeout(() => {
              // Create a clean URL without the mode parameter
              const url = new URL(window.location.href);
              url.searchParams.delete('mode');
              
              // Update browser history without triggering navigation or re-render
              window.history.replaceState(null, '', url.toString());
            }, 500); // Increased delay for more reliable mode application
          }
        }
        
        if (!menuId) {
          console.warn('No menu ID found in URL parameters');
          setIsLoading(false);
          
          // Check if there are any saved menus
          const menus = getAllMenus();
          
          // Show the appropriate selector
          if (menus.length > 0) {
            setShowFileSelector(true);
          } else {
            setShowTemplateSelector(true);
          }
          return;
        }

        // Handle example menu
        if (menuId === 'example') {
          try {
            const response = await fetch('/example-menu.json');
            if (!response.ok) {
              throw new Error(t.exampleLoadFailed);
            }
            const exampleMenu = await response.json();
            // Apply migration to ensure example menu is in the latest format
            const migratedExampleMenu = migrateMenuData(exampleMenu);
            // Preserve sentinel UUID for example menu to enable special handling
            const exampleMenuData = { ...migratedExampleMenu, uuid: 'example' } as MenuData;
            setMenuData(exampleMenuData);
            setIsLoading(false);
            return;
          } catch (error) {
            console.error('Error loading example menu:', error);
            setError({
              show: true,
              title: t.errorLoadingExampleTitle,
              message: t.errorLoadingExampleMessage
            });
            setIsLoading(false);
            return;
          }
        }
        
        // Try to load menu from localStorage
        const menu = getMenuById(menuId);
        
        if (!menu) {
          console.warn(`Menu with ID ${menuId} not found`);
          setIsLoading(false);
          setError({
            show: true,
            title: t.menuNotFoundTitle,
            message: t.menuNotFoundMessage(menuId.substring(0, 6))
          });
          return;
        }
        
        // Set the menu data
        setMenuData(menu);
        setIsLoading(false);
        
        // Notify components that menu data has changed
        window.dispatchEvent(new Event('menuDataChanged'));
      } catch (error) {
        console.error('Error loading menu:', error);
        setIsLoading(false);
        setError({
          show: true,
          title: t.errorLoadingTitle,
          message: t.errorLoadingMessage
        });
      }
    };
    
    // Load menu whenever search params change
    loadMenuFromParams();
    
  }, [searchParams, router, t]);

  // Handle menu data saving
  const handleSaveMenu = (updatedMenu: MenuData) => {
    try {
      // Prevent saving example menu
      if (updatedMenu.uuid && updatedMenu.uuid.toLowerCase() === 'example') {
        console.log('Example menu changes are not saved');
        return;
      }

      // Ensure we have a uuid
      if (!updatedMenu.uuid) {
        console.error('Cannot save menu without UUID');
        return;
      }
      
      // Save the menu
      saveMenu(updatedMenu);
      
      // Update our state
      setMenuData(updatedMenu);
    } catch (error) {
      console.error('Error saving menu:', error);
      setError({
        show: true,
        title: t.errorSavingTitle,
        message: t.errorSavingMessage
      });
    }
  };

  // Handle switching to template selector
  const handleCreateNewMenu = () => {
    setShowFileSelector(false);
    setShowTemplateSelector(true);
  };

  // Handle switching to file selector
  const handleOpenExistingMenu = () => {
    setShowTemplateSelector(false);
    setShowFileSelector(true);
  };

  // Show loading state
  if (isLoading) {
    return (
      <Container>
        <LoadingIndicator message={t.loadingMenu} />
      </Container>
    );
  }
  
  // Show template selector modal if the user wants to create a new menu
  if (showTemplateSelector) {
    return (
      <TemplateSelector 
        isModal={true}
        onMenuPageWithNoMenu={true}
        onClose={handleOpenExistingMenu}
      />
    );
  }
  
  // Show file selector modal if no menu ID provided
  if (showFileSelector) {
    return (
      <FileSelector 
        isModal={true}
        onMenuPageWithNoMenu={true}
        onCreateNewMenu={handleCreateNewMenu}
        onClose={() => router.replace('/')}
      />
    );
  }
  
  // Show error modal if there's an error
  if (error.show) {
    return <ErrorModal title={error.title} message={error.message} buttonText={t.returnHome} />;
  }
  
  // Show the menu if loaded
  if (menuData) {
    return (
      <Container>
        {menuData.uuid && menuData.uuid.toLowerCase() !== 'example' && (
          <OnboardingWizard steps={onboardingSteps} welcomeScreen={welcomeScreen} />
        )}
        {menuData.uuid && menuData.uuid.toLowerCase() === 'example' && (
          <div className="mb-4 p-4 bg-[rgba(148,188,194,0.2)] text-[rgba(79,139,149,1)] rounded-lg flex items-center">
            <IconInfo className="h-5 w-5 mr-2" />
            <span>{t.exampleNotice}</span>
          </div>
        )}
        <RelationshipMenu 
          key={`menu-${initialMode}-${menuData.uuid}`}
          menuData={menuData} 
          onSave={handleSaveMenu}
          initialMode={initialMode}
        />
      </Container>
    );
  }
  
  // Fallback - should never happen as we handle all states above
  return (
    <Container>
      <div className="text-center p-8">
        <h2 className="text-xl mb-4">{t.somethingWrong}</h2>
        <p className="mb-4">{t.unknownState}</p>
        <button 
          onClick={() => router.replace('/')}
          className="px-4 py-2 bg-[rgba(148,188,194,0.2)] hover:bg-[rgba(148,188,194,0.3)] text-[rgba(79,139,149,1)] rounded-md transition-colors"
        >
          {t.returnHome}
        </button>
      </div>
    </Container>
  );
}

// Main page component with Suspense boundary
export default function EditorPage() {
  return (
    <Suspense fallback={<Container><LoadingIndicator /></Container>}>
      <EditorContent />
    </Suspense>
  );
} 