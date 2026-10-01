import { off, onValue, ref } from 'firebase/database';
import { getDemoMode, MOCK_DATA } from '../data/mockData';
import { db, isFirebaseConfigured } from '../firebase/firebaseConfig';

const normalizeParkingSlots = (data = {}) =>
  Object.entries(data).map(([slotId, value]) => ({
    id: slotId,
    status: (value?.status ?? 'unknown').toString().toLowerCase(),
    updatedAt: value?.updatedAt ?? Date.now(),
  }));

const normalizeGarbageBins = (data = {}) =>
  Object.entries(data).map(([binId, value]) => ({
    id: binId,
    name: value?.name ?? binId.toUpperCase(),
    latitude: Number(value?.latitude ?? 0),
    longitude: Number(value?.longitude ?? 0),
    distanceCm: Number(value?.distanceCm ?? 0),
    fillLevel: Number(value?.fillLevel ?? 0),
    status: (value?.status ?? 'normal').toString().toLowerCase(),
    personDetected: Boolean(value?.personDetected),
    lidStatus: (value?.lidStatus ?? 'closed').toString().toLowerCase(),
    updatedAt: value?.updatedAt ?? Date.now(),
  }));

const normalizeTrafficSignals = (data = {}) =>
  Object.entries(data).map(([signalId, value]) => ({
    id: signalId,
    state: (value?.state ?? 'unknown').toString().toLowerCase(),
    timer: Number(value?.timer ?? 0),
    updatedAt: value?.updatedAt ?? Date.now(),
  }));

const getParkingFallback = () => normalizeParkingSlots(MOCK_DATA.parking.areaA.slots);
const getGarbageFallback = () => normalizeGarbageBins(MOCK_DATA.garbage.bins);
const getTrafficFallback = () => normalizeTrafficSignals(MOCK_DATA.traffic.signals);

export function subscribeToParkingSlots(callback) {
  if (!isFirebaseConfigured || getDemoMode()) {
    callback(getParkingFallback());
    return () => {};
  }

  const parkingRef = ref(db, 'smartCity/parking/areaA/slots');
  const unsubscribe = onValue(
    parkingRef,
    (snapshot) => {
      const data = snapshot.val() || {};
      callback(normalizeParkingSlots(data));
    },
    () => callback([]),
  );

  return () => {
    off(parkingRef);
    unsubscribe();
  };
}

export function subscribeToParkingGate(callback) {
  if (!isFirebaseConfigured || getDemoMode()) {
    callback(MOCK_DATA.parking.areaA.gate);
    return () => {};
  }

  const gateRef = ref(db, 'smartCity/parking/areaA/gate');
  const unsubscribe = onValue(
    gateRef,
    (snapshot) => {
      const data = snapshot.val() || {};
      callback({
        status: (data.status ?? 'closed').toString().toLowerCase(),
        vehicleDetected: Boolean(data.vehicleDetected),
        updatedAt: data.updatedAt ?? Date.now(),
      });
    },
    () => callback({ status: 'closed', vehicleDetected: false, updatedAt: Date.now() }),
  );

  return () => {
    off(gateRef);
    unsubscribe();
  };
}

export function subscribeToGarbageBins(callback) {
  if (!isFirebaseConfigured || getDemoMode()) {
    callback(getGarbageFallback());
    return () => {};
  }

  const binsRef = ref(db, 'smartCity/garbage/bins');
  const unsubscribe = onValue(
    binsRef,
    (snapshot) => {
      const data = snapshot.val() || {};
      callback(normalizeGarbageBins(data));
    },
    () => callback([]),
  );

  return () => {
    off(binsRef);
    unsubscribe();
  };
}

export function subscribeToTrafficSignals(callback) {
  if (!isFirebaseConfigured || getDemoMode()) {
    callback(getTrafficFallback());
    return () => {};
  }

  const signalsRef = ref(db, 'smartCity/traffic/signals');
  const unsubscribe = onValue(
    signalsRef,
    (snapshot) => {
      const data = snapshot.val() || {};
      callback(normalizeTrafficSignals(data));
    },
    () => callback([]),
  );

  return () => {
    off(signalsRef);
    unsubscribe();
  };
}

export function subscribeToTrafficDensity(callback) {
  if (!isFirebaseConfigured || getDemoMode()) {
    callback(MOCK_DATA.traffic.density);
    return () => {};
  }

  const densityRef = ref(db, 'smartCity/traffic/density');
  const unsubscribe = onValue(
    densityRef,
    (snapshot) => {
      const data = snapshot.val() || {};
      callback({ value: Number(data?.value ?? 0), status: (data?.status ?? 'normal').toString().toLowerCase() });
    },
    () => callback({ value: 0, status: 'normal' }),
  );

  return () => {
    off(densityRef);
    unsubscribe();
  };
}

export function subscribeToEmergencyStatus(callback) {
  if (!isFirebaseConfigured || getDemoMode()) {
    callback(MOCK_DATA.traffic.emergency);
    return () => {};
  }

  const emergencyRef = ref(db, 'smartCity/traffic/emergency');
  const unsubscribe = onValue(
    emergencyRef,
    (snapshot) => {
      const data = snapshot.val() || {};
      callback({
        detected: Boolean(data.detected),
        rfid: data.rfid ?? '',
        priorityMode: Boolean(data.priorityMode),
      });
    },
    () => callback({ detected: false, rfid: '', priorityMode: false }),
  );

  return () => {
    off(emergencyRef);
    unsubscribe();
  };
}

export function subscribeToFirebaseConnection(callback) {
  if (!isFirebaseConfigured || getDemoMode()) {
    callback(true);
    return () => {};
  }

  const connectionRef = ref(db, '.info/connected');
  const unsubscribe = onValue(
    connectionRef,
    (snapshot) => {
      callback(Boolean(snapshot.val()));
    },
    () => callback(false),
  );

  return () => {
    off(connectionRef);
    unsubscribe();
  };
}
