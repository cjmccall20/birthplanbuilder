-- Birth Plan Builder: Editor-based Birth Plans V2
-- This migration creates a new table optimized for the editor workflow

-- ============================================================
-- PART 1: Create birth_plans_v2 Table
-- ============================================================

CREATE TABLE IF NOT EXISTS birth_plans_v2 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'My Birth Plan',
  template_style TEXT NOT NULL DEFAULT 'minimal',
  birth_team JSONB NOT NULL DEFAULT '{"mother_name": ""}',
  sections_data JSONB NOT NULL DEFAULT '{}', -- Stores all section states
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT birth_plans_v2_template_style_check
    CHECK (template_style IN ('minimal', 'floral', 'professional', 'elegant', 'rustic'))
);

-- ============================================================
-- PART 2: Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_birth_plans_v2_user_id
  ON birth_plans_v2(user_id);

CREATE INDEX IF NOT EXISTS idx_birth_plans_v2_updated_at
  ON birth_plans_v2(updated_at DESC);

-- ============================================================
-- PART 3: Auto-update Trigger
-- ============================================================

CREATE TRIGGER update_birth_plans_v2_updated_at
  BEFORE UPDATE ON birth_plans_v2
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- PART 4: Row Level Security (RLS)
-- ============================================================

ALTER TABLE birth_plans_v2 ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view their own birth plans
CREATE POLICY "Users can view own birth plans v2" ON birth_plans_v2
  FOR SELECT USING (
    auth.uid() = user_id
    OR auth.role() = 'service_role'
  );

-- Allow authenticated users to insert their own birth plans
CREATE POLICY "Users can create own birth plans v2" ON birth_plans_v2
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    OR auth.role() = 'service_role'
  );

-- Allow authenticated users to update their own birth plans
CREATE POLICY "Users can update own birth plans v2" ON birth_plans_v2
  FOR UPDATE USING (
    auth.uid() = user_id
    OR auth.role() = 'service_role'
  );

-- Allow authenticated users to delete their own birth plans
CREATE POLICY "Users can delete own birth plans v2" ON birth_plans_v2
  FOR DELETE USING (
    auth.uid() = user_id
    OR auth.role() = 'service_role'
  );

-- ============================================================
-- PART 5: Comments for Documentation
-- ============================================================

COMMENT ON TABLE birth_plans_v2 IS 'Editor-based birth plans with structured section data';
COMMENT ON COLUMN birth_plans_v2.user_id IS 'Reference to authenticated user (required)';
COMMENT ON COLUMN birth_plans_v2.title IS 'User-defined title for the birth plan';
COMMENT ON COLUMN birth_plans_v2.template_style IS 'Visual template style for PDF generation';
COMMENT ON COLUMN birth_plans_v2.birth_team IS 'Birth team information (mother, partner, provider, etc.)';
COMMENT ON COLUMN birth_plans_v2.sections_data IS 'Complete editor state for all sections';
COMMENT ON COLUMN birth_plans_v2.updated_at IS 'Timestamp of last update, auto-updated on modifications';
