
import React, { useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from '@/types';
import { ChatContext, TabContext } from '@/pages/Index';
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
    setUserInputCount,
    addSummaryMessage
  } = useContext(ChatContext);
  
  const { setCurrentTab, previousTab, isButtonNavigation, setIsButtonNavigation, currentTab } = useContext(TabContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentTab === 'chat' && previousTab === 'components' && isButtonNavigation) {
      addSummaryMessage();
      setIsButtonNavigation(false);
    }
  }, [currentTab, previousTab, isButtonNavigation, addSummaryMessage, setIsButtonNavigation]);

  const handleSubmit = (input: string, files?: File[]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      files: files ? Array.from(files).map(f => ({ name: f.name })) : undefined
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    
    const newInputCount = userInputCount + 1;
    setUserInputCount(newInputCount);

    setTimeout(() => {
      let responseMessage: Message;

      if (files && files.length > 0) {
        responseMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Thank you for your request! I have analysed both Component Master Data files and identified several duplicate and similar parts as well as possible opportunities for consolidation.",
          timestamp: new Date(),
          action: {
            type: 'navigate',
            target: 'analyzer',
            buttonText: 'View Master Data Analysis'
          }
        };
      } else if (input.toLowerCase().includes('3mm') && input.toLowerCase().includes('stainless')) {
        responseMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Thank you for the question. Here is a list of all available 3mm Stainless Metric Machine Screws that I was able to find.",
          timestamp: new Date(),
          action: {
            type: 'navigate',
            target: 'search',
            buttonText: 'View found components'
          }
        };
      } else {
        responseMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I've found some relevant components that might meet your requirements.",
          timestamp: new Date(),
          action: {
            type: 'navigate',
            target: 'search',
            buttonText: 'View components'
          }
        };
      }

      setMessages((prev) => [...prev, responseMessage]);
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
