export type ViewMode = "grid" | "list" | "map";

export type ViewType = "all" | "live" | "scheduled" | "virtual" | "replay";

export interface SearchFilters {
  searchTerm: string;
  propertyType: string;
  priceRange: number[];
  surfaceRange: number[];
  showLiveOnly: boolean;
  transactionType: string;
  city: string;
  neighborhood: string;
  viewType: ViewType;
}