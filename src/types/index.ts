export interface User {
  id: string;
  name: string;
  role: 'standard' | 'admin';
  watchlist: string[];
}

export interface Movie {
  id: string;
  title: string;
  description: string | null;
  releaseDate: string | null;
  runtime: number | null;
  posterUrl: string | null;
  genreId: string | null;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface Genre {
  id: string;
  name: string;
}
