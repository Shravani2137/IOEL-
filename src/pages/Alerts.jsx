import { useEffect, useMemo, useState } from 'react';
import AlertCard from '../components/AlertCard';
import { subscribeToGarbageBins } from '../services/firebaseService';

function Alerts() {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToGarbageBins((value) => {
      setBins(value);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const alerts = useMemo(
    () =>
      bins
        .filter((bin) => (bin?.status ?? 'normal') === 'full')
        .map((bin) => ({
          id: bin.id,
          binId: bin.name,
          message: `${bin.name} IS FULL`,
          location: 'Main Road',
          fillLevel: bin.fillLevel,
          time: bin.updatedAt,
        })),
    [bins],
  );

  if (loading) {
    return <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-300">Loading alerts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="text-xl font-semibold text-white">Smart City Alerts</h3>
      </div>

      {alerts.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center text-slate-400">
          No active alerts. All systems are within threshold.
        </div>
      )}
    </div>
  );
}

export default Alerts;
