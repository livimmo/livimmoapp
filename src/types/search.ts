export type ViewMode = "grid" | "list";

export interface SearchFilters {
  searchTerm: string;
  propertyType: string;
  priceRange: number[];
  surfaceRange: number[];
  showLiveOnly: boolean;
  transactionType: string;
}