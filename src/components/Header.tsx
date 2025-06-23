"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

/**
 * The main header for the application.
 * It is a client component because it contains interactive elements like the theme toggle.
 * It includes navigation links and a button to switch between light and dark modes.
 */
export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-background/80 shadow-sm backdrop-blur-sm sticky top-0 z-50">
      <Link href="/" className="font-bold text-xl tracking-tight">
        Artistly.com
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/artists">
          <Button variant="ghost">Browse Artists</Button>
        </Link>
        <Link href="/onboard">
          <Button variant="ghost">Onboard Artist</Button>
        </Link>
        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {/* Icons for light and dark modes */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </nav>
    </header>
  );
} 