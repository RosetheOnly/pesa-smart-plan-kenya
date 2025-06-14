
import React, { useState } from "react";
import { Button } from "./ui/button";
import { calculateServiceFee, calculateTotalWithFee } from "../utils/serviceFeeCalculator";

interface Good {
  label: string;
  value: string;
  minPeriod: number; // months
  maxPeriod: number; // months
  price: number; // total price
}

interface Props {
  language: "en" | "sw";
}

const goods: Good[] = [
  { label: "Mobile Phone", value: "phone", minPeriod: 3, maxPeriod: 6, price: 15000 },
  { label: "Laptop", value: "laptop", minPeriod: 6, maxPeriod: 12, price: 45000 },
  { label: "Television", value: "tv", minPeriod: 4, maxPeriod: 8, price: 32000 },
  { label: "Land Plot", value: "land", minPeriod: 12, maxPeriod: 24, price: 120000 },
  { label: "Refrigerator", value: "fridge", minPeriod: 5, maxPeriod: 10, price: 25000 },
];

const texts = {
  en: {
    choose: "Choose Item",
    period: "Pick Savings Installment Period",
    periodHelp: (min: number, max: number) => `Allowed: ${min}–${max} months`,
    confirm: "Start Plan",
    headline: "Installment Plan Selector",
    helper: "Select the item you wish to purchase, then choose your installment period. High value goods have longer minimum periods.",
    success: (item: string, period: number) => `Great! You've started a ${period}-month installment plan for ${item}. You'll receive SMS reminders and can track your savings progress below.`,
    monthlyAmount: "Monthly Payment",
    serviceFee: "Service Fee",
    totalPayment: "Total Monthly Payment",
  },
  sw: {
    choose: "Chagua Bidhaa",
    period: "Chagua Muda wa Malipo kwa Awamu",
    periodHelp: (min: number, max: number) => `Inaruhusiwa: miezi ${min}–${max}`,
    confirm: "Anza Mpango",
    headline: "Kichagua Mpango wa Awamu",
    helper: "Chagua bidhaa unayotaka kununua, halafu chagua muda wa awamu zako. Bidhaa za thamani kubwa zinahitaji muda mrefu zaidi.",
    success: (item: string, period: number) => `Vizuri! Umeanza mpango wa miezi ${period} kwa ${item}. Utapokea ukumbusho wa SMS na unaweza kufuatilia maendeleo ya akiba yako hapa chini.`,
    monthlyAmount: "Malipo ya Kila Mwezi",
    serviceFee: "Ada ya Huduma",
    totalPayment: "Jumla ya Malipo ya Kila Mwezi",
  }
};

const InstallmentSelector: React.FC<Props> = ({ language }) => {
  const [selected, setSelected] = useState(goods[0]);
  const [period, setPeriod] = useState(goods[0].minPeriod);

  React.useEffect(() => {
    setPeriod(selected.minPeriod);
  }, [selected]);

  const monthlyAmount = Math.ceil(selected.price / period);
  const serviceFee = calculateServiceFee(monthlyAmount);
  const totalMonthlyPayment = calculateTotalWithFee(monthlyAmount);

  const handleStartPlan = () => {
    alert(texts[language].success(selected.label, period));
  };

  return (
    <div className="bg-card rounded-lg p-6 mb-7 border shadow">
      <h2 className="text-xl font-bold mb-2">{texts[language].headline}</h2>
      <p className="text-muted-foreground mb-4">{texts[language].helper}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        <div>
          <label className="block mb-1 font-medium">{texts[language].choose}</label>
          <select
            value={selected.value}
            onChange={e => {
              const good = goods.find(g => g.value === e.target.value);
              if (good) setSelected(good);
            }}
            className="w-full rounded border px-3 py-2 bg-background text-foreground cursor-pointer"
          >
            {goods.map((g) => (
              <option key={g.value} value={g.value}>{g.label} (KSh {g.price.toLocaleString()})</option>
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
            className="w-full rounded border px-3 py-2 bg-background text-foreground cursor-pointer"
          />
          <span className="text-xs text-muted-foreground">{texts[language].periodHelp(selected.minPeriod, selected.maxPeriod)}</span>
        </div>
        <div>
          <label className="block mb-1 font-medium">{texts[language].monthlyAmount}</label>
          <div className="p-2 bg-muted rounded text-sm">
            <div>KSh {monthlyAmount.toLocaleString()}</div>
            <div className="text-xs text-green-600">+ KSh {serviceFee} {texts[language].serviceFee}</div>
            <div className="font-semibold text-blue-600">= KSh {totalMonthlyPayment.toLocaleString()}</div>
          </div>
        </div>
        <div>
          <Button
            className="w-full"
            onClick={handleStartPlan}
          >
            {texts[language].confirm}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstallmentSelector;
