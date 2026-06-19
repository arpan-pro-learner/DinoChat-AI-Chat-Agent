import { Router, Request, Response } from 'express';
import { ConversationService } from '../services/conversation';
import { generateReply } from '../services/llm';

const router = Router();

// POST /chat/message
router.post('/message', async (req: Request, res: Response): Promise<void> => {
  const { message, sessionId } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message cannot be empty.' });
    return;
  }

  if (message.length > 4000) {
    res.status(400).json({ error: 'Message is too long (max 4000 characters).' });
    return;
  }

  try {
    // 1. Get or create session
    const finalSessionId = await ConversationService.createConversation(sessionId);

    // 2. Save user message
    await ConversationService.addMessage(finalSessionId, 'user', message);

    // 3. Fetch history for context window
    const history = await ConversationService.getRecentMessages(finalSessionId, 11); // Fetch one extra to ensure we can start with user
    
    // Map to Gemini format and reverse to chronological order
    let formattedHistory = history.reverse().map(msg => ({
      role: msg.sender === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: msg.text }]
    }));

    // Remove the message we just added (the last one)
    formattedHistory = formattedHistory.slice(0, -1);

    // Rule: History must start with 'user'. If it starts with 'model', remove it.
    while (formattedHistory.length > 0 && formattedHistory[0].role !== 'user') {
      formattedHistory.shift();
    }

    // 4. Generate AI response
    const reply = await generateReply(formattedHistory, message);

    // 5. Save AI reply
    await ConversationService.addMessage(finalSessionId, 'ai', reply);

    // 6. Return response
    res.json({ reply, sessionId: finalSessionId });
  } catch (error: any) {
    console.error('Chat Route Error:', error);
    if (error.message === 'LLM_ERROR') {
      res.status(500).json({ error: "Our AI agent is having a moment. Please try again shortly." });
    } else if (error.message === 'LLM_CONFIG_ERROR') {
      res.status(500).json({ error: "AI configuration is missing on the server." });
    } else if (error.message === 'LLM_QUOTA_ERROR') {
      res.status(429).json({ error: "Dino is a bit overwhelmed with questions! Please wait a moment before asking more. 🦕💤" });
    } else if (error.message === 'LLM_BUSY_ERROR') {
      res.status(503).json({ error: "Dino is currently talking to many friends at once. Please try again in 30 seconds! 🦖💨" });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
});

// GET /chat/history/:sessionId
router.get('/history/:sessionId', async (req: Request, res: Response): Promise<void> => {
  const { sessionId } = req.params;
  
  try {
    const messages = await ConversationService.getHistory(sessionId as string);
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch message history." });
  }
});

export default router;
