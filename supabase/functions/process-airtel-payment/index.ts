
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AirtelPaymentRequest {
  phoneNumber: string;
  amount: number;
  reference: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const { phoneNumber, amount, reference }: AirtelPaymentRequest = await req.json();

    // Airtel Money API credentials
    const clientId = Deno.env.get("AIRTEL_CLIENT_ID");
    const clientSecret = Deno.env.get("AIRTEL_CLIENT_SECRET");
    const merchantId = Deno.env.get("AIRTEL_MERCHANT_ID");

    if (!clientId || !clientSecret || !merchantId) {
      throw new Error("Airtel Money credentials not configured");
    }

    // Get access token
    const authResponse = await fetch("https://openapiuat.airtel.africa/auth/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
    });

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Initiate payment request
    const paymentResponse = await fetch("https://openapiuat.airtel.africa/merchant/v1/payments/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Country": "KE",
        "X-Currency": "KES",
      },
      body: JSON.stringify({
        reference: reference,
        subscriber: {
          country: "KE",
          currency: "KES",
          msisdn: phoneNumber,
        },
        transaction: {
          amount: amount,
          country: "KE",
          currency: "KES",
          id: `txn_${Date.now()}`,
        },
      }),
    });

    const paymentData = await paymentResponse.json();

    // Store transaction in database
    const { error: dbError } = await supabaseClient
      .from("transactions")
      .insert({
        user_id: user.id,
        transaction_id: paymentData.data?.transaction?.id,
        payment_method: "airtel",
        amount: amount,
        phone_number: phoneNumber,
        status: "pending",
        created_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error("Database error:", dbError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Payment request sent. Please check your phone for Airtel Money prompt.",
      transactionId: paymentData.data?.transaction?.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Airtel payment error:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "Payment processing failed" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
