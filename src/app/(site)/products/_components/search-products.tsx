"use client";

import { Input } from "@/components/ui/input";
import { useSearchProductStore } from "@/stores/product-store";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export function SearchProducts() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounce(inputValue, 300);

  // Only access the store on the client side
  useEffect(() => {
    const { setQuery } = useSearchProductStore.getState();
    setQuery(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="fixed top-17 right-0 left-0 z-50 w-full border-b px-6 py-4 backdrop-blur-sm transition-all duration-300 sm:px-8">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          className="pl-10"
          placeholder="Buscar productos..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
}
