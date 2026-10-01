import { useEffect, useMemo, useState } from 'react';
import { CarFront, Gauge, MapPinned, ShieldCheck } from 'lucide-react';
import ParkingGrid from '../components/ParkingGrid';
import StatusCard from '../components/StatusCard';
import { subscribeToParkingGate, subscribeToParkingSlots } from '../services/firebaseService';
import { getParkingSummary } from '../utils/calculations';

function Parking() {
  const [slots, setSlots] = useState([]);
  const [gate, setGate] = useState({ status: 'closed', vehicleDetected: false, updatedAt: Date.now() });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribeSlots = subscribeToParkingSlots((value) => {
      setSlots(value);
      setLoading(false);
    });
    const unsubscribeGate = subscribeToParkingGate(setGate);

    return () => {
      unsubscribeSlots();
      unsubscribeGate();
    };
  }, []);

  const summary = useMemo(() => getParkingSummary(slots), [slots]);

  if (loading) {
    return <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-300">Loading parking data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatusCard title="Total Slots" value={summary.total} subtitle="Parking capacity" icon={CarFront} tone="cyan" />
        <StatusCard title="Available Slots" value={summary.available} subtitle="Open spaces" icon={ShieldCheck} tone="emerald" />
        <StatusCard title="Occupied Slots" value={summary.occupied} subtitle="Cars detected" icon={MapPinned} tone="red" />
        <StatusCard title="Occupancy" value={`${summary.occupancy}%`} subtitle="Usage rate" icon={Gauge} tone="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Parking Area A</h3>
            <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.2em] ${gate.status === 'open' ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-200'}`}>
              {gate.status === 'open' ? 'GATE OPEN' : 'GATE CLOSED'}
            </span>
          </div>

          <ParkingGrid slots={slots} />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-lg font-semibold text-white">Gate Status</h3>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Gate State</p>
              <p className="mt-2 text-xl font-semibold text-white">{gate.status === 'open' ? 'OPEN' : 'CLOSED'}</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Vehicle Detected</p>
              <p className="mt-2 text-xl font-semibold text-white">{gate.vehicleDetected ? 'YES' : 'NO'}</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Last Updated</p>
              <p className="mt-2 text-sm text-slate-200">{new Date(gate.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parking;
