function StatusCard({ title, value, subtitle, icon: Icon, tone = 'emerald', trend = '' }) {
  const toneClasses = {
    emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    red: 'bg-rose-100 text-rose-700 border-rose-200',
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
    cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    slate: 'bg-stone-100 text-stone-700 border-stone-200',
  };

  return (
    <div className="status-card">
      <div className="status-card-top">
        <div>
          <p className="status-card-title">{title}</p>
          <p className="status-card-value">{value}</p>
        </div>
        <div className={`status-icon-box border ${toneClasses[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="status-card-meta">
        <span>{subtitle}</span>
        {trend ? <span className="trend-pill">{trend}</span> : null}
      </div>
    </div>
  );
}

export default StatusCard;
