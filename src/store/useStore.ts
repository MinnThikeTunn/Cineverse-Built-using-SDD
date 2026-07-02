import { create } from 'zustand';
import type { User, Movie, Review, Genre } from '../types';
import { seedUsers, seedMovies, seedReviews, seedGenres } from '../data/seed';

interface StoreState {
  users: User[];
  movies: Movie[];
  reviews: Review[];
  genres: Genre[];
  currentUser: User;
  searchQuery: string;
  selectedGenreId: string | null;
  selectedYear: number | null;

  setCurrentUser: (userId: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedGenreId: (genreId: string | null) => void;
  setSelectedYear: (year: number | null) => void;

  addReview: (movieId: string, rating: number, text: string) => void;
  deleteReview: (reviewId: string) => void;

  toggleWatchlist: (movieId: string) => void;

  addMovie: (movie: Omit<Movie, 'id'>) => void;
  updateMovie: (id: string, updates: Partial<Movie>) => void;
  deleteMovie: (id: string) => void;

  addGenre: (name: string) => void;
  updateGenre: (id: string, name: string) => void;
  deleteGenre: (id: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  users: seedUsers,
  movies: seedMovies,
  reviews: seedReviews,
  genres: seedGenres,
  currentUser: seedUsers[0],
  searchQuery: '',
  selectedGenreId: null,
  selectedYear: null,

  setCurrentUser: (userId) => {
    const user = get().users.find((u) => u.id === userId);
    if (user) set({ currentUser: user });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedGenreId: (genreId) => set({ selectedGenreId: genreId }),
  setSelectedYear: (year) => set({ selectedYear: year }),

  addReview: (movieId, rating, text) => {
    const { currentUser, reviews } = get();
    const existing = reviews.find(
      (r) => r.movieId === movieId && r.userId === currentUser.id
    );

    if (existing) {
      set({
        reviews: reviews.map((r) =>
          r.id === existing.id
            ? { ...r, rating, text, createdAt: new Date().toISOString() }
            : r
        ),
      });
    } else {
      const newReview: Review = {
        id: `review-${Date.now()}`,
        movieId,
        userId: currentUser.id,
        rating,
        text,
        createdAt: new Date().toISOString(),
      };
      set({ reviews: [...reviews, newReview] });
    }
  },

  deleteReview: (reviewId) => {
    set({ reviews: get().reviews.filter((r) => r.id !== reviewId) });
  },

  toggleWatchlist: (movieId) => {
    const { currentUser, users } = get();
    const inWatchlist = currentUser.watchlist.includes(movieId);
    const updatedWatchlist = inWatchlist
      ? currentUser.watchlist.filter((id) => id !== movieId)
      : [...currentUser.watchlist, movieId];

    const updatedCurrentUser = { ...currentUser, watchlist: updatedWatchlist };
    set({
      currentUser: updatedCurrentUser,
      users: users.map((u) =>
        u.id === currentUser.id ? updatedCurrentUser : u
      ),
    });
  },

  addMovie: (movie) => {
    const newMovie: Movie = { ...movie, id: `movie-${Date.now()}` };
    set({ movies: [...get().movies, newMovie] });
  },

  updateMovie: (id, updates) => {
    set({
      movies: get().movies.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    });
  },

  deleteMovie: (id) => {
    const { movies, reviews, users } = get();
    set({
      movies: movies.filter((m) => m.id !== id),
      reviews: reviews.filter((r) => r.movieId !== id),
      users: users.map((u) => ({
        ...u,
        watchlist: u.watchlist.filter((wid) => wid !== id),
      })),
      currentUser: {
        ...get().currentUser,
        watchlist: get().currentUser.watchlist.filter((wid) => wid !== id),
      },
    });
  },

  addGenre: (name) => {
    const newGenre: Genre = { id: `genre-${Date.now()}`, name };
    set({ genres: [...get().genres, newGenre] });
  },

  updateGenre: (id, name) => {
    set({
      genres: get().genres.map((g) => (g.id === id ? { ...g, name } : g)),
    });
  },

  deleteGenre: (id) => {
    set({
      genres: get().genres.filter((g) => g.id !== id),
      movies: get().movies.map((m) =>
        m.genreId === id ? { ...m, genreId: null } : m
      ),
    });
  },
}));
