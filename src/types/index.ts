
export interface Component {
  id: string;
  name: string;
  partNumber: string;
  description: string;
  category: string;
  specifications: Record<string, string | number>;
  quantity: number;
  inStock: boolean;
}

export interface Subcomponent {
  name: string;
  partNumber?: string;
  category?: string;
  quantity?: number;
  inStock?: boolean;
  specifications: Record<string, string>;
  replacedWith?: ReplacementItem; // Track if this component has been replaced
  originalPartNumber?: string; // Keep track of the original part number
}

export interface ReplacementItem {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  stockLevel: number;
  specifications: Record<string, string>;
  compatibilityScore: number;
  isRecommended?: boolean;
}

export interface DesignData {
  id: string;
  name: string;
  description: string;
  date: string;
  components: Component[];
}

export interface Recommendation {
  id: string;
  originalComponent: Component;
  recommendedComponent: Component;
  rationale: string;
  compatibilityScore: number;
  costSavings: number;
  type: 'part' | 'module';
  accepted?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Query {
  id: string;
  question: string;
  answer?: string;
  timestamp: Date;
}
