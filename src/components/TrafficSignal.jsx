function TrafficSignal({ signal }) {
  const colorMap = {
    red: 'bg-rose-500 text-rose-50',
    yellow: 'bg-amber-400 text-slate-900',
    green: 'bg-emerald-500 text-emerald-50',
    unknown: 'bg-slate-600 text-slate-100',
  };

  const state = (signal?.state ?? 'unknown').toLowerCase();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg shadow-slate-950/20">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Signal</p>
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300">{signal?.id ?? 'Signal'}</span>
      </div>

      <div className={`mb-4 inline-flex rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${colorMap[state] || colorMap.unknown}`}>
        {state}
      </div>

      <div className="space-y-1 text-sm text-slate-300">
        <p>Timer: {signal?.timer ?? 0} sec</p>
        <p>Updated: {signal?.updatedAt ? new Date(signal.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</p>
      </div>
    </div>
  );
}

export default TrafficSignal;
