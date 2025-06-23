"use client";

// Note: The 'metadata' export has been removed as it only works in Server Components.
// The page title will be handled by the root layout's title template.

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the TypeScript interface for the data we need on this page
interface Artist {
  id: string;
  name: string;
  genre: string;
  location: string;
  rate: string;
}

/**
 * A utility function to derive a broad category from a specific genre.
 * @param genre The specific genre of the artist.
 * @returns The general category string.
 */
function getCategory(genre: string) {
  if (genre.toLowerCase().includes("sing")) return "Singers";
  if (genre.toLowerCase().includes("dance")) return "Dancers";
  if (genre.toLowerCase().includes("speak") || genre.toLowerCase().includes("comedy")) return "Speakers";
  if (genre.toLowerCase().includes("dj")) return "DJs";
  return genre;
}

/**
 * The Manager Dashboard page.
 * It fetches and displays a list of artist submissions in a table.
 */
export default function DashboardPage() {
  const [artists, setArtists] = useState<Artist[]>([]);

  // Fetch artist data when the component mounts
  useEffect(() => {
    fetch("/data/artists.json")
      .then((res) => res.json())
      .then(setArtists);
  }, []);

  return (
    <main className="min-h-screen p-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Artist Submissions</h1>
        <Card className="overflow-x-auto">
          {/* A responsive table for displaying artist data */}
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Category</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">City</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Fee</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Conditional rendering: show message if no artists, otherwise map over them */}
              {artists.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-slate-400 py-8">No submissions found.</td>
                </tr>
              ) : (
                artists.map((artist) => (
                  <tr key={artist.id} className="border-b dark:border-slate-700">
                    <td className="px-4 py-2 whitespace-nowrap">{artist.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{getCategory(artist.genre)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{artist.location}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{artist.rate}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </main>
  );
} 