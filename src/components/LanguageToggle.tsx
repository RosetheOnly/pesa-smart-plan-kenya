
import React from "react";

type Language = "en" | "sw";

export interface LanguageToggleProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const options = [
  { label: "English", value: "en" },
  { label: "Kiswahili", value: "sw" },
];

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, setLanguage }) => {
  return (
    <div className="flex items-center gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`px-3 py-1 rounded font-medium transition-colors
            ${language === opt.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
          `}
          onClick={() => setLanguage(opt.value as Language)}
          aria-pressed={language === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
