import { Link } from 'react-router';
import type { Movie } from '../types';
import { useStore } from '../store/useStore';
import WatchlistToggle from './WatchlistToggle';

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const reviews = useStore((s) => s.reviews);
  const movieReviews = reviews.filter((r) => r.movieId === movie.id);
  const avgRating =
    movieReviews.length > 0
      ? (movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length).toFixed(1)
      : null;

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-card-poster">
          {movie.posterUrl ? (
            <img src={movie.posterUrl} alt={movie.title} />
          ) : (
            <div className="movie-card-placeholder">{movie.title[0]}</div>
          )}
        </div>
        <div className="movie-card-info">
          <h3 className="movie-card-title">{movie.title}</h3>
          <span className="movie-card-rating">
            {avgRating ? `${avgRating}/10` : 'Not yet rated'}
          </span>
        </div>
      </Link>
      <div className="movie-card-actions">
        <WatchlistToggle movieId={movie.id} />
      </div>
    </div>
  );
}
