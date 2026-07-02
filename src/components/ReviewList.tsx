import { useStore } from '../store/useStore';

interface Props {
  movieId: string;
}

export default function ReviewList({ movieId }: Props) {
  const reviews = useStore((s) => s.reviews);
  const users = useStore((s) => s.users);
  const currentUser = useStore((s) => s.currentUser);
  const deleteReview = useStore((s) => s.deleteReview);

  const movieReviews = reviews
    .filter((r) => r.movieId === movieId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getUserName = (userId: string) =>
    users.find((u) => u.id === userId)?.name ?? 'Unknown';

  if (movieReviews.length === 0) {
    return (
      <div className="review-list-empty">
        <p>No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="review-list">
      {movieReviews.map((review) => (
        <div key={review.id} className="review-item">
          <div className="review-header">
            <span className="review-author">{getUserName(review.userId)}</span>
            <span className="review-rating">{review.rating}/10</span>
            {currentUser.role === 'admin' && (
              <button
                className="review-delete"
                onClick={() => deleteReview(review.id)}
              >
                Delete
              </button>
            )}
          </div>
          {review.text && <p className="review-text">{review.text}</p>}
          <time className="review-date">
            {new Date(review.createdAt).toLocaleDateString()}
          </time>
        </div>
      ))}
    </div>
  );
}
