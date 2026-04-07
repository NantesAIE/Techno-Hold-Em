import React, { createContext, useContext, useState } from 'react';
import type { Lang, Translations } from './types';
import fr from './fr';
import en from './en';

// ── Translation map ───────────────────────────────────────────────────────────

const TRANSLATIONS: Record<Lang, Translations> = { fr, en };

export function getTranslations(lang: Lang): Translations {
  return TRANSLATIONS[lang];
}

// ── Context ───────────────────────────────────────────────────────────────────

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'fr',
  setLang: () => {},
  t: fr,
});

// ── Provider ──────────────────────────────────────────────────────────────────

interface LanguageProviderProps {
  initialLang?: Lang;
  children: React.ReactNode;
}

export function LanguageProvider({ initialLang = 'fr', children }: LanguageProviderProps) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = TRANSLATIONS[lang];

  return React.createElement(
    LanguageContext.Provider,
    { value: { lang, setLang, t } },
    children,
  );
}

// ── Hooks ─────────────────────────────────────────────────────────────────────

/** Returns the full translations object for the current language. */
export function useT(): Translations {
  return useContext(LanguageContext).t;
}

/** Returns [currentLang, setLang]. */
export function useLang(): [Lang, (l: Lang) => void] {
  const { lang, setLang } = useContext(LanguageContext);
  return [lang, setLang];
}
