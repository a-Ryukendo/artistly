import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Define the shape of an Artist
interface Artist {
    id: string;
    name: string;
    genre: string;
    location: string;
    bio: string;
    image?: string;
    availability: string;
    rate: string;
  }

// The path to our data file
const dataFilePath = path.join(process.cwd(), "src/data/artists.json");

/**
 * API handler for POST requests to /api/artists
 * This function receives new artist data, reads the existing data file,
 * appends the new artist, and writes the updated data back to the file.
 */
export async function POST(request: Request) {
  try {
    // 1. Read the existing artists
    const fileContents = await fs.readFile(dataFilePath, "utf-8");
    const artists: Artist[] = JSON.parse(fileContents);

    // 2. Get the new artist data from the request body
    const newArtistData = await request.json();

    // 3. Create a new artist object with a unique ID
    const newArtist: Artist = {
        id: new Date().getTime().toString(), // Simple unique ID
        ...newArtistData,
        // Use provided availability or set a sensible default
        availability: newArtistData.availability || "Contact for availability", 
        // The form sends categories/languages, but our model uses a single 'genre' string.
        // We'll combine the categories for simplicity in this demo.
        genre: newArtistData.categories.join(', '),
    };

    // 4. Add the new artist to the array
    artists.push(newArtist);

    // 5. Write the updated array back to the file
    await fs.writeFile(dataFilePath, JSON.stringify(artists, null, 2));

    // 6. Return a success response
    return NextResponse.json({ message: "Artist added successfully", artist: newArtist }, { status: 201 });

  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return NextResponse.json({ message: "Error writing to file" }, { status: 500 });
  }
} 