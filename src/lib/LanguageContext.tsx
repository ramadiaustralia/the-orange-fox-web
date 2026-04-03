'use client';
import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { Locale, translations, TranslationKey } from './i18n';
import { supabase } from './supabase';

export interface MenuItem {
  id: string;
  location: string;
  label: string;
  href: string;
  sort_order: number;
  is_visible: boolean;
  locale: string;
}

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  getSetting: (key: string, fallback?: string) => string;
  cmsReady: boolean;
  menuItems: MenuItem[];
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
  getSetting: (key, fallback) => fallback || '',
  cmsReady: false,
  menuItems: [],
});

// Module-level cache so data persists across component remounts
let cachedTranslations: Record<string, Record<string, string>> | null = null;
let cachedMenuItems: MenuItem[] | null = null;
let fetchPromise: Promise<void> | null = null;

async function fetchCMSData() {
  if (cachedTranslations && cachedMenuItems) return;
  
  try {
    const [contentRes, menuRes] = await Promise.all([
      supabase.from('site_content').select('content_key, content_value, locale'),
      supabase.from('menu_items').select('*').eq('is_visible', true).order('sort_order'),
    ]);

    if (contentRes.data) {
      const cms: Record<string, Record<string, string>> = { en: {}, id: {} };
      for (const row of contentRes.data) {
        const loc = row.locale as string;
        if (loc === 'en' || loc === 'id') {
          cms[loc][row.content_key] = row.content_value;
        }
      }
      cachedTranslations = cms;
    }

    if (menuRes.data) {
      cachedMenuItems = menuRes.data as MenuItem[];
    }
  } catch (err) {
    console.warn('Failed to fetch CMS data, using hardcoded translations:', err);
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [cmsReady, setCmsReady] = useState(!!cachedTranslations);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(cachedMenuItems || []);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    if (cachedTranslations && cachedMenuItems) {
      setCmsReady(true);
      setMenuItems(cachedMenuItems);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = fetchCMSData();
    }

    fetchPromise.then(() => {
      setCmsReady(true);
      if (cachedMenuItems) setMenuItems(cachedMenuItems);
    });
  }, []);

  const translate = useCallback(
    (key: TranslationKey) => {
      // CMS data takes priority over hardcoded
      if (cachedTranslations?.[locale]?.[key]) {
        return cachedTranslations[locale][key];
      }
      // Fall back to hardcoded translations
      return translations[locale]?.[key] || translations.en[key] || key;
    },
    [locale]
  );

  // getSetting: reads a CMS value (locale-aware, falls back to 'en', then fallback)
  const getSetting = useCallback(
    (key: string, fallback?: string) => {
      const val =
        cachedTranslations?.[locale]?.[key] ||
        cachedTranslations?.['en']?.[key];
      return val || fallback || '';
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translate, getSetting, cmsReady, menuItems }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
