
import React from "react";
import {
  CheckSquare, // Flexible Installments (for a task/checklist)
  PiggyBank,   // Build Savings
  ShieldCheck, // Emergency Access (security/shield)
  MessageSquareText // SMS Reminders
} from "lucide-react";

// List features with matching available icons
const featureList = [
  {
    label: "Flexible Installments",
    icon: CheckSquare,
  },
  {
    label: "Build Savings",
    icon: PiggyBank,
  },
  {
    label: "Emergency Access",
    icon: ShieldCheck,
  },
  {
    label: "SMS Reminders",
    icon: MessageSquareText,
  },
];

const featureCopy = {
  en: [
    "Flexible Installments",
    "Build Savings",
    "Emergency Access",
    "SMS Reminders"
  ],
  sw: [
    "Malipo ya Awamu",
    "Jenga Akiba",
    "Upatikanaji wa Dharura",
    "Ukumbusho wa SMS"
  ]
};

type Props = { language: "en" | "sw" };

const LandingFeatures: React.FC<Props> = ({ language }) => (
  <section className="flex justify-center gap-10 mt-5 mb-8">
    {featureList.map((feat, i) => {
      const IconComp = feat.icon;
      return (
        <div key={i} className="flex flex-col items-center min-w-[80px]">
          <IconComp size={30} className="mb-2 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">{featureCopy[language][i]}</span>
        </div>
      );
    })}
  </section>
);

export default LandingFeatures;
