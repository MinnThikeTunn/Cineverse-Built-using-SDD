import { useStore } from '../store/useStore';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

export default function Home() {
  const movies = useStore((s) => s.movies);
  const reviews = useStore((s) => s.reviews);
  const searchQuery = useStore((s) => s.searchQuery);
  const selectedGenreId = useStore((s) => s.selectedGenreId);
  const selectedYear = useStore((s) => s.selectedYear);

  const getReviewCount = (movieId: string) =>
    reviews.filter((r) => r.movieId === movieId).length;

  const getYear = (releaseDate: string | null) =>
    releaseDate ? new Date(releaseDate).getFullYear() : null;

  // Trending: sorted by review count desc, then release date desc
  const trending = [...movies]
    .sort((a, b) => {
      const countDiff = getReviewCount(b.id) - getReviewCount(a.id);
      if (countDiff !== 0) return countDiff;
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  // Filtered catalog
  const filtered = movies.filter((movie) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!movie.title.toLowerCase().includes(q)) return false;
    }
    if (selectedGenreId && movie.genreId !== selectedGenreId) return false;
    if (selectedYear) {
      const year = getYear(movie.releaseDate);
      if (year !== selectedYear) return false;
    }
    return true;
  });

  return (
    <div className="home">
      <section className="trending-section">
        <h2>Trending</h2>
        <div className="movie-grid">
          {trending.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="catalog-section">
        <h2>All Movies</h2>
        <div className="controls">
          <SearchBar />
          <FilterBar />
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No movies found. Try broadening your search or filters.</p>
          </div>
        ) : (
          <div className="movie-grid">
            {filtered.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
