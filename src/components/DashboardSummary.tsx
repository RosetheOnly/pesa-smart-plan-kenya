
import React from "react";

interface Props {
  language: "en" | "sw";
}

const copy = {
  en: {
    savings: "My Savings",
    installment: "Active Installment Plan",
    emergency: "Emergency Access",
    welcome: "Karibu! Welcome to your Kenyan Installment Payment Portal.",
    tagline: "Pay flexibly. Save smart. Progress steadily.",
    quick: "Quick Actions"
  },
  sw: {
    savings: "Akiba Yangu",
    installment: "Mpango wa Malipo kwa Awamu",
    emergency: "Upatikanaji wa Dharura",
    welcome: "Karibu! Karibu kwenye Mfumo wa Malipo ya Awamu Kenya.",
    tagline: "Lipa kwa urahisi. Akiba kwa Busara. Endelea kwa mafanikio.",
    quick: "Vitendo vya Haraka"
  }
};

const DashboardSummary: React.FC<Props> = ({ language }) => {
  return (
    <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
      <div className="col-span-2 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{copy[language].welcome}</h1>
        <p className="text-lg text-muted-foreground">{copy[language].tagline}</p>
      </div>
      <div className="col-span-1 bg-card p-4 rounded-lg shadow border">
        <h2 className="font-semibold text-primary mb-2">{copy[language].quick}</h2>
        <ul className="space-y-1 text-sm">
          <li>💸 {copy[language].savings}: <span className="font-semibold">KSh 12,500</span></li>
          <li>🛒 {copy[language].installment}: <span className="font-semibold">Laptop (HP ProBook) – 3 months</span></li>
          <li>🚨 {copy[language].emergency}: <span className="font-semibold">Up to KSh 250</span></li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSummary;
