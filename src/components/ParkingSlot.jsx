function ParkingSlot({ slot }) {
  const isAvailable = (slot?.status ?? 'unknown').toLowerCase() === 'available';

  return (
    <div
      className={`rounded-2xl border p-4 text-center shadow ${
        isAvailable
          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
          : 'border-rose-500/30 bg-rose-500/10 text-rose-100'
      }`}
    >
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
        <span>Slot</span>
        <span className={`inline-flex rounded-full px-2 py-1 ${isAvailable ? 'bg-emerald-500/25' : 'bg-rose-500/25'}`}>
          {isAvailable ? 'Open' : 'Busy'}
        </span>
      </div>

      <p className="text-lg font-semibold">{slot?.id ?? 'UNKNOWN'}</p>
      <p className="mt-2 text-sm font-medium uppercase tracking-wide">
        {slot?.status ?? 'Unknown'}
      </p>
      <p className="mt-3 text-[11px] text-slate-300">
        Updated: {slot?.updatedAt ? new Date(slot.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
      </p>
    </div>
  );
}

export default ParkingSlot;
