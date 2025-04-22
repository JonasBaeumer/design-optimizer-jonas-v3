
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FileUploadButton from './FileUploadButton';
import FileDisplay from './FileDisplay';

interface ChatInputProps {
  onSubmit: (content: string, files?: File[]) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, disabled }) => {
  const [input, setInput] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && selectedFiles.length === 0) return;
    
    onSubmit(input, selectedFiles);
    setInput('');
    setSelectedFiles([]);
  };

  const handleFileSelect = (files: FileList) => {
    const newFiles = Array.from(files).filter(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    );
    setSelectedFiles([...selectedFiles, ...newFiles]);
  };

  return (
    <div className="space-y-2">
      {selectedFiles.length > 0 && <FileDisplay files={selectedFiles} />}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="flex items-center space-x-2 flex-1">
          <FileUploadButton onFileSelect={handleFileSelect} disabled={disabled} />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about substitutions or specifications..."
            className="flex-1"
            disabled={disabled}
          />
        </div>
        <Button 
          type="submit" 
          size="icon" 
          disabled={(!input.trim() && selectedFiles.length === 0) || disabled}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
