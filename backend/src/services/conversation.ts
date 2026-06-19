import { v4 as uuidv4 } from 'uuid';
import pool from '../db/client';

export interface Message {
  id: string;
  conversation_id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string | number;
}

export interface Conversation {
  id: string;
  created_at: string | number;
  metadata?: string;
}

export const ConversationService = {
  async createConversation(id?: string): Promise<string> {
    const sessionId = id || uuidv4();
    const createdAt = Date.now();
    
    // Check if it already exists
    const res = await pool.query('SELECT id FROM conversations WHERE id = $1', [sessionId]);
    if (res.rowCount === 0) {
      await pool.query('INSERT INTO conversations (id, created_at) VALUES ($1, $2)', [sessionId, createdAt]);
    }
    
    return sessionId;
  },

  async addMessage(conversationId: string, sender: 'user' | 'ai', text: string): Promise<Message> {
    const id = uuidv4();
    const timestamp = Date.now();
    
    await pool.query(
      'INSERT INTO messages (id, conversation_id, sender, text, timestamp) VALUES ($1, $2, $3, $4, $5)', 
      [id, conversationId, sender, text, timestamp]
    );
      
    return { id, conversation_id: conversationId, sender, text, timestamp };
  },

  async getHistory(conversationId: string): Promise<Message[]> {
    const res = await pool.query(
      'SELECT * FROM messages WHERE conversation_id = $1 ORDER BY timestamp ASC', 
      [conversationId]
    );
    return res.rows.map(row => ({
      ...row,
      timestamp: Number(row.timestamp) // Postgres BIGINT returns as string in pg
    })) as Message[];
  },

  async getRecentMessages(conversationId: string, limit = 10): Promise<Message[]> {
    const res = await pool.query(
      'SELECT * FROM messages WHERE conversation_id = $1 ORDER BY timestamp DESC LIMIT $2', 
      [conversationId, limit]
    );
    return res.rows.map(row => ({
      ...row,
      timestamp: Number(row.timestamp)
    })) as Message[];
  }
};
