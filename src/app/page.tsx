"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Mic, Users, Disc3 } from "lucide-react";

// Data for the artist category cards displayed on the homepage
const categories = [
  {
    name: "Singers",
    icon: <Music className="w-8 h-8 text-blue-500" />,
    description: "Vocalists for every occasion."
  },
  {
    name: "Dancers",
    icon: <Users className="w-8 h-8 text-pink-500" />,
    description: "Classical, contemporary, and more."
  },
  {
    name: "Speakers",
    icon: <Mic className="w-8 h-8 text-green-500" />,
    description: "Motivational, emcees, and experts."
  },
  {
    name: "DJs",
    icon: <Disc3 className="w-8 h-8 text-yellow-500" />,
    description: "Party and event DJs."
  }
];

/**
 * The homepage for Artistly.com.
 * It features a hero section with a call-to-action and a grid of artist categories.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Top Performing Artists for Your Event</h1>
        <p className="mb-8 text-lg text-slate-700 max-w-2xl">
          Artistly.com connects event planners with talented singers, dancers, speakers, and DJs. Discover, shortlist, and book the perfect artist for your next event.
        </p>
        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Link href="/artists"><Button size="lg">Explore Artists</Button></Link>
          <Link href="/onboard"><Button size="lg" variant="secondary">Onboard as Artist</Button></Link>
        </div>
        {/* Category Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full max-w-4xl">
          {categories.map((cat) => (
            <Card key={cat.name} className="flex flex-col items-center p-6">
              {cat.icon}
              <CardContent className="flex flex-col items-center mt-2">
                <div className="font-semibold text-lg mb-1">{cat.name}</div>
                <div className="text-slate-500 text-sm">{cat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
