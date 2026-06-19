import { v4 as uuidv4 } from 'uuid';
import db from '../db/client';

export interface Message {
  id: string;
  conversation_id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  created_at: number;
  metadata?: string;
}

export const ConversationService = {
  createConversation(id?: string): string {
    const sessionId = id || uuidv4();
    const createdAt = Date.now();
    
    // Check if it already exists
    const existing = db.prepare('SELECT id FROM conversations WHERE id = ?').get(sessionId);
    if (!existing) {
      db.prepare('INSERT INTO conversations (id, created_at) VALUES (?, ?)')
        .run(sessionId, createdAt);
    }
    
    return sessionId;
  },

  addMessage(conversationId: string, sender: 'user' | 'ai', text: string): Message {
    const id = uuidv4();
    const timestamp = Date.now();
    
    db.prepare('INSERT INTO messages (id, conversation_id, sender, text, timestamp) VALUES (?, ?, ?, ?, ?)')
      .run(id, conversationId, sender, text, timestamp);
      
    return { id, conversation_id: conversationId, sender, text, timestamp };
  },

  getHistory(conversationId: string): Message[] {
    return db.prepare('SELECT * FROM messages WHERE conversation_id = ? ORDER BY timestamp ASC')
      .all(conversationId) as Message[];
  },

  getRecentMessages(conversationId: string, limit = 10): Message[] {
    return db.prepare('SELECT * FROM messages WHERE conversation_id = ? ORDER BY timestamp DESC LIMIT ?')
      .all(conversationId, limit) as Message[];
  }
};
