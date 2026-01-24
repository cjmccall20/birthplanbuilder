-- Birth Plan Builder Database Schema
-- This migration creates the complete schema for the birth plan builder application

-- Drop existing tables if they exist (clean slate)
DROP TABLE IF EXISTS decisions CASCADE;
DROP TABLE IF EXISTS email_sends CASCADE;
DROP TABLE IF EXISTS birth_plans CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  due_date DATE,
  lifecycle_stage TEXT DEFAULT 'new',
  marketing_consent BOOLEAN DEFAULT false,
  unsure_topics TEXT[], -- Array of decision keys they marked as "unsure"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Birth plans table
CREATE TABLE birth_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL, -- For anonymous users before registration
  template_style TEXT DEFAULT 'minimal',
  birth_team JSONB DEFAULT '{}',
  custom_notes JSONB DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'sent')),
  pdf_url TEXT, -- URL to generated PDF in storage
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Decisions table (individual quiz answers)
CREATE TABLE decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  birth_plan_id UUID NOT NULL REFERENCES birth_plans(id) ON DELETE CASCADE,
  decision_key TEXT NOT NULL, -- e.g., 'vitamin_k', 'cord_clamping'
  answer TEXT NOT NULL, -- The selected option value
  custom_note TEXT, -- Optional note for this specific decision
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(birth_plan_id, decision_key)
);

-- Email sends table (for tracking lifecycle marketing)
CREATE TABLE email_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  birth_plan_id UUID REFERENCES birth_plans(id) ON DELETE SET NULL,
  email_type TEXT NOT NULL, -- 'birth_plan_delivery', 'day_3_followup', 'upsell', etc.
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'
);

-- Indexes for common queries
CREATE INDEX idx_users_due_date ON users(due_date);
CREATE INDEX idx_users_lifecycle_stage ON users(lifecycle_stage);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_birth_plans_user_id ON birth_plans(user_id);
CREATE INDEX idx_birth_plans_session_id ON birth_plans(session_id);
CREATE INDEX idx_birth_plans_status ON birth_plans(status);
CREATE INDEX idx_decisions_birth_plan_id ON decisions(birth_plan_id);
CREATE INDEX idx_email_sends_user_id ON email_sends(user_id);

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_birth_plans_updated_at
  BEFORE UPDATE ON birth_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE birth_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sends ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for lead capture
CREATE POLICY "Allow anonymous user creation" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous birth plan creation" ON birth_plans
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous decision creation" ON decisions
  FOR INSERT WITH CHECK (true);

-- Allow read/update for own data (when authenticated)
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text OR auth.role() = 'service_role');

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text OR auth.role() = 'service_role');

-- Birth plans - allow read for session-based access
CREATE POLICY "Allow session-based birth plan access" ON birth_plans
  FOR SELECT USING (true);

CREATE POLICY "Allow birth plan updates" ON birth_plans
  FOR UPDATE USING (true);

CREATE POLICY "Allow decision reads" ON decisions
  FOR SELECT USING (true);

CREATE POLICY "Allow decision updates" ON decisions
  FOR UPDATE USING (true);

-- Service role has full access for email tracking
CREATE POLICY "Service role full access to email_sends" ON email_sends
  FOR ALL USING (auth.role() = 'service_role');
