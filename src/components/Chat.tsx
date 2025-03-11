
import React, { useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowDown, PlusCircle, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Message } from '@/types';
import { TabContext, ChatContext } from '@/pages/Index';
import RecommendationCard from './RecommendationCard';

// Sample messages for different conversation stages
const SAMPLE_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello, I'm HUGO, your personal parts manager! Provide me with your machine's component list, and I'll check part availability, suggest smart alternatives, and make your machine design process easier.",
    timestamp: new Date()
  },
  {
    id: '2',
    role: 'assistant',
    content: "Thank you for providing your component list! I've checked the availability of all parts needed for these components and found that some are currently out of stock. Fortunately, there are suitable alternatives available. Please review them by clicking the 'Required Components' tab below.",
    timestamp: new Date()
  },
  {
    id: '3',
    role: 'assistant',
    content: "Based on the component list you provided, I've analyzed each subpart to determine which ones are critical (non-replaceable) and which ones can be substituted with similar alternatives. I then compared the list of potential alternatives with our current inventory to identify items available for immediate use. This process ensures that the suggestions I provide are both viable and ready to support your design needs.",
    timestamp: new Date()
  },
  {
    id: '4',
    role: 'assistant',
    content: "Thank you for reviewing the provided list. Based on your decisions, I've created an updated version. You can view it directly in the app using the familiar review interface or export it as an Excel file for further analysis.",
    timestamp: new Date()
  }
];

const Chat = () => {
  const { setCurrentTab } = useContext(TabContext);
  const { 
    messages, 
    setMessages, 
    loading, 
    setLoading, 
    userInputCount, 
    setUserInputCount 
  } = useContext(ChatContext);
  
  const [input, setInput] = React.useState('');
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
    
    // Track user input count for sample message display
    const newInputCount = userInputCount + 1;
    setUserInputCount(newInputCount);

    // Simulate AI response based on input count
    setTimeout(() => {
      // Display respective sample message based on user input count
      if (newInputCount === 1) {
        setMessages((prev) => [...prev, SAMPLE_MESSAGES[1]]);
      } else if (newInputCount === 2) {
        setMessages((prev) => [...prev, SAMPLE_MESSAGES[2]]);
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

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => (
      <p key={i} className={line === '' ? 'h-4' : 'mb-3 last:mb-0'}>
        {line}
      </p>
    ));
  };

  const navigateToComponentsTab = () => {
    // Use the context to change the tab
    setCurrentTab('components');
  };

  return (
    <div className="flex flex-col rounded-lg border bg-card shadow-soft h-[calc(100vh-13rem)]">
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-primary/10 text-primary px-2 py-0 text-xs">Active</Badge>
          <h2 className="text-sm font-medium">Design Optimization Assistant</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2"
          onClick={() => {
            setMessages([SAMPLE_MESSAGES[0]]);
            setUserInputCount(0);
          }}
        >
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
                  
                  {/* Add the clickable element for message ID 2 */}
                  {message.id === '2' && (
                    <Button 
                      onClick={navigateToComponentsTab}
                      className="mt-3 bg-primary/10 hover:bg-primary/20 text-primary"
                      size="sm"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      View Required Components
                    </Button>
                  )}
                </div>

                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 ml-3 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">ME</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}

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
