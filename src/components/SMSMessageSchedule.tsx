
import React from "react";

interface Props {
  language: "en" | "sw";
}

const texts = {
  en: {
    headline: "Encouragement SMS",
    next: "Next motivational SMS will be sent on:",
    example: "\"You're doing great! Every installment brings you closer to your goal. Keep it up!\"",
    when: "Every Monday at 8:00am",
  },
  sw: {
    headline: "Ujumbe wa Kutia Moto",
    next: "Ujumbe wa kutia moyo utatumwa tarehe:",
    example: "\"Unafanya vizuri! Kila malipo ya awamu yanakuweka karibu na lengo lako. Endelea hivyo!\"",
    when: "Kila Jumatatu saa 2:00 asubuhi",
  }
};

const nextDate = () => {
  const now = new Date();
  const day = now.getDay();
  const addDays = (day === 1) ? 7 : ((1 + 7 - day) % 7) || 7; // Next Monday
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + addDays);
  nextMonday.setHours(8, 0, 0, 0);
  return nextMonday.toLocaleDateString();
};

const SMSMessageSchedule: React.FC<Props> = ({ language }) => {
  return (
    <div className="bg-card rounded-lg p-6 border mt-7 shadow">
      <h3 className="font-semibold mb-1">{texts[language].headline}</h3>
      <div className="text-muted-foreground text-sm mb-1">{texts[language].next} <span className="font-bold">{nextDate()}</span></div>
      <div className="text-xs text-primary-foreground bg-primary px-3 py-2 rounded max-w-md">{texts[language].example}</div>
      <div className="text-xs text-muted-foreground mt-2">{texts[language].when}</div>
    </div>
  );
};

export default SMSMessageSchedule;
