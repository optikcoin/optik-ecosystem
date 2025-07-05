/*
  # Token and Transaction Management System

  1. New Tables
    - `tokens`
      - Token information and metadata
    - `transactions`
      - All platform transactions
    - `subscriptions`
      - Subscription management
    - `payments`
      - Payment history with Stripe integration

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- Create tokens table
CREATE TABLE IF NOT EXISTS tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  symbol text NOT NULL,
  description text,
  total_supply bigint NOT NULL,
  decimals integer DEFAULT 9,
  contract_address text UNIQUE,
  image_url text,
  website_url text,
  telegram_url text,
  twitter_url text,
  market_cap decimal(20,2) DEFAULT 0,
  current_price decimal(20,8) DEFAULT 0,
  holders_count integer DEFAULT 0,
  trading_volume_24h decimal(20,2) DEFAULT 0,
  price_change_24h decimal(10,4) DEFAULT 0,
  liquidity_pool_sol decimal(20,6) DEFAULT 0,
  liquidity_pool_tokens decimal(20,6) DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'flagged')),
  flagged_reason text,
  audit_score integer CHECK (audit_score >= 0 AND audit_score <= 100),
  risk_level text DEFAULT 'medium' CHECK (risk_level IN ('low', 'medium', 'high')),
  launch_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  token_id uuid REFERENCES tokens(id) ON DELETE SET NULL,
  type text NOT NULL CHECK (type IN ('buy', 'sell', 'swap', 'stake', 'unstake', 'mining_reward', 'referral_bonus')),
  amount decimal(20,6) NOT NULL,
  price decimal(20,8),
  total_value decimal(20,2),
  fee decimal(20,6) DEFAULT 0,
  from_token text,
  to_token text,
  transaction_hash text UNIQUE,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  block_number bigint,
  gas_used bigint,
  created_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  stripe_subscription_id text UNIQUE,
  plan_type text NOT NULL CHECK (plan_type IN ('pro_creator', 'ultimate_bundle')),
  status text NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due', 'unpaid')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  stripe_payment_intent_id text UNIQUE,
  stripe_charge_id text,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'usd',
  status text NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed', 'cancelled')),
  payment_method text,
  description text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create staking table
CREATE TABLE IF NOT EXISTS staking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  amount decimal(20,6) NOT NULL,
  pool_type text NOT NULL CHECK (pool_type IN ('flexible', '30_day', '90_day')),
  apy decimal(5,2) NOT NULL,
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'withdrawn')),
  rewards_earned decimal(20,6) DEFAULT 0,
  last_reward_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create mining table
CREATE TABLE IF NOT EXISTS mining (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  hash_rate decimal(10,2) DEFAULT 0,
  earnings_today decimal(20,6) DEFAULT 0,
  total_earnings decimal(20,6) DEFAULT 0,
  pool_name text DEFAULT 'OPTK Main Pool',
  status text DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'paused')),
  last_mining_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE staking ENABLE ROW LEVEL SECURITY;
ALTER TABLE mining ENABLE ROW LEVEL SECURITY;

-- Tokens policies
CREATE POLICY "Anyone can read active tokens"
  ON tokens
  FOR SELECT
  USING (status = 'active' OR auth.uid() = creator_id);

CREATE POLICY "Users can create tokens"
  ON tokens
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update own tokens"
  ON tokens
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id);

-- Transactions policies
CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can read own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can read own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Staking policies
CREATE POLICY "Users can manage own staking"
  ON staking
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Mining policies
CREATE POLICY "Users can manage own mining"
  ON mining
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER update_tokens_updated_at
  BEFORE UPDATE ON tokens
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mining_updated_at
  BEFORE UPDATE ON mining
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();