import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CarFront, Gauge, ShieldCheck } from 'lucide-react';
import StatusCard from '../components/StatusCard';
import TrafficSignal from '../components/TrafficSignal';
import {
  subscribeToEmergencyStatus,
  subscribeToTrafficDensity,
  subscribeToTrafficSignals,
} from '../services/firebaseService';
import { getTrafficDensityStatus } from '../utils/calculations';

function Traffic() {
  const [signals, setSignals] = useState([]);
  const [density, setDensity] = useState({ value: 0, status: 'normal' });
  const [emergency, setEmergency] = useState({ detected: false, rfid: '', priorityMode: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribeSignals = subscribeToTrafficSignals((value) => {
      setSignals(value);
      setLoading(false);
    });
    const unsubscribeDensity = subscribeToTrafficDensity(setDensity);
    const unsubscribeEmergency = subscribeToEmergencyStatus(setEmergency);

    return () => {
      unsubscribeSignals();
      unsubscribeDensity();
      unsubscribeEmergency();
    };
  }, []);

  const status = useMemo(() => getTrafficDensityStatus(density.value), [density.value]);

  if (loading) {
    return <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-300">Loading traffic data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatusCard title="Traffic Density" value={`${density.value}%`} subtitle={status.label} icon={Gauge} tone="amber" />
        <StatusCard title="Signal 1" value={signals[0]?.state ?? 'unknown'} icon={CarFront} tone="red" />
        <StatusCard title="Signal 2" value={signals[1]?.state ?? 'unknown'} icon={CarFront} tone="emerald" />
        <StatusCard title="Priority" value={emergency.priorityMode ? 'ACTIVE' : 'INACTIVE'} subtitle={emergency.detected ? 'Emergency vehicle active' : 'No emergency'} icon={AlertTriangle} tone={emergency.priorityMode ? 'emerald' : 'slate'} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="mb-5 text-xl font-semibold text-white">Traffic Signals</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {signals.map((signal) => (
              <TrafficSignal key={signal.id} signal={signal} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-xl font-semibold text-white">Emergency Priority</h3>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Emergency Vehicle Detected</p>
              <p className="mt-2 text-2xl font-semibold text-white">{emergency.detected ? 'YES' : 'NO'}</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">RFID</p>
              <p className="mt-2 text-lg text-slate-200">{emergency.rfid || 'No RFID'}</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Priority Mode</p>
              <p className="mt-2 flex items-center gap-2 text-lg text-slate-200">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
                {emergency.priorityMode ? 'ACTIVE' : 'INACTIVE'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Traffic;
