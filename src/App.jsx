import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Alerts from './pages/Alerts';
import Dashboard from './pages/Dashboard';
import Garbage from './pages/Garbage';
import LiveMapPage from './pages/LiveMapPage';
import Parking from './pages/Parking';
import Settings from './pages/Settings';
import Traffic from './pages/Traffic';
import { subscribeToFirebaseConnection } from './services/firebaseService';

function AppLayout() {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToFirebaseConnection(setConnected);
    return () => unsubscribe();
  }, []);

  return (
    <div className="smartcity-app">
      <div className="smartcity-shell">
        <Sidebar />

        <div className="smartcity-main">
          <Navbar connected={connected} />
          <main className="smartcity-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/parking" element={<Parking />} />
              <Route path="/garbage" element={<Garbage />} />
              <Route path="/traffic" element={<Traffic />} />
              <Route path="/map" element={<LiveMapPage />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
