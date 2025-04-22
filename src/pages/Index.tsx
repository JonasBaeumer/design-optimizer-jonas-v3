import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fadeIn } from '@/utils/transitions';
import MainLayout from '@/layouts/MainLayout';
import Chat from '@/components/Chat';
import ComponentsList from '@/components/ComponentsList';
import ComponentSearch from '@/components/ComponentSearch';
import FloatingChatButton from '@/components/FloatingChatButton';
import SlidingChatPanel from '@/components/SlidingChatPanel';
import { MessageSquare, Package, Search, Database } from 'lucide-react';
import { Message } from '@/types';
import { Link } from 'react-router-dom';

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
  previousTab: string;
  isButtonNavigation: boolean;
  setIsButtonNavigation: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  currentTab: 'chat',
  setCurrentTab: () => {},
  previousTab: '',
  isButtonNavigation: false,
  setIsButtonNavigation: () => {},
});

// Create a context for chat state
export const ChatContext = React.createContext<{
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userInputCount: number;
  setUserInputCount: React.Dispatch<React.SetStateAction<number>>;
  addSummaryMessage: () => void;
}>({
  messages: [],
  setMessages: () => {},
  loading: false,
  setLoading: () => {},
  userInputCount: 0,
  setUserInputCount: () => {},
  addSummaryMessage: () => {},
});

const Index = () => {
  const [currentTab, setCurrentTab] = useState('chat');
  const [previousTab, setPreviousTab] = useState('');
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(false);
  const [isButtonNavigation, setIsButtonNavigation] = useState(false);
  
  // Lifted chat state - ensure initial message is included
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const [userInputCount, setUserInputCount] = useState(0);

  // Track tab changes
  useEffect(() => {
    if (currentTab !== previousTab) {
      setPreviousTab(currentTab);
    }
  }, [currentTab]);

  const openChatPanel = () => setIsChatPanelOpen(true);
  const closeChatPanel = () => setIsChatPanelOpen(false);
  
  // Function to switch to the chat tab and set button navigation flag
  const navigateToChat = () => {
    setIsButtonNavigation(true);
    setCurrentTab('chat');
  };

  // Function to add the summary message
  const addSummaryMessage = () => {
    const summaryMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: "I see that you have reviewed all the provided items. In total you made the following changes:\n\nChange Summary:\n• Replaced: Position Sensor PS-1001R in the Linear Actuator LA-2045-B\n• With: Position Sensor PS-2000X\n• Reason: Item was out of stock\n\nWould you like me to forward this final parts list to the project buyer?",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, summaryMessage]);
  };

  return (
    <TabContext.Provider value={{ 
      currentTab, 
      setCurrentTab, 
      previousTab,
      isButtonNavigation,
      setIsButtonNavigation
    }}>
      <ChatContext.Provider value={{ 
        messages, 
        setMessages, 
        loading, 
        setLoading, 
        userInputCount, 
        setUserInputCount,
        addSummaryMessage
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
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="chat" className="flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat Interface
                </TabsTrigger>
                <TabsTrigger value="search" className="flex items-center justify-center">
                  <Search className="h-4 w-4 mr-2" />
                  Component Search
                </TabsTrigger>
                <TabsTrigger value="analyzer" className="flex items-center justify-center">
                  <Database className="h-4 w-4 mr-2" />
                  <Link to="/master-data-analyzer">Master Data Analyzer</Link>
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
              
              <TabsContent value="search" className="mt-0">
                <div className="w-full">
                  <ComponentSearch />
                </div>
              </TabsContent>
              
              <TabsContent value="analyzer" className="mt-0">
                <div className="w-full">
                  <div className="text-center p-8">
                    <Database className="h-12 w-12 mx-auto mb-4 text-primary/70" />
                    <h2 className="text-2xl font-bold mb-2">Master Data Analyzer</h2>
                    <p className="text-muted-foreground mb-6">
                      Analyze your component data, identify duplicates, and find optimization opportunities.
                    </p>
                    <Link 
                      to="/master-data-analyzer"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                      Open Master Data Analyzer
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="components" className="mt-0">
                <div className="w-full">
                  <ComponentsList onNavigateToChat={navigateToChat} />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Show floating chat button only when not on chat tab */}
          {currentTab !== 'chat' && (
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
