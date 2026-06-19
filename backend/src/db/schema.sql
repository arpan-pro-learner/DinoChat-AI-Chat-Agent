CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,           -- UUID v4
  created_at BIGINT NOT NULL,    -- Unix timestamp (ms)
  metadata TEXT                  -- JSON string, optional
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,           -- UUID v4
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK(sender IN ('user', 'ai')),
  text TEXT NOT NULL,
  timestamp BIGINT NOT NULL      -- Unix timestamp (ms)
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation
  ON messages(conversation_id, timestamp);
