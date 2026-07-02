# CineVerse

A modern movie browsing application built with React, TypeScript, and Vite. Discover movies, write reviews, manage your watchlist, and browse through trending titles.

## Features

### Core Features
- **Movie Catalog** - Browse all available movies with search and filter capabilities
- **Trending Section** - View top trending movies sorted by review count and recency
- **Movie Details** - View detailed information including rating, runtime, genre, and reviews
- **Reviews System** - Write and read user reviews with 1-10 ratings
- **Watchlist** - Save movies to your personal watchlist for later viewing

### User Roles
- **Standard Users** - Can browse movies, write reviews, and manage their watchlist
- **Admin Users** - Full access to movie and genre management via the Admin Panel

### Admin Panel
- Add, edit, and delete movies
- Manage movie genres
- Full CRUD operations for content management

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 8 | Build tool & dev server |
| Zustand | State management |
| React Router 8 | Client-side routing |
| OxLint | Linting |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd cineverse

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run OxLint |

## Project Structure

```
cineverse/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components
│   │   ├── AdminControls.tsx
│   │   ├── FilterBar.tsx
│   │   ├── Layout.tsx
│   │   ├── MovieCard.tsx
│   │   ├── ReviewForm.tsx
│   │   ├── ReviewList.tsx
│   │   ├── RoleSwitcher.tsx
│   │   ├── SearchBar.tsx
│   │   └── WatchlistToggle.tsx
│   ├── data/           # Seed data and mock data
│   │   └── seed.ts
│   ├── pages/          # Route components
│   │   ├── Home.tsx
│   │   ├── MovieDetail.tsx
│   │   ├── AdminPanel.tsx
│   │   └── NotFound.tsx
│   ├── store/          # Zustand state management
│   │   └── useStore.ts
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx         # Main app with routing
│   ├── App.css         # Component styles
│   ├── index.css       # Global styles
│   └── main.tsx        # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  role: 'standard' | 'admin';
  watchlist: string[];
}
```

### Movie
```typescript
interface Movie {
  id: string;
  title: string;
  description: string | null;
  releaseDate: string | null;
  runtime: number | null;
  posterUrl: string | null;
  genreId: string | null;
}
```

### Review
```typescript
interface Review {
  id: string;
  movieId: string;
  userId: string;
  rating: number;
  text: string;
  createdAt: string;
}
```

### Genre
```typescript
interface Genre {
  id: string;
  name: string;
}
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Browse all movies, trending section, search & filters |
| `/movie/:id` | MovieDetail | View movie details, reviews, and write reviews |
| `/admin` | AdminPanel | Manage movies and genres (admin only) |
| `*` | NotFound | 404 page |

## State Management

The app uses Zustand for global state management with the following features:
- **Users** - List of users with roles (standard/admin)
- **Movies** - Full movie catalog
- **Reviews** - User reviews for movies
- **Genres** - Movie genre categories
- **Current User** - Active user session
- **Filters** - Search query, selected genre, and year filters

## Styling

- Modern, clean UI design
- CSS custom properties for theming
- Responsive layout with flexbox/grid
- Dark header with light content area
- Card-based movie display

## Development

### Adding New Features

1. Create component in `src/components/`
2. Add page in `src/pages/` if needed
3. Update routes in `src/App.tsx`
4. Add state/actions in `src/store/useStore.ts` if needed

### Data Management

The app uses seed data for demonstration. To modify:
- Edit `src/data/seed.ts` for initial data
- Use Admin Panel for runtime data management

## License

MIT
