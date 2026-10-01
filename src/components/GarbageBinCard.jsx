import { Gauge, Trash2 } from 'lucide-react';
import { getGarbageStatus } from '../utils/calculations';

const statusStyles = {
  normal: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-100',
  full: 'border-rose-500/30 bg-rose-500/10 text-rose-100',
};

function GarbageBinCard({ bin }) {
  const fillLevel = Number(bin?.fillLevel ?? 0);
  const status = bin?.status ?? getGarbageStatus(fillLevel);

  return (
    <div className={`rounded-2xl border p-4 ${statusStyles[status] || statusStyles.normal}`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Bin</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{bin?.name ?? 'BIN-XX'}</h3>
        </div>
        <div className="rounded-full bg-slate-950/20 p-2">
          <Trash2 className="h-4 w-4" />
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between text-sm text-slate-200">
        <span>Garbage Level</span>
        <span className="font-semibold">{fillLevel}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800/80">
        <div
          className={`h-full rounded-full ${
            status === 'full' ? 'bg-gradient-to-r from-rose-500 to-red-600' : status === 'warning' ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 'bg-gradient-to-r from-emerald-400 to-emerald-500'
          }`}
          style={{ width: `${Math.max(0, Math.min(100, fillLevel))}%` }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-200">
        <span className="flex items-center gap-2">
          <Gauge className="h-4 w-4" />
          Status
        </span>
        <span className="rounded-full border border-white/10 bg-slate-950/20 px-2 py-1 text-[10px] uppercase tracking-[0.2em]">
          {status}
        </span>
      </div>

      <div className="mt-4 text-xs text-slate-300">
        <p>Person detected: {bin?.personDetected ? 'YES' : 'NO'}</p>
        <p>Lid: {bin?.lidStatus ?? 'closed'}</p>
      </div>
    </div>
  );
}

export default GarbageBinCard;
