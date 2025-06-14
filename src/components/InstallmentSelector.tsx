
import React, { useState } from "react";

interface Good {
  label: string;
  value: string;
  minPeriod: number; // months
  maxPeriod: number; // months
}

interface Props {
  language: "en" | "sw";
}

const goods: Good[] = [
  { label: "Mobile Phone", value: "phone", minPeriod: 3, maxPeriod: 6 },
  { label: "Laptop", value: "laptop", minPeriod: 6, maxPeriod: 12 },
  { label: "Television", value: "tv", minPeriod: 4, maxPeriod: 8 },
  { label: "Land Plot", value: "land", minPeriod: 12, maxPeriod: 24 },
  { label: "Refrigerator", value: "fridge", minPeriod: 5, maxPeriod: 10 },
];

const texts = {
  en: {
    choose: "Choose Item",
    period: "Pick Savings Installment Period",
    periodHelp: (min: number, max: number) => `Allowed: ${min}–${max} months`,
    confirm: "Start Plan",
    headline: "Installment Plan Selector",
    helper: "Select the item you wish to purchase, then choose your installment period. High value goods have longer minimum periods.",
  },
  sw: {
    choose: "Chagua Bidhaa",
    period: "Chagua Muda wa Malipo kwa Awamu",
    periodHelp: (min: number, max: number) => `Inaruhusiwa: miezi ${min}–${max}`,
    confirm: "Anza Mpango",
    headline: "Kichagua Mpango wa Awamu",
    helper: "Chagua bidhaa unayotaka kununua, halafu chagua muda wa awamu zako. Bidhaa za thamani kubwa zinahitaji muda mrefu zaidi.",
  }
};

const InstallmentSelector: React.FC<Props> = ({ language }) => {
  const [selected, setSelected] = useState(goods[0]);
  const [period, setPeriod] = useState(goods[0].minPeriod);

  React.useEffect(() => {
    setPeriod(selected.minPeriod);
  }, [selected]);

  return (
    <div className="bg-card rounded-lg p-6 mb-7 border shadow">
      <h2 className="text-xl font-bold mb-2">{texts[language].headline}</h2>
      <p className="text-muted-foreground mb-4">{texts[language].helper}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <label className="block mb-1 font-medium">{texts[language].choose}</label>
          <select
            value={selected.value}
            onChange={e => {
              const good = goods.find(g => g.value === e.target.value);
              if (good) setSelected(good);
            }}
            className="w-full rounded border px-3 py-2 bg-background text-foreground"
          >
            {goods.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">{texts[language].period}</label>
          <input
            type="number"
            min={selected.minPeriod}
            max={selected.maxPeriod}
            value={period}
            onChange={e => setPeriod(Number(e.target.value))}
            className="w-full rounded border px-3 py-2 bg-background text-foreground"
          />
          <span className="text-xs text-muted-foreground">{texts[language].periodHelp(selected.minPeriod, selected.maxPeriod)}</span>
        </div>
        <div>
          <button
            className="px-4 py-2 w-full mt-6 rounded bg-primary text-primary-foreground font-semibold shadow transition hover:bg-primary/90"
            onClick={() => {
              alert(
                language === "en"
                  ? `Started plan: ${selected.label}, ${period} months.`
                  : `Umeanza mpango wa: ${selected.label}, miezi ${period}.`
              );
            }}
          >
            {texts[language].confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallmentSelector;
