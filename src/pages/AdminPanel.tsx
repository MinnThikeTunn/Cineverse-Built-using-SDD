import { useState } from 'react';
import { useStore } from '../store/useStore';
import type { Movie } from '../types';

export default function AdminPanel() {
  const currentUser = useStore((s) => s.currentUser);
  const movies = useStore((s) => s.movies);
  const genres = useStore((s) => s.genres);
  const addMovie = useStore((s) => s.addMovie);
  const updateMovie = useStore((s) => s.updateMovie);
  const deleteMovie = useStore((s) => s.deleteMovie);
  const addGenre = useStore((s) => s.addGenre);
  const updateGenre = useStore((s) => s.updateGenre);
  const deleteGenre = useStore((s) => s.deleteGenre);

  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [movieForm, setMovieForm] = useState({
    title: '',
    description: '',
    releaseDate: '',
    runtime: '',
    posterUrl: '',
    genreId: '',
  });

  const [genreName, setGenreName] = useState('');
  const [editingGenreId, setEditingGenreId] = useState<string | null>(null);
  const [editingGenreName, setEditingGenreName] = useState('');

  if (currentUser.role !== 'admin') {
    return (
      <div className="empty-state">
        <h2>Access Denied</h2>
        <p>You must be an Administrator to view this page.</p>
      </div>
    );
  }

  const resetMovieForm = () => {
    setMovieForm({ title: '', description: '', releaseDate: '', runtime: '', posterUrl: '', genreId: '' });
    setEditingMovie(null);
  };

  const handleMovieSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!movieForm.title.trim()) return;

    const movieData = {
      title: movieForm.title.trim(),
      description: movieForm.description.trim() || null,
      releaseDate: movieForm.releaseDate || null,
      runtime: movieForm.runtime ? Number(movieForm.runtime) : null,
      posterUrl: movieForm.posterUrl.trim() || null,
      genreId: movieForm.genreId || null,
    };

    if (editingMovie) {
      updateMovie(editingMovie.id, movieData);
    } else {
      addMovie(movieData);
    }
    resetMovieForm();
  };

  const startEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setMovieForm({
      title: movie.title,
      description: movie.description ?? '',
      releaseDate: movie.releaseDate ?? '',
      runtime: movie.runtime?.toString() ?? '',
      posterUrl: movie.posterUrl ?? '',
      genreId: movie.genreId ?? '',
    });
  };

  const handleGenreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!genreName.trim()) return;
    addGenre(genreName.trim());
    setGenreName('');
  };

  const startEditGenre = (id: string, name: string) => {
    setEditingGenreId(id);
    setEditingGenreName(name);
  };

  const saveGenreEdit = (id: string) => {
    if (editingGenreName.trim()) {
      updateGenre(id, editingGenreName.trim());
    }
    setEditingGenreId(null);
    setEditingGenreName('');
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <section className="admin-section">
        <h2>Movie Management</h2>
        <form className="admin-form" onSubmit={handleMovieSubmit}>
          <input
            type="text"
            placeholder="Title *"
            value={movieForm.title}
            onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={movieForm.description}
            onChange={(e) => setMovieForm({ ...movieForm, description: e.target.value })}
          />
          <input
            type="date"
            value={movieForm.releaseDate}
            onChange={(e) => setMovieForm({ ...movieForm, releaseDate: e.target.value })}
          />
          <input
            type="number"
            placeholder="Runtime (minutes)"
            value={movieForm.runtime}
            onChange={(e) => setMovieForm({ ...movieForm, runtime: e.target.value })}
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={movieForm.posterUrl}
            onChange={(e) => setMovieForm({ ...movieForm, posterUrl: e.target.value })}
          />
          <select
            value={movieForm.genreId}
            onChange={(e) => setMovieForm({ ...movieForm, genreId: e.target.value })}
          >
            <option value="">No Genre</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
          <div className="form-actions">
            <button type="submit">{editingMovie ? 'Update Movie' : 'Add Movie'}</button>
            {editingMovie && <button type="button" onClick={resetMovieForm}>Cancel</button>}
          </div>
        </form>

        <div className="admin-list">
          {movies.map((movie) => (
            <div key={movie.id} className="admin-list-item">
              <span>{movie.title}</span>
              <div>
                <button onClick={() => startEditMovie(movie)}>Edit</button>
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h2>Genre Management</h2>
        <form className="admin-form inline" onSubmit={handleGenreSubmit}>
          <input
            type="text"
            placeholder="Genre name"
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
          />
          <button type="submit">Add Genre</button>
        </form>

        <div className="admin-list">
          {genres.map((genre) => (
            <div key={genre.id} className="admin-list-item">
              {editingGenreId === genre.id ? (
                <>
                  <input
                    type="text"
                    value={editingGenreName}
                    onChange={(e) => setEditingGenreName(e.target.value)}
                  />
                  <button onClick={() => saveGenreEdit(genre.id)}>Save</button>
                  <button onClick={() => setEditingGenreId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{genre.name}</span>
                  <div>
                    <button onClick={() => startEditGenre(genre.id, genre.name)}>Edit</button>
                    <button onClick={() => deleteGenre(genre.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
