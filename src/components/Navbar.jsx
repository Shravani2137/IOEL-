import { useEffect, useState } from 'react';
import { Bell, Clock3, UserCircle2, Wifi, WifiOff } from 'lucide-react';

function Navbar({ connected = true }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedText = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(time);

  return (
    <header className="topbar">
      <div>
        <p className="topbar-title">Operations command</p>
        <h2 className="topbar-heading">Smart City Dashboard</h2>
      </div>

      <div className="topbar-actions">
        <div className="status-pill">
          <span className={`status-dot ${connected ? 'online' : 'offline'}`} />
          {connected ? 'ONLINE' : 'OFFLINE'}
        </div>

        <div className="utility-pill">
          {connected ? <Wifi className="h-3.5 w-3.5 text-emerald-600" /> : <WifiOff className="h-3.5 w-3.5 text-rose-500" />}
          Firebase: {connected ? 'Connected' : 'Disconnected'}
        </div>

        <div className="utility-pill">
          <Clock3 className="h-3.5 w-3.5 text-amber-600" />
          {formattedText}
        </div>

        <button
          type="button"
          className="utility-pill h-10 w-10 justify-center rounded-full p-0"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>

        <div className="profile-pill">
          <UserCircle2 className="h-5 w-5 text-emerald-600" />
          Admin User
        </div>
      </div>
    </header>
  );
}

export default Navbar;
