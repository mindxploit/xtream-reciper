"use client"
import { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface FilterContextType {
  cuisine: string;
  setCuisine: (value: string) => void;
  diet: string;
  setDiet: (value: string) => void;
  difficulty: string;
  setDifficulty: (value: string) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [cuisine, setCuisine] = useState<string>("");
  const [diet, setDiet] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");

  return (
    <FilterContext.Provider value={{ cuisine, setCuisine, diet, setDiet, difficulty, setDifficulty }}>
      {children}
    </FilterContext.Provider>
  );
};
  
export const useFilterContext = () => useContext(FilterContext) as FilterContextType
