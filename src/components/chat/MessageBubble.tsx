
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import { Message } from '@/types';
import { TabContext } from '@/pages/Index';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { setCurrentTab } = React.useContext(TabContext);
  
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => (
      <p key={i} className={line === '' ? 'h-4' : 'mb-3 last:mb-0'}>
        {line}
      </p>
    ));
  };

  const navigateToComponentsTab = () => {
    setCurrentTab('components');
  };

  return (
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
        
        {/* Only show the button for specific messages */}
        {message.content.includes("Please review them by clicking the 'Required Components' tab below") && (
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
  );
};

export default MessageBubble;
