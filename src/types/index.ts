
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

export interface Recommendation {
  id: string;
  name: string;
  description: string;
  stockCount: number;
  price: number;
  imageUrl?: string;
  category: string;
  properties: {
    [key: string]: string | number;
  };
}

export interface Subcomponent {
  id: string;
  name: string;
  description: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  critical: boolean;
}

export interface ReplacementItem {
  id: string;
  name: string;
  description: string;
  stockCount: number;
  compatibilityScore: number;
  properties: {
    [key: string]: string | number;
  };
}
