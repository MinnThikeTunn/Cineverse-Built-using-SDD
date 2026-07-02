import { useStore } from '../store/useStore';

export default function RoleSwitcher() {
  const users = useStore((s) => s.users);
  const currentUser = useStore((s) => s.currentUser);
  const setCurrentUser = useStore((s) => s.setCurrentUser);

  return (
    <div className="role-switcher">
      <label htmlFor="role-select">Viewing as:</label>
      <select
        id="role-select"
        value={currentUser.id}
        onChange={(e) => setCurrentUser(e.target.value)}
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name} ({u.role})
          </option>
        ))}
      </select>
    </div>
  );
}
