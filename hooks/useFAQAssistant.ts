import { useState } from 'react';
import { aiRepository } from '../repositories/aiRepository';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  isAIEnhanced?: boolean;
}

export function useFAQAssistant(sessionId: string) {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '1',
    sender: 'ai',
    text: 'Welcome to Saiscissors! How can I help you today?',
  }]);

  const askQuestion = async (question: string) => {
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    
    setLoading(true);
    try {
      const data = await aiRepository.getFAQAnswer(question, sessionId);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.answer,
        isAIEnhanced: data.isAIEnhanced
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'I apologize, but I am currently offline. Please call us at the shop!'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return { askQuestion, messages, loading };
}
