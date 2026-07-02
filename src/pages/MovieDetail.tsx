import { useParams, Link } from 'react-router';
import { useStore } from '../store/useStore';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import WatchlistToggle from '../components/WatchlistToggle';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const movies = useStore((s) => s.movies);
  const reviews = useStore((s) => s.reviews);
  const genres = useStore((s) => s.genres);
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="empty-state">
        <h2>Movie not found</h2>
        <Link to="/">Back to catalog</Link>
      </div>
    );
  }

  const movieReviews = reviews.filter((r) => r.movieId === movie.id);
  const avgRating =
    movieReviews.length > 0
      ? (movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length).toFixed(1)
      : null;

  const genre = genres.find((g) => g.id === movie.genreId);

  const formatRuntime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  const formatYear = (dateStr: string | null) =>
    dateStr ? new Date(dateStr).getFullYear().toString() : 'Unknown year';

  return (
    <div className="movie-detail">
      <Link to="/" className="back-link">&larr; Back to catalog</Link>

      <div className="movie-detail-header">
        <h1>{movie.title}</h1>
        {genre && <span className="movie-genre-badge">{genre.name}</span>}
      </div>

      <div className="movie-detail-meta">
        <span>{formatYear(movie.releaseDate)}</span>
        {movie.runtime && <span>{formatRuntime(movie.runtime)}</span>}
        <span className="movie-avg-rating">
          {avgRating ? `★ ${avgRating}/10` : 'Not yet rated'}
        </span>
        <WatchlistToggle movieId={movie.id} />
      </div>

      {movie.description && (
        <p className="movie-description">{movie.description}</p>
      )}

      <section className="movie-reviews-section">
        <h2>Reviews</h2>
        <ReviewList movieId={movie.id} />
        <ReviewForm movieId={movie.id} />
      </section>
    </div>
  );
}
