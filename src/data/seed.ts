import type { User, Genre, Movie, Review } from '../types';

export const seedUsers: User[] = [
  { id: 'user-1', name: 'Alice', role: 'standard', watchlist: [] },
  { id: 'user-2', name: 'Bob', role: 'standard', watchlist: [] },
  { id: 'user-3', name: 'Admin', role: 'admin', watchlist: [] },
];

export const seedGenres: Genre[] = [
  { id: 'genre-action', name: 'Action' },
  { id: 'genre-comedy', name: 'Comedy' },
  { id: 'genre-drama', name: 'Drama' },
  { id: 'genre-scifi', name: 'Sci-Fi' },
  { id: 'genre-horror', name: 'Horror' },
];

export const seedMovies: Movie[] = [
  {
    id: 'movie-1',
    title: 'The Last Stand',
    description: 'A retired sheriff must defend his small town from a dangerous cartel.',
    releaseDate: '2024-06-15',
    runtime: 118,
    posterUrl: null,
    genreId: 'genre-action',
  },
  {
    id: 'movie-2',
    title: 'Laugh Track',
    description: 'A comedian discovers his jokes are coming true — but not always in a good way.',
    releaseDate: '2023-03-22',
    runtime: 95,
    posterUrl: null,
    genreId: 'genre-comedy',
  },
  {
    id: 'movie-3',
    title: 'Silent Waters',
    description: 'A family reunion at a remote lake house uncovers long-buried secrets.',
    releaseDate: '2025-01-10',
    runtime: 132,
    posterUrl: null,
    genreId: 'genre-drama',
  },
  {
    id: 'movie-4',
    title: 'Quantum Drift',
    description: 'A physicist accidentally opens a portal to a parallel universe.',
    releaseDate: '2024-09-05',
    runtime: 141,
    posterUrl: null,
    genreId: 'genre-scifi',
  },
  {
    id: 'movie-5',
    title: 'The Haunting',
    description: 'A group of friends spends a night in an abandoned asylum.',
    releaseDate: '2022-10-31',
    runtime: 104,
    posterUrl: null,
    genreId: 'genre-horror',
  },
];

export const seedReviews: Review[] = [
  {
    id: 'review-1',
    movieId: 'movie-1',
    userId: 'user-1',
    rating: 8,
    text: 'Great action sequences, solid plot.',
    createdAt: '2024-07-01T10:00:00Z',
  },
  {
    id: 'review-2',
    movieId: 'movie-1',
    userId: 'user-2',
    rating: 7,
    text: 'Entertaining but predictable at times.',
    createdAt: '2024-07-05T14:30:00Z',
  },
  {
    id: 'review-3',
    movieId: 'movie-3',
    userId: 'user-1',
    rating: 9,
    text: 'Beautifully shot, deeply moving.',
    createdAt: '2025-02-01T09:00:00Z',
  },
];
