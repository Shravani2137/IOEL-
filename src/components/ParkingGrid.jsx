import ParkingSlot from './ParkingSlot';

function ParkingGrid({ slots = [] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {slots.length ? (
        slots.map((slot) => <ParkingSlot key={slot.id} slot={slot} />)
      ) : (
        <div className="col-span-full rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center text-slate-400">
          No parking slots configured.
        </div>
      )}
    </div>
  );
}

export default ParkingGrid;
