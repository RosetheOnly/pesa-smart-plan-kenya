
import React, { useState } from "react";
import { Building2, Users } from "lucide-react";
import { Button } from "./ui/button";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

type Props = {
  language: "en" | "sw";
  role: "business" | "customer";
};

const cardCopy = {
  en: {
    businessTitle: "For Businesses",
    businessDesc: "Increase sales by offering flexible payment options to your customers",
    businessFeatures: [
      "Manage products and payment terms",
      "Track customer installments",
      "Analytics and reporting",
      "Automated SMS notifications",
    ],
    businessCta: "Register Business",
    businessLogin: "Login to Business Account",

    customerTitle: "For Customers",
    customerDesc: "Buy what you need today and pay over time while saving for the future",
    customerFeatures: [
      "Flexible installment payments",
      "Build savings automatically",
      "Emergency fund access (2%)",
      "Payment reminders via SMS",
    ],
    customerCta: "Register as Customer",
    customerLogin: "Login to Customer Account",
  },
  sw: {
    businessTitle: "Kwa Biashara",
    businessDesc:
      "Ongeza mauzo kwa kutoa chaguo la malipo ya awamu kwa wateja wako",
    businessFeatures: [
      "Dhibiti bidhaa na masharti ya malipo",
      "Fatilia malipo ya wateja kwa awamu",
      "Ripoti na uchambuzi",
      "Arifa za SMS otomatiki",
    ],
    businessCta: "Sajili Biashara",
    businessLogin: "Ingia Akaunti ya Biashara",

    customerTitle: "Kwa Wateja",
    customerDesc:
      "Nunua unachohitaji leo na ulipe kwa awamu huku ukiweka akiba ya baadaye",
    customerFeatures: [
      "Chaguo rahisi za malipo ya awamu",
      "Jenga akiba kiotomatiki",
      "Upatikanaji wa mfuko wa dharura (2%)",
      "Ukumbusho wa malipo kupitia SMS",
    ],
    customerCta: "Sajili kama Mteja",
    customerLogin: "Ingia Akaunti ya Mteja",
  },
};

const SignupCards: React.FC<Props> = ({ language, role }) => {
  const [showForm, setShowForm] = useState<"business" | "customer" | null>(null);
  const [showLoginForm, setShowLoginForm] = useState<"business" | "customer" | null>(null);

  return (
    <>
      <section className="flex flex-col md:flex-row gap-8 justify-center w-full max-w-5xl mx-auto pb-10">
        {/* Business Card */}
        <div className="flex-1 bg-white rounded-lg border shadow-sm p-6 min-w-[300px] max-w-[420px] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={28} className="text-[#0455fc]" />
            <span className="font-semibold text-lg">{cardCopy[language].businessTitle}</span>
          </div>
          <div className="mb-2 text-muted-foreground text-base">{cardCopy[language].businessDesc}</div>
          <ul className="mb-5 mt-2 text-sm space-y-1 pl-1">
            {cardCopy[language].businessFeatures.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <div className="mt-auto space-y-2">
            <Button
              className="w-full bg-[#0455fc] hover:bg-[#0444d6]"
              onClick={() => setShowForm("business")}
            >
              {cardCopy[language].businessCta}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowLoginForm("business")}
            >
              {cardCopy[language].businessLogin}
            </Button>
          </div>
        </div>
        
        {/* Customer Card */}
        <div className="flex-1 bg-white rounded-lg border shadow-sm p-6 min-w-[300px] max-w-[420px] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Users size={28} className="text-green-700" />
            <span className="font-semibold text-lg">{cardCopy[language].customerTitle}</span>
          </div>
          <div className="mb-2 text-muted-foreground text-base">{cardCopy[language].customerDesc}</div>
          <ul className="mb-5 mt-2 text-sm space-y-1 pl-1">
            {cardCopy[language].customerFeatures.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <div className="mt-auto space-y-2">
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => setShowForm("customer")}
            >
              {cardCopy[language].customerCta}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowLoginForm("customer")}
            >
              {cardCopy[language].customerLogin}
            </Button>
          </div>
        </div>
      </section>

      <RegistrationForm
        language={language}
        type={showForm || "customer"}
        isOpen={showForm !== null}
        onClose={() => setShowForm(null)}
      />

      <LoginForm
        language={language}
        type={showLoginForm || "customer"}
        isOpen={showLoginForm !== null}
        onClose={() => setShowLoginForm(null)}
      />
    </>
  );
};

export default SignupCards;
