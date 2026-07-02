import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="empty-state">
      <h2>404 — Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Back to catalog</Link>
    </div>
  );
}
