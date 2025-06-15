
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { 
  Smartphone, 
  CreditCard, 
  Building2, 
  Globe, 
  Phone,
  Banknote,
  Wallet
} from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  category: "mobile" | "card" | "bank" | "international";
  enabled: boolean;
}

interface Props {
  language: "en" | "sw";
  amount: number;
  onPaymentSelect: (method: string, details: any) => void;
}

const paymentMethods: PaymentMethod[] = [
  // Mobile Money (Kenya)
  {
    id: "mpesa",
    name: "M-Pesa",
    icon: <Smartphone className="w-6 h-6 text-green-600" />,
    description: "Pay with your M-Pesa mobile money",
    category: "mobile",
    enabled: true,
  },
  {
    id: "airtel",
    name: "Airtel Money",
    icon: <Phone className="w-6 h-6 text-red-600" />,
    description: "Pay with Airtel Money",
    category: "mobile",
    enabled: true,
  },
  {
    id: "equitel",
    name: "Equitel",
    icon: <Smartphone className="w-6 h-6 text-orange-600" />,
    description: "Pay with Equitel mobile banking",
    category: "mobile",
    enabled: true,
  },
  {
    id: "tkash",
    name: "T-Kash",
    icon: <Phone className="w-6 h-6 text-blue-600" />,
    description: "Pay with T-Kash mobile money",
    category: "mobile",
    enabled: true,
  },
  
  // International Cards
  {
    id: "stripe",
    name: "Credit/Debit Card",
    icon: <CreditCard className="w-6 h-6 text-blue-600" />,
    description: "Visa, Mastercard, American Express",
    category: "card",
    enabled: true,
  },
  
  // African Payment Gateways
  {
    id: "flutterwave",
    name: "Flutterwave",
    icon: <Globe className="w-6 h-6 text-yellow-500" />,
    description: "Multiple payment options across Africa",
    category: "international",
    enabled: true,
  },
  {
    id: "paystack",
    name: "Paystack",
    icon: <Wallet className="w-6 h-6 text-green-500" />,
    description: "Cards, bank transfers, mobile money",
    category: "international",
    enabled: true,
  },
  
  // Bank Transfers
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    icon: <Building2 className="w-6 h-6 text-gray-600" />,
    description: "Direct bank transfer (RTGS/EFT)",
    category: "bank",
    enabled: true,
  },
  {
    id: "mobile_banking",
    name: "Mobile Banking",
    icon: <Smartphone className="w-6 h-6 text-purple-600" />,
    description: "KCB, Equity, Coop mobile banking",
    category: "bank",
    enabled: true,
  },
];

const texts = {
  en: {
    title: "Choose Payment Method",
    subtitle: "Select your preferred payment option",
    mobileMoneyTitle: "Mobile Money",
    cardPaymentsTitle: "Card Payments",
    bankTransferTitle: "Bank Transfers",
    internationalTitle: "International Gateways",
    phoneNumber: "Phone Number",
    phoneNumberPlaceholder: "254712345678",
    bankAccount: "Bank Account Number",
    bankAccountPlaceholder: "Enter your account number",
    selectBank: "Select Bank",
    payNow: "Pay Now",
    amount: "Amount",
    processing: "Processing payment...",
  },
  sw: {
    title: "Chagua Njia ya Malipo",
    subtitle: "Chagua chaguo lako la malipo",
    mobileMoneyTitle: "Pesa za Simu",
    cardPaymentsTitle: "Malipo ya Kadi",
    bankTransferTitle: "Uhamisho wa Benki",
    internationalTitle: "Malango ya Kimataifa",
    phoneNumber: "Nambari ya Simu",
    phoneNumberPlaceholder: "254712345678",
    bankAccount: "Nambari ya Akaunti ya Benki",
    bankAccountPlaceholder: "Ingiza nambari ya akaunti yako",
    selectBank: "Chagua Benki",
    payNow: "Lipa Sasa",
    amount: "Kiasi",
    processing: "Inachakata malipo...",
  }
};

const kenyanBanks = [
  "KCB Bank",
  "Equity Bank",
  "Cooperative Bank",
  "Standard Chartered",
  "Barclays Bank",
  "Commercial Bank of Africa",
  "Family Bank",
  "I&M Bank",
  "National Bank",
  "NIC Bank",
];

const PaymentSelector: React.FC<Props> = ({ language, amount, onPaymentSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const copy = texts[language];

  const groupedMethods = {
    mobile: paymentMethods.filter(m => m.category === "mobile"),
    card: paymentMethods.filter(m => m.category === "card"),
    bank: paymentMethods.filter(m => m.category === "bank"),
    international: paymentMethods.filter(m => m.category === "international"),
  };

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);
    
    const paymentDetails = {
      method: selectedMethod,
      amount,
      phoneNumber: phoneNumber || undefined,
      bankAccount: bankAccount || undefined,
      bank: selectedBank || undefined,
      timestamp: new Date().toISOString(),
    };

    // Simulate processing delay
    setTimeout(() => {
      onPaymentSelect(selectedMethod, paymentDetails);
      setIsProcessing(false);
    }, 2000);
  };

  const renderPaymentGroup = (title: string, methods: PaymentMethod[]) => (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {methods.map((method) => (
          <Card
            key={method.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedMethod === method.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            } ${!method.enabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => method.enabled && setSelectedMethod(method.id)}
          >
            <div className="flex items-center gap-3">
              {method.icon}
              <div className="flex-1">
                <h5 className="font-medium">{method.name}</h5>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const needsPhoneNumber = ["mpesa", "airtel", "equitel", "tkash"].includes(selectedMethod);
  const needsBankDetails = ["bank_transfer", "mobile_banking"].includes(selectedMethod);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{copy.title}</h3>
        <p className="text-gray-600">{copy.subtitle}</p>
        <div className="mt-3 p-3 bg-green-50 rounded-lg">
          <p className="text-lg font-semibold text-green-800">
            {copy.amount}: KSh {amount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {renderPaymentGroup(copy.mobileMoneyTitle, groupedMethods.mobile)}
        {renderPaymentGroup(copy.cardPaymentsTitle, groupedMethods.card)}
        {renderPaymentGroup(copy.bankTransferTitle, groupedMethods.bank)}
        {renderPaymentGroup(copy.internationalTitle, groupedMethods.international)}
      </div>

      {selectedMethod && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-4">Payment Details</h4>
          
          {needsPhoneNumber && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                {copy.phoneNumber}
              </label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={copy.phoneNumberPlaceholder}
                className="w-full"
              />
            </div>
          )}

          {needsBankDetails && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {copy.selectBank}
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">{copy.selectBank}</option>
                  {kenyanBanks.map((bank) => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {copy.bankAccount}
                </label>
                <Input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder={copy.bankAccountPlaceholder}
                  className="w-full"
                />
              </div>
            </div>
          )}

          <Button
            onClick={handlePayment}
            disabled={isProcessing || !selectedMethod}
            className="w-full mt-4 bg-green-600 hover:bg-green-700"
          >
            {isProcessing ? copy.processing : `${copy.payNow} - KSh ${amount.toLocaleString()}`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentSelector;
