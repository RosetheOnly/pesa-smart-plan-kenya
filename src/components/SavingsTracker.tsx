import React, { useState } from "react";
import { Button } from "./ui/button";

interface Props {
  language: "en" | "sw";
}

const copy = {
  en: {
    savingsLabel: "Total Savings",
    nextGoal: "Next Milestone",
    withdraw: "Request 2% Emergency Funds",
    available: "Available Emergency Amount",
    success: "Emergency fund request submitted! Funds will be available within 24 hours via M-Pesa.",
    prompt: "If you need emergency cash, you can access up to 2% of your current savings once per plan.",
    progress: "Progress",
    withdrawn: "Emergency funds already requested this period",
  },
  sw: {
    savingsLabel: "Jumla ya Akiba",
    nextGoal: "Lengo Lijalo",
    withdraw: "Omba Akiba ya Dharura (2%)",
    available: "Kiasi Kinachopatikana kwa Dharura",
    success: "Ombi la akiba ya dharura limetumwa! Fedha zitapatikana ndani ya masaa 24 kupitia M-Pesa.",
    prompt: "Ukihitaji pesa za dharura, unaweza kutoa hadi 2% ya akiba yako mara moja kwa kila mpango.",
    progress: "Maendeleo",
    withdrawn: "Umeshakwisha omba akiba ya dharura kipindi hiki",
  }
};

const totalSavings = 12500; // For demo
const milestone = 20000;

const SavingsTracker: React.FC<Props> = ({ language }) => {
  const [withdrawn, setWithdrawn] = useState(false);

  const emergencyAmt = Math.floor(totalSavings * 0.02);

  const handleEmergencyRequest = () => {
    setWithdrawn(true);
    alert(copy[language].success);
    // Reset after 10 seconds for demo purposes
    setTimeout(() => setWithdrawn(false), 10000);
  };

  return (
    <div className="bg-card rounded-lg p-6 border flex flex-col md:flex-row gap-7 md:items-center shadow">
      <div className="flex-1">
        <h2 className="text-lg font-bold mb-1">{copy[language].savingsLabel}</h2>
        <div className="text-3xl font-mono font-bold tracking-tight mb-1">KSh {totalSavings.toLocaleString()}</div>
        <div className="text-sm mb-3 text-muted-foreground">{copy[language].progress}: {Math.floor((totalSavings / milestone) * 100)}%</div>
        <div className="w-full h-3 bg-muted rounded-full mb-3">
          <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(totalSavings / milestone) * 100}%` }} />
        </div>
        <div className="text-xs text-muted-foreground">{copy[language].nextGoal}: KSh {milestone.toLocaleString()}</div>
      </div>
      <div className="w-full md:w-64 flex flex-col gap-3">
        <p className="text-sm">{copy[language].prompt}</p>
        <Button
          variant={withdrawn ? "secondary" : "default"}
          className={withdrawn ? "cursor-not-allowed" : "bg-green-700 hover:bg-green-800"}
          disabled={withdrawn}
          onClick={handleEmergencyRequest}
        >
          {withdrawn ? copy[language].withdrawn : copy[language].withdraw}
        </Button>
        <div className="text-xs">
          {copy[language].available}: <span className="font-bold">KSh {emergencyAmt}</span>
        </div>
      </div>
    </div>
  );
};

export default SavingsTracker;
