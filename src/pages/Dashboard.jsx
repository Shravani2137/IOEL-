import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CarFront, MapPinned, ShieldAlert, Trash2, TrafficCone } from 'lucide-react';
import AlertCard from '../components/AlertCard';
import StatusCard from '../components/StatusCard';
import {
  subscribeToFirebaseConnection,
  subscribeToGarbageBins,
  subscribeToParkingGate,
  subscribeToParkingSlots,
  subscribeToTrafficDensity,
  subscribeToTrafficSignals,
} from '../services/firebaseService';
import { getGarbageSummary, getParkingSummary, getTrafficDensityStatus } from '../utils/calculations';

function Dashboard() {
  const [slots, setSlots] = useState([]);
  const [garbage, setGarbage] = useState([]);
  const [signals, setSignals] = useState([]);
  const [density, setDensity] = useState({ value: 0, status: 'normal' });
  const [gate, setGate] = useState({ status: 'closed', vehicleDetected: false, updatedAt: Date.now() });
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const unsubscribeSlots = subscribeToParkingSlots(setSlots);
    const unsubscribeGarbage = subscribeToGarbageBins(setGarbage);
    const unsubscribeSignals = subscribeToTrafficSignals(setSignals);
    const unsubscribeDensity = subscribeToTrafficDensity(setDensity);
    const unsubscribeGate = subscribeToParkingGate(setGate);
    const unsubscribeConnection = subscribeToFirebaseConnection(setConnected);

    return () => {
      unsubscribeSlots();
      unsubscribeGarbage();
      unsubscribeSignals();
      unsubscribeDensity();
      unsubscribeGate();
      unsubscribeConnection();
    };
  }, []);

  const parkingSummary = useMemo(() => getParkingSummary(slots), [slots]);
  const garbageSummary = useMemo(() => getGarbageSummary(garbage), [garbage]);
  const trafficStatus = useMemo(() => getTrafficDensityStatus(density.value), [density.value]);

  const alerts = useMemo(
    () =>
      garbage
        .filter((bin) => (bin?.status ?? 'normal') === 'full')
        .map((bin) => ({
          id: bin.id,
          binId: bin.name,
          message: `${bin.name} IS FULL`,
          location: 'Main Road',
          fillLevel: bin.fillLevel,
          time: bin.updatedAt,
        })),
    [garbage],
  );

  const summaryCards = [
    {
      title: 'Parking Availability',
      value: `${parkingSummary.available}/${parkingSummary.total}`,
      subtitle: 'Available slots',
      icon: CarFront,
      tone: 'emerald',
      trend: `${parkingSummary.occupancy}% occupied`,
    },
    {
      title: 'Occupied Parking Slots',
      value: parkingSummary.occupied,
      subtitle: 'Live occupancy',
      icon: CarFront,
      tone: 'red',
    },
    {
      title: 'Available Parking Slots',
      value: parkingSummary.available,
      subtitle: 'Open spaces',
      icon: ShieldAlert,
      tone: 'cyan',
    },
    {
      title: 'Garbage Bins Normal',
      value: garbageSummary.normal,
      subtitle: 'Operational bins',
      icon: Trash2,
      tone: 'emerald',
    },
    {
      title: 'Garbage Bins Full',
      value: garbageSummary.full,
      subtitle: 'Need attention',
      icon: AlertTriangle,
      tone: 'red',
    },
    {
      title: 'Traffic Status',
      value: trafficStatus.label,
      subtitle: `${density.value}% density`,
      icon: TrafficCone,
      tone: 'amber',
    },
    {
      title: 'Active Alerts',
      value: alerts.length,
      subtitle: 'Priority notifications',
      icon: MapPinned,
      tone: 'red',
    },
  ];

  return (
    <div className="dashboard-layout">
      <div className="dashboard-hero">
        <div className="hero-copy">
          <p className="eyebrow">Product design</p>
          <h1 className="hero-title">Smart City</h1>
          <p className="hero-subtitle">
            Real-time visibility across parking, waste, traffic, and public alerts for a connected urban system.
          </p>

          <div className="hero-actions">
            <button type="button" className="primary-button">Live overview</button>
            <button type="button" className="secondary-button">Monitor</button>
          </div>
        </div>

        <div className="hero-panel">
          <div className="mini-card">
            <span className="mini-card-label">Parking</span>
            <span className="mini-card-value">{parkingSummary.available}</span>
          </div>
          <div className="mini-card">
            <span className="mini-card-label">Traffic</span>
            <span className="mini-card-value">{density.value}%</span>
          </div>
          <div className="mini-card">
            <span className="mini-card-label">Bins</span>
            <span className="mini-card-value">{garbageSummary.full}</span>
          </div>
          <div className="mini-card">
            <span className="mini-card-label">Alerts</span>
            <span className="mini-card-value">{alerts.length}</span>
          </div>
        </div>
      </div>

      <div className="metrics-grid">
        {summaryCards.map((card) => (
          <StatusCard key={card.title} {...card} />
        ))}
      </div>

      <div className="section-panel">
        <div className="section-header">
          <div>
            <p className="section-subtitle">System status</p>
            <h3 className="section-title">Gate Monitoring</h3>
          </div>
          <span className={`alert-pill ${gate.status === 'open' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {gate.status === 'open' ? 'Gate Open' : 'Gate Closed'}
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white/50 p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-stone-500">Vehicle Detected</p>
            <p className="mt-2 text-2xl font-bold text-stone-800">{gate.vehicleDetected ? 'YES' : 'NO'}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white/50 p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-stone-500">Gate Open</p>
            <p className="mt-2 text-sm text-stone-700">{gate.status === 'open' ? new Date(gate.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white/50 p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-stone-500">Gate Closed</p>
            <p className="mt-2 text-sm text-stone-700">{gate.status === 'closed' ? new Date(gate.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</p>
          </div>
        </div>
      </div>

      <div className="section-panel">
        <div className="section-header">
          <div>
            <p className="section-subtitle">Live updates</p>
            <h3 className="section-title">Active Alerts</h3>
          </div>
          <span className="text-sm text-stone-500">{alerts.length} notifications</span>
        </div>

        {alerts.length ? (
          <div className="alert-grid">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        ) : (
          <div className="empty-state">No active alerts.</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
