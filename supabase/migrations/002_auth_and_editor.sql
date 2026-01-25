-- Birth Plan Builder: Authentication and Editor Support
-- This migration adds auth integration and enhanced editor capabilities

-- ============================================================
-- PART 1: Auth Integration for Users Table
-- ============================================================

-- Add auth-related columns to users table
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS auth_provider TEXT;

-- Create unique index on auth_user_id (excluding nulls for anonymous users)
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_auth_user_id
  ON users(auth_user_id)
  WHERE auth_user_id IS NOT NULL;

-- ============================================================
-- PART 2: Extend birth_plans Table
-- ============================================================

-- Add auth and editor-related columns to birth_plans
ALTER TABLE birth_plans
  ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS title TEXT DEFAULT 'My Birth Plan',
  ADD COLUMN IF NOT EXISTS editor_data JSONB,
  ADD COLUMN IF NOT EXISTS source TEXT,
  ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS last_accessed_at TIMESTAMPTZ DEFAULT NOW();

-- Add CHECK constraint for source column (only if not already exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'birth_plans_source_check'
  ) THEN
    ALTER TABLE birth_plans
      ADD CONSTRAINT birth_plans_source_check
      CHECK (source IN ('quiz', 'editor', 'quiz_converted'));
  END IF;
END $$;

-- Create index on auth_user_id for faster user lookups
CREATE INDEX IF NOT EXISTS idx_birth_plans_auth_user_id
  ON birth_plans(auth_user_id)
  WHERE auth_user_id IS NOT NULL;

-- ============================================================
-- PART 3: Update RLS Policies
-- ============================================================

-- Drop existing policies that we need to replace
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Allow session-based birth plan access" ON birth_plans;
DROP POLICY IF EXISTS "Allow birth plan updates" ON birth_plans;

-- Users table policies
-- Allow authenticated users to view their own data (by auth_user_id)
CREATE POLICY "Authenticated users can view own data" ON users
  FOR SELECT USING (
    auth.uid() = auth_user_id
    OR auth.role() = 'service_role'
  );

-- Allow authenticated users to update their own data
CREATE POLICY "Authenticated users can update own data" ON users
  FOR UPDATE USING (
    auth.uid() = auth_user_id
    OR auth.role() = 'service_role'
  );

-- Birth plans table policies
-- Allow users to view their own authenticated plans
CREATE POLICY "Authenticated users can view own birth plans" ON birth_plans
  FOR SELECT USING (
    auth.uid() = auth_user_id
    OR auth.role() = 'service_role'
    OR true -- Allow session-based access for backwards compatibility
  );

-- Allow users to update their own authenticated plans
CREATE POLICY "Authenticated users can update own birth plans" ON birth_plans
  FOR UPDATE USING (
    auth.uid() = auth_user_id
    OR auth.role() = 'service_role'
    OR true -- Allow session-based updates for backwards compatibility
  );

-- Allow anonymous inserts for quiz flow (where auth_user_id IS NULL)
-- This policy already exists as "Allow anonymous birth plan creation"
-- but we'll ensure it explicitly allows null auth_user_id
DROP POLICY IF EXISTS "Allow anonymous birth plan creation" ON birth_plans;
CREATE POLICY "Allow anonymous birth plan creation" ON birth_plans
  FOR INSERT WITH CHECK (
    auth_user_id IS NULL -- Explicitly allow anonymous quiz flow
    OR auth.uid() = auth_user_id -- Or authenticated user creating their own
    OR auth.role() = 'service_role'
  );

-- ============================================================
-- PART 4: Auto-update Trigger for last_accessed_at
-- ============================================================

-- Create trigger function to update last_accessed_at
CREATE OR REPLACE FUNCTION update_last_accessed_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_accessed_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to birth_plans table
DROP TRIGGER IF EXISTS update_birth_plans_last_accessed ON birth_plans;
CREATE TRIGGER update_birth_plans_last_accessed
  BEFORE UPDATE ON birth_plans
  FOR EACH ROW EXECUTE FUNCTION update_last_accessed_at();

-- ============================================================
-- Additional Indexes for Performance
-- ============================================================

-- Index for finding plans by last_accessed_at (for cleanup/archival)
CREATE INDEX IF NOT EXISTS idx_birth_plans_last_accessed_at
  ON birth_plans(last_accessed_at DESC);

-- Index for finding plans by source (for analytics)
CREATE INDEX IF NOT EXISTS idx_birth_plans_source
  ON birth_plans(source)
  WHERE source IS NOT NULL;

-- ============================================================
-- Comments for Documentation
-- ============================================================

COMMENT ON COLUMN users.auth_user_id IS 'Reference to Supabase auth.users, null for anonymous users';
COMMENT ON COLUMN users.avatar_url IS 'User profile picture URL from auth provider';
COMMENT ON COLUMN users.auth_provider IS 'Authentication provider (e.g., google, email)';

COMMENT ON COLUMN birth_plans.auth_user_id IS 'Reference to authenticated user, null for anonymous quiz flow';
COMMENT ON COLUMN birth_plans.title IS 'User-defined title for the birth plan';
COMMENT ON COLUMN birth_plans.editor_data IS 'Full editor state (ProseMirror/TipTap document)';
COMMENT ON COLUMN birth_plans.source IS 'How the plan was created: quiz, editor, or quiz_converted';
COMMENT ON COLUMN birth_plans.version IS 'Version number for tracking plan revisions';
COMMENT ON COLUMN birth_plans.last_accessed_at IS 'Timestamp of last view/edit, auto-updated on modifications';
