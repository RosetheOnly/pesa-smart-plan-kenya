
import React from "react";
import { SmsReminders, EmergencyAccess, BuildSavings, FlexibleInstallments } from "lucide-react";

const featureList = [
  {
    label: "Flexible Installments",
    icon: FlexibleInstallments,
  },
  {
    label: "Build Savings",
    icon: BuildSavings,
  },
  {
    label: "Emergency Access",
    icon: EmergencyAccess,
  },
  {
    label: "SMS Reminders",
    icon: SmsReminders,
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

const iconComponents = {
  FlexibleInstallments,
  BuildSavings,
  EmergencyAccess,
  SmsReminders,
};

const LandingFeatures: React.FC<Props> = ({ language }) => (
  <section className="flex justify-center gap-10 mt-5 mb-8">
    {featureList.map((feat, i) => {
      const IconComp = iconComponents[feat.icon.displayName || feat.icon.name];
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
