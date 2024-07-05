// app/providers.tsx
"use client";

import { FilterProvider } from "@/context/FIlterContext";
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const customTheme = extendTheme(
    withDefaultColorScheme({ colorScheme: "purple" })
  );

  return (
    <ChakraProvider theme={customTheme}>
      <FilterProvider>{children}</FilterProvider>
    </ChakraProvider>
  );
}
