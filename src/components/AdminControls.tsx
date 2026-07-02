import { useStore } from '../store/useStore';
import type { Movie } from '../types';

interface Props {
  movie: Movie;
  onEdit: (movie: Movie) => void;
}

export default function AdminControls({ movie, onEdit }: Props) {
  const currentUser = useStore((s) => s.currentUser);
  const deleteMovie = useStore((s) => s.deleteMovie);

  if (currentUser.role !== 'admin') return null;

  return (
    <div className="admin-controls">
      <button className="btn-edit" onClick={() => onEdit(movie)}>
        Edit
      </button>
      <button className="btn-delete" onClick={() => deleteMovie(movie.id)}>
        Delete
      </button>
    </div>
  );
}
