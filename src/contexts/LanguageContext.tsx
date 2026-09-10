"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  isKo: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "ko",
  toggleLanguage: () => {},
  isKo: true,
});

function subscribe(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener("language-change", notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("language-change", notify);
  };
}
function getSnapshot(): Language {
  try {
    return localStorage.getItem("lang") === "en" ? "en" : "ko";
  } catch {
    return "ko";
  }
}
function getServerSnapshot(): Language {
  return "ko";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const toggleLanguage = () => {
    try {
      localStorage.setItem("lang", language === "ko" ? "en" : "ko");
      window.dispatchEvent(new Event("language-change"));
    } catch {
      /* Storage may be disabled. */
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, isKo: language === "ko" }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
