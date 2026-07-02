import { useStore } from '../store/useStore';

export default function FilterBar() {
  const genres = useStore((s) => s.genres);
  const movies = useStore((s) => s.movies);
  const selectedGenreId = useStore((s) => s.selectedGenreId);
  const selectedYear = useStore((s) => s.selectedYear);
  const setSelectedGenreId = useStore((s) => s.setSelectedGenreId);
  const setSelectedYear = useStore((s) => s.setSelectedYear);

  const years = [...new Set(
    movies
      .map((m) => m.releaseDate ? new Date(m.releaseDate).getFullYear() : null)
      .filter((y): y is number => y !== null)
  )].sort((a, b) => b - a);

  return (
    <div className="filter-bar">
      <select
        value={selectedGenreId ?? ''}
        onChange={(e) => setSelectedGenreId(e.target.value || null)}
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <select
        value={selectedYear ?? ''}
        onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
