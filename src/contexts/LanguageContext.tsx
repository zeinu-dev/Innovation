import React, { createContext, useContext, useEffect, useState } from 'react';
import translations from '../i18n';

type Lang = 'en' | 'am';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem('site-lang');
      return (stored as Lang) || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('site-lang', lang);
    } catch {}
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  const t = (key: string) => {
    // simple dot-key lookup
    const parts = key.split('.');
    const node: any = translations[lang] || translations['en'];
    let cur = node;
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
      else return translations['en']?.[parts[0]]?.[parts[1]] || key;
    }
    return typeof cur === 'string' ? cur : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

export default LanguageContext;
