
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import PaymentIntegration from "./PaymentIntegration";
import { CreditCard, Smartphone, Building2 } from "lucide-react";

interface Props {
  language: "en" | "sw";
}

const sampleProducts = [
  {
    id: "1",
    name: "Samsung Galaxy S24",
    price: 85000,
    description: "Latest flagship smartphone with advanced camera",
    installmentPrice: 21250, // 25% down payment
  },
  {
    id: "2",
    name: "MacBook Pro M3",
    price: 250000,
    description: "Professional laptop for creative work",
    installmentPrice: 62500, // 25% down payment
  },
  {
    id: "3",
    name: "iPhone 15 Pro",
    price: 120000,
    description: "Premium smartphone with titanium design",
    installmentPrice: 30000, // 25% down payment
  },
];

const texts = {
  en: {
    title: "Payment Demo",
    subtitle: "Try our payment system with sample products",
    productTitle: "Sample Products",
    selectProduct: "Select Product to Purchase",
    price: "Full Price",
    installmentPrice: "Down Payment (25%)",
    payNow: "Pay Now",
    payInstallment: "Pay Down Payment",
    supportedMethods: "Supported Payment Methods",
    mobile: "Mobile Money",
    cards: "Cards & Banking",
    international: "International",
  },
  sw: {
    title: "Majaribio ya Malipo",
    subtitle: "Jaribu mfumo wetu wa malipo na bidhaa za mfano",
    productTitle: "Bidhaa za Mfano",
    selectProduct: "Chagua Bidhaa ya Kununua",
    price: "Bei Kamili",
    installmentPrice: "Malipo ya Kwanza (25%)",
    payNow: "Lipa Sasa",
    payInstallment: "Lipa Malipo ya Kwanza",
    supportedMethods: "Njia za Malipo Zinazotumika",
    mobile: "Pesa za Simu",
    cards: "Kadi na Benki",
    international: "Kimataifa",
  }
};

const PaymentDemo: React.FC<Props> = ({ language }) => {
  const [selectedProduct, setSelectedProduct] = useState<typeof sampleProducts[0] | null>(null);
  const [paymentMode, setPaymentMode] = useState<"full" | "installment">("installment");
  const [showPayment, setShowPayment] = useState(false);

  const copy = texts[language];

  const handleProductSelect = (product: typeof sampleProducts[0]) => {
    setSelectedProduct(product);
    setShowPayment(false);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    console.log("Payment successful:", transactionId);
    setShowPayment(false);
    setSelectedProduct(null);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  if (showPayment && selectedProduct) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <PaymentIntegration
          language={language}
          amount={paymentMode === "full" ? selectedProduct.price : selectedProduct.installmentPrice}
          productName={selectedProduct.name}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentCancel={handlePaymentCancel}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">{copy.title}</h3>
        <p className="text-gray-600">{copy.subtitle}</p>
      </div>

      {/* Supported Payment Methods Preview */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-3">{copy.supportedMethods}</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">{copy.mobile}</span>
            <span className="text-xs text-gray-500">M-Pesa, Airtel, Equitel</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">{copy.cards}</span>
            <span className="text-xs text-gray-500">Banks, Mobile Banking</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium">{copy.international}</span>
            <span className="text-xs text-gray-500">Stripe, Flutterwave</span>
          </div>
        </div>
      </div>

      {/* Product Selection */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">{copy.selectProduct}</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleProducts.map((product) => (
            <Card
              key={product.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedProduct?.id === product.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleProductSelect(product)}
            >
              <h5 className="font-medium mb-2">{product.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{copy.price}:</span> KSh {product.price.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">
                  <span className="font-medium">{copy.installmentPrice}:</span> KSh {product.installmentPrice.toLocaleString()}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Options */}
      {selectedProduct && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant={paymentMode === "full" ? "default" : "outline"}
              onClick={() => setPaymentMode("full")}
            >
              {copy.payNow} - KSh {selectedProduct.price.toLocaleString()}
            </Button>
            <Button
              variant={paymentMode === "installment" ? "default" : "outline"}
              onClick={() => setPaymentMode("installment")}
              className="bg-green-600 hover:bg-green-700"
            >
              {copy.payInstallment} - KSh {selectedProduct.installmentPrice.toLocaleString()}
            </Button>
          </div>

          <Button
            onClick={() => setShowPayment(true)}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            Proceed to Payment
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentDemo;
