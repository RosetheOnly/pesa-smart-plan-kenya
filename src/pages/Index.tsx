
import React, { useState } from "react";
import LandingHero from "../components/LandingHero";
import SignupCards from "../components/SignupCards";
import LandingFeatures from "../components/LandingFeatures";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "sw">("en");
  const [role, setRole] = useState<"business" | "customer">("business");

  return (
    <div className="min-h-screen bg-[#f6fbfd] pb-10 flex flex-col items-stretch px-2 md:px-0">
      <header className="flex items-center justify-between py-6 px-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="inline-block rounded bg-white p-2">
            <img src="/lovable-uploads/a5afb001-a130-4e74-b93c-b7a74c46ebd9.png" alt="Logo" className="h-7 w-7" />
          </span>
          <span className="font-bold text-lg tracking-tight text-[#0455fc]">InstallmentPay</span>
        </div>
        <select
          className="border bg-white text-xs px-2 py-1 rounded min-w-[80px]"
          value={language}
          onChange={(e) => setLanguage(e.target.value as "en" | "sw")}
        >
          <option value="en">English</option>
          <option value="sw">Kiswahili</option>
        </select>
      </header>
      <main className="w-full flex-1 flex flex-col items-center">
        <LandingHero language={language} role={role} setRole={setRole} />
        <SignupCards language={language} role={role} />
        <LandingFeatures language={language} />
      </main>
    </div>
  );
};

export default Index;
