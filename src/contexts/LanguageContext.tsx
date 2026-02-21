'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    isKo: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'ko',
    toggleLanguage: () => { },
    isKo: true,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('ko');

    useEffect(() => {
        const saved = localStorage.getItem('lang') as Language | null;
        if (saved === 'ko' || saved === 'en') {
            setLanguage(saved);
        }
    }, []);

    const toggleLanguage = () => {
        setLanguage(prev => {
            const next = prev === 'ko' ? 'en' : 'ko';
            localStorage.setItem('lang', next);
            return next;
        });
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, isKo: language === 'ko' }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
