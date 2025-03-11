
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Message } from '@/types';
import { ChatContext } from '@/pages/Index';

// Sample initial message
const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: "Hello, I'm HUGO, your personal parts manager! Provide me with your machine's component list, and I'll check part availability, suggest smart alternatives, and make your machine design process easier.",
  timestamp: new Date()
};

const ChatHeader: React.FC = () => {
  const { setMessages, setUserInputCount } = React.useContext(ChatContext);

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setUserInputCount(0);
  };

  return (
    <div className="flex items-center justify-between border-b px-6 py-3">
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="bg-primary/10 text-primary px-2 py-0 text-xs">Active</Badge>
        <h2 className="text-sm font-medium">Design Optimization Assistant</h2>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 px-2"
        onClick={resetChat}
      >
        <PlusCircle className="h-4 w-4 mr-1" />
        New Chat
      </Button>
    </div>
  );
};

export default ChatHeader;
