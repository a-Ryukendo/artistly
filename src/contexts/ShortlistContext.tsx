"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context data and functions
interface ShortlistContextType {
  shortlist: string[];
  addToShortlist: (id: string) => void;
  removeFromShortlist: (id: string) => void;
}

// Create the React Context
const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

/**
 * A custom hook to easily access the ShortlistContext.
 * Throws an error if used outside of a ShortlistProvider.
 */
export function useShortlist() {
  const ctx = useContext(ShortlistContext);
  if (!ctx) throw new Error("useShortlist must be used within a ShortlistProvider");
  return ctx;
}

/**
 * The provider component for the ShortlistContext.
 * It manages the state for the shortlist and provides it to its children.
 * It should be placed high up in the component tree (e.g., in the root layout).
 */
export function ShortlistProvider({ children }: { children: ReactNode }) {
  // State to hold the array of shortlisted artist IDs
  const [shortlist, setShortlist] = useState<string[]>([]);

  // Function to add an artist to the shortlist (if not already present)
  const addToShortlist = (id: string) => {
    setShortlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  // Function to remove an artist from the shortlist
  const removeFromShortlist = (id: string) => {
    setShortlist((prev) => prev.filter((item) => item !== id));
  };

  return (
    <ShortlistContext.Provider value={{ shortlist, addToShortlist, removeFromShortlist }}>
      {children}
    </ShortlistContext.Provider>
  );
} 