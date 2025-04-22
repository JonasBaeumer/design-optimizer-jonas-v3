export interface PartItem {
  id: string;
  componentId: string;
  name: string;
  supplier: string;
  quantity2023: number;
  quantity2024: number;
  quantity2025: number;
  leadTime: number;
  pricePerUnit: number;
  similarityScore?: number;
  isDuplicate?: boolean;
  isHighlySimilar?: boolean;
  identicalGroupId?: string; // Added for grouping identical parts
}

export interface PartGroup {
  id: string;
  name: string;
  totalUnits: number;
  itemCount: number;
  items: PartItem[];
  bestPickIds: string[];
}

export type SortField = 'componentId' | 'supplier' | 'quantity2023' | 'quantity2024' | 'quantity2025' | 'leadTime' | 'pricePerUnit';
export type SortDirection = 'asc' | 'desc';
