import { useEffect, useMemo, useState } from 'react';
import { CarFront, MapPinned, Trash2 } from 'lucide-react';
import { CircleMarker, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { MOCK_DATA } from '../data/mockData';
import { subscribeToGarbageBins, subscribeToParkingSlots } from '../services/firebaseService';

function LiveMapPage() {
  const [bins, setBins] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const unsubscribeBins = subscribeToGarbageBins(setBins);
    const unsubscribeSlots = subscribeToParkingSlots(setSlots);

    return () => {
      unsubscribeBins();
      unsubscribeSlots();
    };
  }, []);

  const center = useMemo(() => {
    const all = [...bins, ...slots.map((slot) => ({ latitude: 19.038, longitude: 73.029 }))];
    if (!all.length) {
      return [19.035, 73.028];
    }

    const avgLat = all.reduce((sum, item) => sum + Number(item.latitude || 0), 0) / all.length;
    const avgLng = all.reduce((sum, item) => sum + Number(item.longitude || 0), 0) / all.length;
    return [avgLat, avgLng];
  }, [bins, slots]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center gap-2 text-emerald-300"><Trash2 className="h-5 w-5" /> Normal</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center gap-2 text-yellow-300"><MapPinned className="h-5 w-5" /> Warning</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center gap-2 text-rose-300"><CarFront className="h-5 w-5" /> Full</div>
        </div>
      </div>

      <div className="h-[520px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <MapContainer center={center} zoom={13} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {bins.map((bin) => {
            const status = (bin?.status ?? 'normal').toString().toLowerCase();
            const color = status === 'full' ? '#ef4444' : status === 'warning' ? '#facc15' : '#22c55e';
            return (
              <Marker key={bin.id} position={[Number(bin.latitude), Number(bin.longitude)]}>
                <Popup>
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold">{bin.name}</p>
                    <p>Location: Main Road</p>
                    <p>Fill Level: {bin.fillLevel}%</p>
                    <p>Status: {status}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {MOCK_DATA.cityLocations.map((place) => (
            <CircleMarker key={place.id} center={[place.latitude, place.longitude]} radius={8} pathOptions={{ color: '#38bdf8', fillColor: '#38bdf8', fillOpacity: 0.8 }}>
              <Popup>{place.name}</Popup>
            </CircleMarker>
          ))}

          {slots.length ? (
            <CircleMarker center={[19.035, 73.028]} radius={10} pathOptions={{ color: '#a78bfa', fillColor: '#a78bfa', fillOpacity: 0.8 }}>
              <Popup>Parking Area A</Popup>
            </CircleMarker>
          ) : null}
        </MapContainer>
      </div>
    </div>
  );
}

export default LiveMapPage;
