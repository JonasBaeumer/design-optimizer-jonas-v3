
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowDown, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Message, Recommendation } from '@/types';
import RecommendationCard from './RecommendationCard';

const SAMPLE_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm the Design Optimizer Assistant. I can help you optimize your machine designs using our current overstock inventory. Your historical design data has already been processed. Feel free to ask questions about component substitutions or specifications.",
    timestamp: new Date()
  }
];

const SAMPLE_RECOMMENDATIONS: Recommendation[] = [
  {
    id: '1',
    originalComponent: {
      id: 'c1',
      name: 'Linear Actuator',
      partNumber: 'LA-2045-B',
      description: 'High-precision linear actuator with 200mm stroke',
      category: 'Motion Control',
      specifications: {
        stroke: '200mm',
        force: '5000N',
        speed: '100mm/s'
      },
      quantity: 2,
      inStock: false
    },
    recommendedComponent: {
      id: 'c2',
      name: 'Linear Actuator',
      partNumber: 'LA-2045-C',
      description: 'High-precision linear actuator with 250mm stroke',
      category: 'Motion Control',
      specifications: {
        stroke: '250mm',
        force: '5500N',
        speed: '100mm/s'
      },
      quantity: 8,
      inStock: true
    },
    rationale: 'This substitution provides a longer stroke length with higher force capacity while maintaining the same speed. The mounting dimensions are identical, ensuring drop-in compatibility.',
    compatibilityScore: 0.95,
    costSavings: 420.50,
    type: 'part'
  }
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Based on your requirements, I've analyzed our overstock inventory and found several potential substitutions. Here's what I recommend:",
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 1500);
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => (
      <p key={i} className={line === '' ? 'h-4' : 'mb-3 last:mb-0'}>
        {line}
      </p>
    ));
  };

  return (
    <div className="flex flex-col rounded-lg border bg-card shadow-soft h-[calc(100vh-13rem)]">
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-primary/10 text-primary px-2 py-0 text-xs">Active</Badge>
          <h2 className="text-sm font-medium">Design Optimization Assistant</h2>
        </div>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <PlusCircle className="h-4 w-4 mr-1" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 mr-3 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">AI</AvatarFallback>
                  </Avatar>
                )}

                <div className={`px-4 py-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground ml-2 user-message' 
                    : 'bg-secondary text-secondary-foreground assistant-message'
                }`}>
                  <div className="text-sm">{renderContent(message.content)}</div>
                </div>

                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 ml-3 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">ME</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}

          {/* Show recommendations after last assistant message */}
          {messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="pl-11"
            >
              <div className="space-y-3">
                {SAMPLE_RECOMMENDATIONS.map((recommendation) => (
                  <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                ))}
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex">
                <Avatar className="h-8 w-8 mr-3 mt-1">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">AI</AvatarFallback>
                </Avatar>
                <div className="px-4 py-2 bg-secondary rounded-lg flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about substitutions or specifications..."
            className="flex-1"
            disabled={loading}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || loading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-24 right-8 rounded-full shadow-soft border opacity-80 hover:opacity-100"
        onClick={scrollToBottom}
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Chat;
