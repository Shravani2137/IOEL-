import { useState } from 'react';
import { getDemoMode, setDemoMode } from '../data/mockData';

function Settings() {
  const [demoMode, setLocalDemoMode] = useState(getDemoMode());

  const toggleDemoMode = () => {
    const next = !demoMode;
    setLocalDemoMode(next);
    setDemoMode(next);
    window.location.reload();
  };

  return (
    <div className="max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-semibold text-white">System Settings</h3>
      <p className="mt-2 text-sm text-slate-400">Switch the app between Firebase live mode and demo mode for testing and teaching.</p>

      <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-medium text-white">Use Demo Data</p>
            <p className="text-sm text-slate-400">When enabled, the app runs from local mock data and does not connect to Firebase.</p>
          </div>
          <button
            type="button"
            onClick={toggleDemoMode}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${demoMode ? 'bg-emerald-500' : 'bg-slate-600'}`}
            aria-label="Toggle demo data"
          >
            <span className={`inline-block h-5 w-5 rounded-full bg-white transition ${demoMode ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-4 text-sm text-slate-300">
        <p>Current mode: <span className="font-semibold text-white">{demoMode ? 'Demo / Mock Data' : 'Firebase Live Data'}</span></p>
      </div>
    </div>
  );
}

export default Settings;
