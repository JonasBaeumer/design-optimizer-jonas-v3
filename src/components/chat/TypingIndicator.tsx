
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const TypingIndicator: React.FC = () => {
  return (
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
  );
};

export default TypingIndicator;
