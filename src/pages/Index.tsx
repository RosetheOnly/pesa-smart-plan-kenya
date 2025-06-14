
// Kenyan Installment Payment Desktop Dashboard

import React, { useState } from "react";
import LanguageToggle from "../components/LanguageToggle";
import DashboardSummary from "../components/DashboardSummary";
import InstallmentSelector from "../components/InstallmentSelector";
import SavingsTracker from "../components/SavingsTracker";
import SMSMessageSchedule from "../components/SMSMessageSchedule";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "sw">("en");

  return (
    <div className="min-h-screen bg-background pt-8 flex flex-col items-stretch px-6 lg:px-20 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-5">
        <span className="text-xl font-bold tracking-tight text-primary">Pesa SmartPlan Kenya</span>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>
      <DashboardSummary language={language} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <InstallmentSelector language={language} />
          <SMSMessageSchedule language={language} />
        </div>
        <div>
          <SavingsTracker language={language} />
        </div>
      </div>
      <footer className="mt-12 text-sm text-muted-foreground text-center">
        &copy; {new Date().getFullYear()} Pesa SmartPlan Kenya.
      </footer>
    </div>
  );
};

export default Index;
