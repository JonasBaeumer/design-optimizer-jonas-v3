
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
  // Properties needed by RecommendationCard
  accepted?: boolean;
  compatibilityScore?: number;
  originalComponent?: {
    name: string;
    partNumber: string;
    specifications: {
      [key: string]: string | number;
    };
  };
  recommendedComponent?: {
    name: string;
    partNumber: string;
    specifications: {
      [key: string]: string | number;
    };
  };
  type?: string;
  rationale?: string;
  costSavings?: number;
}

export interface Subcomponent {
  id: string;
  name: string;
  description: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  critical: boolean;
  // Properties needed by ReplacementOverlay
  originalPartNumber?: string;
  partNumber?: string;
  replacedWith?: {
    name: string;
    partNumber?: string;
  };
}

export interface ReplacementItem {
  id: string;
  name: string;
  description?: string;
  stockCount?: number;
  compatibilityScore: number;
  properties?: {
    [key: string]: string | number;
  };
  // Properties needed by ReplacementOverlay
  partNumber?: string;
  category?: string;
  stockLevel?: number; // Changed from string to number to fix type errors
  isRecommended?: boolean;
  specifications?: {
    [key: string]: string | number;
  };
}
