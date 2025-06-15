
import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { createClient } from "@supabase/supabase-js";
import PaymentSelector from "./PaymentSelector";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Props {
  language: "en" | "sw";
  amount: number;
  productName: string;
  onPaymentSuccess?: (transactionId: string) => void;
  onPaymentCancel?: () => void;
}

const texts = {
  en: {
    paymentTitle: "Complete Your Payment",
    paymentProcessing: "Processing Payment...",
    paymentSuccess: "Payment Successful!",
    paymentFailed: "Payment Failed",
    paymentCancelled: "Payment Cancelled",
    transactionId: "Transaction ID",
    retry: "Retry Payment",
    newPayment: "New Payment",
    checkingStatus: "Checking payment status...",
    paymentPending: "Payment Pending",
    pendingMessage: "Your payment is being processed. You'll receive a confirmation shortly.",
  },
  sw: {
    paymentTitle: "Maliza Malipo Yako",
    paymentProcessing: "Inachakata Malipo...",
    paymentSuccess: "Malipo Yamefanikiwa!",
    paymentFailed: "Malipo Yameshindwa",
    paymentCancelled: "Malipo Yameghairiwa",
    transactionId: "Kitambulisho cha Muamala",
    retry: "Jaribu Tena",
    newPayment: "Malipo Mapya",
    checkingStatus: "Inaangalia hali ya malipo...",
    paymentPending: "Malipo Yanasubiri",
    pendingMessage: "Malipo yako yanachakatwa. Utapokea uthibitisho hivi karibuni.",
  }
};

const PaymentIntegration: React.FC<Props> = ({
  language,
  amount,
  productName,
  onPaymentSuccess,
  onPaymentCancel
}) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [paymentStatus, setPaymentStatus] = useState<"selecting" | "processing" | "success" | "failed" | "pending">("selecting");
  const [transactionId, setTransactionId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const copy = texts[language];

  const handlePaymentSelect = async (method: string, details: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to continue with payment",
        variant: "destructive",
      });
      return;
    }

    setPaymentStatus("processing");
    setErrorMessage("");

    try {
      let response;

      switch (method) {
        case "mpesa":
          response = await supabase.functions.invoke("process-mpesa-payment", {
            body: {
              phoneNumber: details.phoneNumber,
              amount: details.amount,
              accountReference: `IP_${Date.now()}`,
              transactionDescription: `Payment for ${productName}`,
            },
          });
          break;

        case "airtel":
          response = await supabase.functions.invoke("process-airtel-payment", {
            body: {
              phoneNumber: details.phoneNumber,
              amount: details.amount,
              reference: `IP_${Date.now()}`,
            },
          });
          break;

        case "stripe":
          response = await supabase.functions.invoke("process-stripe-payment", {
            body: {
              amount: details.amount,
              productName: productName,
            },
          });
          
          if (response.data?.checkoutUrl) {
            // Open Stripe checkout in a new tab
            window.open(response.data.checkoutUrl, '_blank');
            setPaymentStatus("pending");
            return;
          }
          break;

        case "flutterwave":
        case "paystack":
          // For now, show as pending - these would need their respective API integrations
          toast({
            title: "Coming Soon",
            description: `${method} integration will be available soon!`,
          });
          setPaymentStatus("selecting");
          return;

        default:
          throw new Error(`Payment method ${method} not implemented yet`);
      }

      if (response.error) {
        throw new Error(response.error.message || "Payment processing failed");
      }

      if (response.data?.success) {
        const txnId = response.data.checkoutRequestId || response.data.transactionId || `TXN_${Date.now()}`;
        setTransactionId(txnId);
        
        if (method === "mpesa" || method === "airtel") {
          setPaymentStatus("pending");
          toast({
            title: "Payment Initiated",
            description: "Please check your phone to complete the payment",
          });
        } else {
          setPaymentStatus("success");
          onPaymentSuccess?.(txnId);
        }
      }

    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage(error.message || "An unexpected error occurred");
      setPaymentStatus("failed");
      
      toast({
        title: "Payment Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleRetry = () => {
    setPaymentStatus("selecting");
    setErrorMessage("");
    setTransactionId("");
  };

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case "processing":
        return (
          <Card className="p-6 text-center">
            <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold mb-2">{copy.paymentProcessing}</h3>
            <p className="text-gray-600">Please wait while we process your payment...</p>
          </Card>
        );

      case "success":
        return (
          <Card className="p-6 text-center border-green-200 bg-green-50">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">{copy.paymentSuccess}</h3>
            <p className="text-gray-600 mb-4">Your payment has been processed successfully!</p>
            {transactionId && (
              <p className="text-sm text-gray-500">
                {copy.transactionId}: {transactionId}
              </p>
            )}
          </Card>
        );

      case "pending":
        return (
          <Card className="p-6 text-center border-yellow-200 bg-yellow-50">
            <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">{copy.paymentPending}</h3>
            <p className="text-gray-600 mb-4">{copy.pendingMessage}</p>
            {transactionId && (
              <p className="text-sm text-gray-500 mb-4">
                {copy.transactionId}: {transactionId}
              </p>
            )}
            <Button onClick={handleRetry} variant="outline">
              {copy.newPayment}
            </Button>
          </Card>
        );

      case "failed":
        return (
          <Card className="p-6 text-center border-red-200 bg-red-50">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-800 mb-2">{copy.paymentFailed}</h3>
            <p className="text-gray-600 mb-4">{errorMessage || "Something went wrong with your payment."}</p>
            <Button onClick={handleRetry} className="bg-red-600 hover:bg-red-700">
              {copy.retry}
            </Button>
          </Card>
        );

      default:
        return (
          <PaymentSelector
            language={language}
            amount={amount}
            onPaymentSelect={handlePaymentSelect}
          />
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">{copy.paymentTitle}</h2>
        <p className="text-gray-600">{productName} - KSh {amount.toLocaleString()}</p>
      </div>
      
      {renderPaymentStatus()}
    </div>
  );
};

export default PaymentIntegration;
