import { useStore } from '../store/useStore';

interface Props {
  movieId: string;
}

export default function WatchlistToggle({ movieId }: Props) {
  const currentUser = useStore((s) => s.currentUser);
  const toggleWatchlist = useStore((s) => s.toggleWatchlist);

  if (currentUser.role !== 'standard') return null;

  const inWatchlist = currentUser.watchlist.includes(movieId);

  return (
    <button
      className={`watchlist-toggle ${inWatchlist ? 'in-watchlist' : ''}`}
      onClick={() => toggleWatchlist(movieId)}
    >
      {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  );
}
