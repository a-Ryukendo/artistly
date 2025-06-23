"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

/**
 * A wrapper around the `next-themes` ThemeProvider.
 * This client component is responsible for providing theme context (light/dark)
 * to the entire application. It's used in the root layout.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
} 