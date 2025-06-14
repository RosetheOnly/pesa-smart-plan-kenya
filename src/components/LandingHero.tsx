
import React from "react";

const copy = {
  en: {
    title: "Smart Installment Payments for Kenya",
    subtitle:
      "Pay for goods and services in installments while building your savings. Perfect for businesses and customers.",
    business: "For Business",
    customer: "For Customers",
  },
  sw: {
    title: "Malipo ya Awamu Bora kwa Kenya",
    subtitle:
      "Lipa bidhaa na huduma kwa awamu huku ukiweka akiba. Bora kwa wafanyabiashara na wateja.",
    business: "Kwa Biashara",
    customer: "Kwa Wateja",
  },
};

type Props = {
  language: "en" | "sw";
  role: "business" | "customer";
  setRole: (role: "business" | "customer") => void;
};

const LandingHero: React.FC<Props> = ({ language, role, setRole }) => (
  <section className="flex flex-col items-center text-center pt-3 pb-7">
    <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3">{copy[language].title}</h1>
    <p className="mb-7 text-muted-foreground text-base max-w-xl">{copy[language].subtitle}</p>
    <div className="flex gap-2 justify-center mb-2">
      <button
        className={`px-5 py-2 rounded font-medium transition-colors border ${
          role === "business"
            ? "bg-[#0455fc] text-white"
            : "bg-white text-gray-700"
        }`}
        onClick={() => setRole("business")}
      >
        {copy[language].business}
      </button>
      <button
        className={`px-5 py-2 rounded font-medium transition-colors border ${
          role === "customer"
            ? "bg-[#f1faf3] text-gray-900 border-green-500"
            : "bg-white text-gray-700"
        }`}
        onClick={() => setRole("customer")}
      >
        {copy[language].customer}
      </button>
    </div>
  </section>
);

export default LandingHero;
