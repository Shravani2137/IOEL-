import { useEffect, useMemo, useState } from 'react';
import { Gauge, Trash2, BellRing } from 'lucide-react';
import GarbageBinCard from '../components/GarbageBinCard';
import GarbageMap from '../components/GarbageMap';
import StatusCard from '../components/StatusCard';
import { subscribeToGarbageBins } from '../services/firebaseService';
import { getGarbageSummary } from '../utils/calculations';

function Garbage() {
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

  const summary = useMemo(() => getGarbageSummary(bins), [bins]);

  if (loading) {
    return <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-300">Loading garbage data...</div>;
  }

  if (!bins.length) {
    return <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center text-slate-400">No garbage bins configured.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatusCard title="Total Bins" value={summary.total} subtitle="Tracked units" icon={Trash2} tone="cyan" />
        <StatusCard title="Normal" value={summary.normal} subtitle="Healthy bins" icon={Gauge} tone="emerald" />
        <StatusCard title="Warning" value={summary.warning} subtitle="Needs attention" icon={BellRing} tone="amber" />
        <StatusCard title="Full" value={summary.full} subtitle="Urgent action" icon={BellRing} tone="red" />
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Live Garbage Map</h3>
          <span className="text-sm text-slate-400">Updated automatically</span>
        </div>
        <GarbageMap bins={bins} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {bins.map((bin) => (
          <GarbageBinCard key={bin.id} bin={bin} />
        ))}
      </div>
    </div>
  );
}

export default Garbage;
