import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArtistList from "@/components/ArtistList";
import fs from "fs/promises";
import path from "path";
import { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';

// Page-specific metadata for SEO
export const metadata: Metadata = {
  title: 'Browse Artists',
  description: 'Find and filter talented singers, dancers, speakers, and DJs for your next event.',
};

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

/**
 * Fetches artist data from the local JSON file.
 * This function runs on the server.
 * @returns A promise that resolves to an array of artists.
 */
async function getArtists(): Promise<Artist[]> {
  // Opt out of data caching. Ensures we always read the latest file from disk.
  noStore();
  // Construct the full path to the data file
  const filePath = path.join(process.cwd(), "src/data/artists.json");
  // Read the file contents
  const jsonData = await fs.readFile(filePath, "utf-8");
  // Parse the JSON data
  const data = JSON.parse(jsonData);
  return data;
}

/**
 * The Artist Listing page. This is a Server Component.
 * It fetches data on the server and then passes it to the `ArtistList` client component.
 */
export default async function ArtistsPage() {
  // Fetch artists on the server-side
  const artists = await getArtists();

  return (
    <main className="min-h-screen p-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <h1 className="text-2xl font-bold">Browse Artists</h1>
          <Link href="/">
            <Button variant="secondary">Home</Button>
          </Link>
        </div>
        {/* Render the client component, passing the fetched data as a prop */}
        <ArtistList artists={artists} />
      </div>
    </main>
  );
} 