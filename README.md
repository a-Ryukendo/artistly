# Artistly.com - Performing Artist Booking Platform

This is a functional, mobile-responsive web demo for Artistly.com, a fictional platform designed to connect Event Planners and Artist Managers. Event planners can browse artist profiles, filter by category, and shortlist their preferences. Artist Managers can onboard new artists via a multi-step form and view submissions on a dashboard.

This project was built with a focus on modern frontend engineering quality, using best practices in routing, data fetching, responsiveness, state management, and code structure.

## Core Architecture

This project simulates a full-stack application entirely within the Next.js framework.

- **Frontend:** Built with React Server and Client Components. Server Components are used for efficient data fetching, while Client Components handle user interactivity.
- **Backend API:** A Next.js API Route (`/api/artists`) acts as a simple backend. It handles incoming data from the frontend.
- **Data Storage:** A local `artists.json` file serves as the "database" for this demo. The API route reads from and writes to this file, making data submissions permanent.

## Features

### Core Features
- **Homepage:** An overview of the platform with calls-to-action and artist category navigation.
- **Artist Listing Page:** A responsive grid of artist profiles with advanced filtering (by category, location, and price). This page is dynamically rendered to always show the latest data.
- **Artist Onboarding Form:** An accessible, multi-step form with validation (using React Hook Form + Yup) that submits data to the backend API.
- **Permanent Storage:** New artist submissions are permanently saved to the `artists.json` file via the API route.
- **Manager Dashboard:** A simple table to view and manage all artist submissions from the data file.

### Bonus Features
- **Global State Management (`useContext`):** A global "shortlist" feature allows users to save their favorite artists, with state persisted across pages.
- **Lazy Loading & Suspense:** The Artist Listing page uses a skeleton loader, providing an instant loading state while data is fetched on the server.
- **Theme Support (Light/Dark Mode):** A theme toggle in the header allows users to switch between light and dark modes.
- **Page Transitions (`Framer Motion`):** All pages include a smooth fade-in animation for a polished user experience.

## Tech Stack

- **Framework:** Next.js 13+ (App Router)
- **Backend:** Next.js API Routes
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN UI
- **Form Management:** React Hook Form + Yup for validation
- **State Management:** React Hooks (`useState`, `useEffect`) & Context API (`useContext`)
- **Animation:** Framer Motion
- **Data Storage:** Local JSON file (`/src/data/artists.json`)

## Getting Started

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd artistly
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


