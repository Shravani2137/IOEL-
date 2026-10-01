import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { formatTimestamp } from '../utils/calculations';

const getMarkerColor = (status) => {
  if (status === 'full') return '#ef4444';
  if (status === 'warning') return '#facc15';
  return '#22c55e';
};

const createMarkerIcon = (status) =>
  new L.DivIcon({
    className: 'custom-pin',
    html: `
      <div style="background:${getMarkerColor(status)}; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 2px rgba(15,23,42,0.3);"></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  });

function GarbageMarker({ bin }) {
  const status = (bin?.status ?? 'normal').toString().toLowerCase();
  const safeLatitude = Number(bin?.latitude ?? 0);
  const safeLongitude = Number(bin?.longitude ?? 0);

  if (!Number.isFinite(safeLatitude) || !Number.isFinite(safeLongitude)) {
    return null;
  }

  return (
    <Marker position={[safeLatitude, safeLongitude]} icon={createMarkerIcon(status)}>
      <Popup>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">{bin?.name ?? 'BIN-XX'}</p>
          <p>Location: {bin?.location ?? 'Main Road'}</p>
          <p>Fill Level: {bin?.fillLevel ?? 0}%</p>
          <p>Status: {status}</p>
          <p>Last Updated: {formatTimestamp(bin?.updatedAt)}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export default GarbageMarker;
