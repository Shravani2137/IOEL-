export const USE_DEMO_DATA = (() => {
  if (typeof window === 'undefined') return true;
  const saved = window.localStorage.getItem('smartCityDemoMode');
  return saved === null ? true : saved === 'true';
})();

export function getDemoMode() {
  if (typeof window === 'undefined') return true;
  const saved = window.localStorage.getItem('smartCityDemoMode');
  if (saved === null) return true;
  return saved === 'true';
}

export function setDemoMode(value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('smartCityDemoMode', String(value));
}

export const MOCK_DATA = {
  parking: {
    areaA: {
      slots: {
        A1: { status: 'available', updatedAt: Date.now() - 60000 },
        A2: { status: 'occupied', updatedAt: Date.now() - 180000 },
        A3: { status: 'available', updatedAt: Date.now() - 240000 },
        A4: { status: 'occupied', updatedAt: Date.now() - 340000 },
        A5: { status: 'available', updatedAt: Date.now() - 50000 },
        A6: { status: 'available', updatedAt: Date.now() - 120000 },
        A7: { status: 'occupied', updatedAt: Date.now() - 220000 },
        A8: { status: 'available', updatedAt: Date.now() - 300000 },
      },
      gate: {
        status: 'closed',
        vehicleDetected: false,
        updatedAt: Date.now() - 90000,
      },
    },
  },
  garbage: {
    bins: {
      bin01: {
        name: 'BIN-01',
        latitude: 19.033,
        longitude: 73.0297,
        distanceCm: 8,
        fillLevel: 85,
        status: 'full',
        personDetected: false,
        lidStatus: 'closed',
        updatedAt: Date.now() - 210000,
      },
      bin02: {
        name: 'BIN-02',
        latitude: 19.035,
        longitude: 73.025,
        distanceCm: 15,
        fillLevel: 60,
        status: 'warning',
        personDetected: true,
        lidStatus: 'open',
        updatedAt: Date.now() - 120000,
      },
      bin03: {
        name: 'BIN-03',
        latitude: 19.0368,
        longitude: 73.0268,
        distanceCm: 22,
        fillLevel: 42,
        status: 'normal',
        personDetected: false,
        lidStatus: 'closed',
        updatedAt: Date.now() - 480000,
      },
    },
  },
  traffic: {
    signals: {
      signal1: { state: 'red', timer: 25, updatedAt: Date.now() - 60000 },
      signal2: { state: 'green', timer: 18, updatedAt: Date.now() - 20000 },
      signal3: { state: 'yellow', timer: 10, updatedAt: Date.now() - 60000 },
      signal4: { state: 'red', timer: 24, updatedAt: Date.now() - 45000 },
    },
    density: { value: 72, status: 'heavy' },
    emergency: { detected: true, rfid: 'EMG-001', priorityMode: true },
  },
  alerts: [
    {
      id: 'alert-bin01',
      binId: 'BIN-01',
      message: 'BIN-01 IS FULL',
      location: 'Main Road',
      fillLevel: 85,
      time: Date.now() - 60000,
    },
  ],
  cityLocations: [
    { id: 'city-hall', name: 'City Hall', latitude: 19.0327, longitude: 73.0282 },
    { id: 'metro-station', name: 'Metro Station', latitude: 19.0348, longitude: 73.0216 },
    { id: 'central-park', name: 'Central Park', latitude: 19.0371, longitude: 73.0339 },
  ],
};
