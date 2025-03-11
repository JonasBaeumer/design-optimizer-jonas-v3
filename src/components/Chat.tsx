
import React, { useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from '@/types';
import { ChatContext } from '@/pages/Index';

// Import the refactored components
import MessageBubble from './chat/MessageBubble';
import ChatInput from './chat/ChatInput';
import TypingIndicator from './chat/TypingIndicator';
import ChatHeader from './chat/ChatHeader';

const Chat = () => {
  const { 
    messages, 
    setMessages, 
    loading, 
    setLoading, 
    userInputCount, 
    setUserInputCount 
  } = useContext(ChatContext);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (input: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    
    // Track user input count for sample message display
    const newInputCount = userInputCount + 1;
    setUserInputCount(newInputCount);

    // Simulate AI response based on input count
    setTimeout(() => {
      // Display respective sample message based on user input count
      if (newInputCount === 1) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Thank you for providing your component list! I've checked the availability of all parts needed for these components and found that some are currently out of stock. Fortunately, there are suitable alternatives available. Please review them by clicking the 'Required Components' tab below.",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else if (newInputCount === 2) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Based on the component list you provided, I've analyzed each subpart to determine which ones are critical (non-replaceable) and which ones can be substituted with similar alternatives. I then compared the list of potential alternatives with our current inventory to identify items available for immediate use. This process ensures that the suggestions I provide are both viable and ready to support your design needs.",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // For any subsequent inputs after the second one, use the default response
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Based on your requirements, I've analyzed our overstock inventory and found several potential substitutions. Here's what I recommend:",
          timestamp: new Date()
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
      }
      
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col rounded-lg border bg-card shadow-soft h-[calc(100vh-13rem)]">
      <ChatHeader />

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
              <MessageBubble message={message} />
            </motion.div>
          ))}

          {loading && <TypingIndicator />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <ChatInput onSubmit={handleSubmit} disabled={loading} />
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
