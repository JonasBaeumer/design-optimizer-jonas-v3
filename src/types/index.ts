
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: { name: string }[];
  action?: {
    type: 'navigate';
    target: string;
    buttonText: string;
  };
}
