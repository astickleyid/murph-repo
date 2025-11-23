-- Create user_memory table for AI personalization
CREATE TABLE IF NOT EXISTS user_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  memory_type TEXT NOT NULL, -- 'preference', 'interest', 'interaction', 'context'
  key TEXT NOT NULL, -- e.g., 'topic_interest', 'comparison_choice', 'preferred_style'
  value JSONB NOT NULL, -- Store flexible data as JSON
  context TEXT, -- Additional context about where/when this was captured
  confidence DECIMAL DEFAULT 1.0, -- How confident we are about this memory (0-1)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_accessed TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS user_memory_user_id_idx ON user_memory(user_id);
CREATE INDEX IF NOT EXISTS user_memory_type_idx ON user_memory(memory_type);
CREATE INDEX IF NOT EXISTS user_memory_key_idx ON user_memory(key);
CREATE INDEX IF NOT EXISTS user_memory_updated_idx ON user_memory(updated_at DESC);
CREATE INDEX IF NOT EXISTS user_memory_value_idx ON user_memory USING GIN(value);

-- Enable RLS
ALTER TABLE user_memory ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own memory"
  ON user_memory FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own memory"
  ON user_memory FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memory"
  ON user_memory FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own memory"
  ON user_memory FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_memory_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_user_memory_timestamp
  BEFORE UPDATE ON user_memory
  FOR EACH ROW
  EXECUTE FUNCTION update_user_memory_timestamp();
