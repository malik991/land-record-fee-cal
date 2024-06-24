"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
//import { useEffect } from "react";
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // useEffect(() => {
  //   const theme = props.defaultTheme || "light";
  //   document.documentElement.classList.add(theme);
  // }, [props.defaultTheme]);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
