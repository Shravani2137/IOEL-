import { MapContainer, TileLayer } from 'react-leaflet';
import GarbageMarker from './GarbageMarker';

function GarbageMap({ bins = [] }) {
  if (!bins.length) {
    return <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center text-slate-400">No garbage bins configured.</div>;
  }

  const center = [
    bins.reduce((sum, bin) => sum + Number(bin.latitude || 0), 0) / bins.length,
    bins.reduce((sum, bin) => sum + Number(bin.longitude || 0), 0) / bins.length,
  ];

  return (
    <div className="h-[420px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <MapContainer center={center} zoom={13} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bins.map((bin) => (
          <GarbageMarker key={bin.id} bin={bin} />
        ))}
      </MapContainer>
    </div>
  );
}

export default GarbageMap;
