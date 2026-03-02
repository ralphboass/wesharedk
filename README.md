# WeShare DK Web App

A modern ride-sharing web application built with Next.js, connecting to the WeShare DK Firebase backend.

## Features

- 🔍 Search and filter rides by departure, destination, date, and passengers
- 🚗 Browse available rides with detailed information
- 📝 Create new ride offerings
- 👤 User authentication (login/signup)
- 💳 Booking system with seat selection
- 📱 Responsive design with WeShare branding

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Firestore + Authentication)
- **Icons:** Lucide React
- **Date Handling:** date-fns with Danish locale

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── rides/             # Rides pages
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── profile/           # Profile page
│   └── how-it-works/      # Info page
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   └── RideCard.tsx
├── context/               # React context
│   └── AuthContext.tsx
└── lib/                   # Utilities
    ├── firebase.ts        # Firebase config
    ├── firebase-helpers.ts # Firebase functions
    └── types.ts           # TypeScript types
```

## Firebase Configuration

The app connects to the `weshare-dk` Firebase project. Configuration is in `src/lib/firebase.ts`.

## Deployment

This app is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## License

Private - WeShare DK
