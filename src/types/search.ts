export type ViewMode = "grid" | "list" | "map";

export interface SearchFilters {
  searchTerm: string;
  propertyType: string;
  priceRange: number[];
  surfaceRange: number[];
  showLiveOnly: boolean;
  transactionType: string;
  city: string;
  neighborhood: string;
}