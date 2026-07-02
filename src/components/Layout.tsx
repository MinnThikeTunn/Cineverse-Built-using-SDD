import { Outlet, Link } from 'react-router';
import { useStore } from '../store/useStore';
import RoleSwitcher from './RoleSwitcher';

export default function Layout() {
  const currentUser = useStore((s) => s.currentUser);

  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">
          CineVerse
        </Link>
        <nav className="nav">
          <Link to="/">Browse</Link>
          {currentUser.role === 'admin' && <Link to="/admin">Admin</Link>}
        </nav>
        <RoleSwitcher />
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
