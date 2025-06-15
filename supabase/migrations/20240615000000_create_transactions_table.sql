
-- Create transactions table to track all payment transactions
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  checkout_request_id TEXT,
  transaction_id TEXT,
  stripe_session_id TEXT,
  payment_method TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'KES',
  phone_number TEXT,
  bank_account TEXT,
  bank_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reference TEXT,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own transactions
CREATE POLICY "select_own_transactions" ON public.transactions
FOR SELECT
USING (user_id = auth.uid());

-- Create policy for users to insert their own transactions
CREATE POLICY "insert_own_transactions" ON public.transactions
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Create policy for edge functions to update transactions
CREATE POLICY "update_transactions" ON public.transactions
FOR UPDATE
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_status ON public.transactions(status);
CREATE INDEX idx_transactions_payment_method ON public.transactions(payment_method);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_transactions_updated_at 
    BEFORE UPDATE ON public.transactions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
