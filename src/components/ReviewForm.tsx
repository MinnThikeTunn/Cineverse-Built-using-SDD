import { useState } from 'react';
import { useStore } from '../store/useStore';

interface Props {
  movieId: string;
}

export default function ReviewForm({ movieId }: Props) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const addReview = useStore((s) => s.addReview);
  const currentUser = useStore((s) => s.currentUser);

  if (currentUser.role !== 'standard') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating < 1 || rating > 10) {
      setError('Rating must be between 1 and 10');
      return;
    }

    addReview(movieId, rating, text);
    setText('');
    setRating(5);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
      <div className="review-form-row">
        <label>
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>
      <textarea
        className="review-textarea"
        placeholder="Optional review text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
      {error && <p className="review-error">{error}</p>}
      <button type="submit" className="btn-submit">
        Submit Review
      </button>
    </form>
  );
}
