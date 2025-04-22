
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
  originalComponent?: string;
  recommendedComponent?: string;
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
  replacedWith?: string;
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
  // Properties needed by ReplacementOverlay
  partNumber?: string;
  isRecommended?: boolean;
  stockLevel?: string;
  specifications?: {
    [key: string]: string | number;
  };
}
