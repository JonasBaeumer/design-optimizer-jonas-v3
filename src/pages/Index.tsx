
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fadeIn } from '@/utils/transitions';
import MainLayout from '@/layouts/MainLayout';
import Chat from '@/components/Chat';
import ComponentsList from '@/components/ComponentsList';
import FloatingChatButton from '@/components/FloatingChatButton';
import SlidingChatPanel from '@/components/SlidingChatPanel';
import { MessageSquare, Package } from 'lucide-react';
import { Message } from '@/types';

// Sample initial message
const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: "Hello, I'm HUGO, your personal parts manager! Provide me with your machine's component list, and I'll check part availability, suggest smart alternatives, and make your machine design process easier.",
  timestamp: new Date()
};

// Create a context for tab switching and chat state
export const TabContext = React.createContext<{
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}>({
  currentTab: 'chat',
  setCurrentTab: () => {},
});

// Create a context for chat state
export const ChatContext = React.createContext<{
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userInputCount: number;
  setUserInputCount: React.Dispatch<React.SetStateAction<number>>;
}>({
  messages: [],
  setMessages: () => {},
  loading: false,
  setLoading: () => {},
  userInputCount: 0,
  setUserInputCount: () => {},
});

const Index = () => {
  const [currentTab, setCurrentTab] = useState('chat');
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(false);
  
  // Lifted chat state
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const [userInputCount, setUserInputCount] = useState(0);

  const openChatPanel = () => setIsChatPanelOpen(true);
  const closeChatPanel = () => setIsChatPanelOpen(false);

  return (
    <TabContext.Provider value={{ currentTab, setCurrentTab }}>
      <ChatContext.Provider value={{ 
        messages, 
        setMessages, 
        loading, 
        setLoading, 
        userInputCount, 
        setUserInputCount 
      }}>
        <MainLayout>
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="text-center max-w-2xl mx-auto mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Design Optimizer</h1>
                <p className="text-muted-foreground text-lg">
                  Optimize your machine designs using our overstock inventory
                </p>
              </motion.div>
            </div>

            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="chat" className="flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat Interface
                </TabsTrigger>
                <TabsTrigger value="components" className="flex items-center justify-center">
                  <Package className="h-4 w-4 mr-2" />
                  Required Components
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="mt-0">
                <div className="w-full">
                  <Chat />
                </div>
              </TabsContent>
              
              <TabsContent value="components" className="mt-0">
                <div className="w-full">
                  <ComponentsList />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Show floating chat button only when on components tab */}
          {currentTab === 'components' && (
            <FloatingChatButton onClick={openChatPanel} />
          )}

          {/* Sliding chat panel */}
          <SlidingChatPanel isOpen={isChatPanelOpen} onClose={closeChatPanel} />
        </MainLayout>
      </ChatContext.Provider>
    </TabContext.Provider>
  );
};

export default Index;
