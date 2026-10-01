import { NavLink } from 'react-router-dom';
import {
  AlertTriangle,
  BarChart3,
  Building2,
  CarFront,
  Map,
  Settings,
  Trash2,
  TrafficCone,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: BarChart3 },
  { to: '/parking', label: 'Smart Parking', icon: CarFront },
  { to: '/garbage', label: 'Smart Garbage', icon: Trash2 },
  { to: '/traffic', label: 'Smart Traffic', icon: TrafficCone },
  { to: '/map', label: 'Live Map', icon: Map },
  { to: '/alerts', label: 'Alerts', icon: AlertTriangle },
  { to: '/settings', label: 'Settings', icon: Settings },
];

function Sidebar() {
  return (
    <aside className="sidebar-shell">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <p className="sidebar-label">City IoT</p>
          <h1 className="sidebar-title">Smart City</h1>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon className="nav-item-icon" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
