"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useShortlist } from "@/contexts/ShortlistContext";

// Define the TypeScript interface for an Artist
interface Artist {
  id: string;
  name: string;
  genre: string;
  location: string;
  bio: string;
  image: string;
  availability: string;
  rate: string;
}

// Static data for filter dropdowns
const categories = ["Singers", "Dancers", "Speakers", "DJs"];
const priceRanges = ["< ₹20,000", "₹20,000 - ₹30,000", "> ₹30,000"];

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
 * A utility function to determine the price range bucket for a given rate.
 * @param rate The artist's rate as a string (e.g., "₹20,000 - ₹30,000").
 * @returns The corresponding price range string.
 */
function getPriceRange(rate: string) {
  // Since the rate is now one of the pre-defined ranges, we can just return it.
  // This is simpler and more reliable than parsing numbers.
  return rate;
}

/**
 * `ArtistList` is a Client Component that handles the interactive parts of the browse page.
 * It receives the initial list of artists from its parent Server Component.
 * It manages filtering state and interactivity.
 */
export default function ArtistList({ artists }: { artists: Artist[] }) {
  // State for the filtered list of artists
  const [filtered, setFiltered] = useState<Artist[]>(artists);
  // State for each filter control
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  // Access the global shortlist context
  const { shortlist, addToShortlist, removeFromShortlist } = useShortlist();

  // An effect that re-runs the filtering logic whenever a filter state changes.
  useEffect(() => {
    let result = artists;
    if (category) result = result.filter(a => getCategory(a.genre) === category);
    if (location) result = result.filter(a => a.location.toLowerCase().includes(location.toLowerCase()));
    if (price) result = result.filter(a => getPriceRange(a.rate) === price);
    setFiltered(result);
  }, [category, location, price, artists]);

  return (
    <>
      {/* Filter Block */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select className="border rounded px-3 py-2" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <input
          className="border rounded px-3 py-2"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <select className="border rounded px-3 py-2" value={price} onChange={e => setPrice(e.target.value)}>
          <option value="">All Price Ranges</option>
          {priceRanges.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>
      {/* Artist Grid/List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((artist) => {
          const isShortlisted = shortlist.includes(artist.id);
          return (
            <Card key={artist.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{artist.name}</CardTitle>
                <div className="text-sm text-slate-500">{getCategory(artist.genre)} • {artist.location}</div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-40 object-cover rounded mb-2 bg-slate-100"
                />
                <div className="mb-2 text-slate-700 text-sm">{artist.bio}</div>
                <div className="text-xs text-slate-400 mb-2">{artist.availability}</div>
                <div className="font-semibold mb-4">{artist.rate}</div>
                <div className="mt-auto flex gap-2">
                  <Button size="sm">Ask for Quote</Button>
                  <Button
                    size="sm"
                    variant={isShortlisted ? "secondary" : "default"}
                    onClick={() =>
                      isShortlisted
                        ? removeFromShortlist(artist.id)
                        : addToShortlist(artist.id)
                    }
                  >
                    {isShortlisted ? "Shortlisted" : "Shortlist"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {/* Conditional rendering for when no artists match the filters */}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-slate-400 py-12">No artists found for selected filters.</div>
        )}
      </div>
    </>
  );
} 