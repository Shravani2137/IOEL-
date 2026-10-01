export const GARBAGE_THRESHOLDS = {
  normal: 60,
  warning: 80,
  full: 81,
};

export function safeNumber(value, fallback = 0) {
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

export function getGarbageStatus(fillLevel) {
  const value = safeNumber(fillLevel, 0);

  if (value >= GARBAGE_THRESHOLDS.full) return 'full';
  if (value >= GARBAGE_THRESHOLDS.normal) return 'warning';
  return 'normal';
}

export function calculateFillPercentage(distanceCm, maxDistance = 30) {
  if (!Number.isFinite(Number(distanceCm)) || Number(distanceCm) < 0) {
    return 0;
  }

  const distance = Math.min(Number(distanceCm), maxDistance);
  const raw = ((maxDistance - distance) / maxDistance) * 100;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function formatTimestamp(value) {
  if (!value) return 'Unknown';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown';

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getParkingSummary(slots = []) {
  const total = slots.length;
  const occupied = slots.filter((slot) => {
    const status = (slot?.status ?? '').toString().toLowerCase();
    return status === 'occupied';
  }).length;
  const available = total - occupied;
  const occupancy = total ? ((occupied / total) * 100).toFixed(1) : '0.0';

  return { total, occupied, available, occupancy: Number(occupancy) };
}

export function getGarbageSummary(bins = []) {
  const total = bins.length;
  const normal = bins.filter((bin) => (bin?.status ?? 'normal') === 'normal').length;
  const warning = bins.filter((bin) => (bin?.status ?? 'normal') === 'warning').length;
  const full = bins.filter((bin) => (bin?.status ?? 'normal') === 'full').length;

  return { total, normal, warning, full };
}

export function getTrafficDensityStatus(value) {
  const numeric = safeNumber(value, 0);

  if (numeric >= 70) return { label: 'HEAVY TRAFFIC', level: 'heavy' };
  if (numeric >= 40) return { label: 'MODERATE TRAFFIC', level: 'moderate' };
  return { label: 'NORMAL TRAFFIC', level: 'normal' };
}

export function getSignalColor(status) {
  const normalized = (status ?? '').toString().toLowerCase();
  if (normalized === 'green') return 'bg-emerald-500';
  if (normalized === 'yellow') return 'bg-amber-400';
  if (normalized === 'red') return 'bg-rose-500';
  return 'bg-slate-500';
}
