import { AlertTriangle, MapPin, Clock3 } from 'lucide-react';
import { formatTimestamp } from '../utils/calculations';

function AlertCard({ alert }) {
  return (
    <div className="alert-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-rose-500" />
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-rose-700">Active Alert</span>
        </div>
        <span className="alert-pill">{alert?.binId ?? 'BIN'}</span>
      </div>

      <h3>{alert?.message ?? 'Bin is full'}</h3>

      <div className="alert-info">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-rose-500" />
          <span>{alert?.location ?? 'Location unavailable'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-rose-700">Fill level:</span>
          <span>{alert?.fillLevel ?? 0}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-rose-500" />
          <span>{formatTimestamp(alert?.time)}</span>
        </div>
      </div>
    </div>
  );
}

export default AlertCard;
