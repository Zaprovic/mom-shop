import { create } from "zustand";

type SearchProductState = {
  query: string;
  category: string | null;
  sort: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  isSearchBarVisible: boolean;

  // Actions
  setQuery: (query: string) => void;
  setCategory: (category: string | null) => void;
  setSort: (sort: string | null) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  resetFilters: () => void;
  toggleSearchBar: () => void;
  showSearchBar: () => void;
  hideSearchBar: () => void;
};

export const useSearchProductStore = create<SearchProductState>((set) => ({
  query: "",
  category: null,
  sort: null,
  minPrice: null,
  maxPrice: null,
  isSearchBarVisible: false,

  // Set search query text
  setQuery: (query) => set({ query }),

  // Set category filter
  setCategory: (category) => set({ category }),

  // Set sort option
  setSort: (sort) => set({ sort }),

  // Set price range filter
  setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max }),

  // Reset all filters to default values
  resetFilters: () =>
    set({
      query: "",
      category: null,
      sort: null,
      minPrice: null,
      maxPrice: null,
    }),

  // Toggle search bar visibility
  toggleSearchBar: () =>
    set((state) => ({
      isSearchBarVisible: !state.isSearchBarVisible,
    })),

  // Show search bar
  showSearchBar: () => set({ isSearchBarVisible: true }),

  // Hide search bar
  hideSearchBar: () => set({ isSearchBarVisible: false }),
}));
