'use client';

import { useEffect, useState } from 'react';
import { Coffee as CoffeeIcon, AlertTriangle } from 'lucide-react';
import { CoffeeData } from '../types/coffee';

export default function CoffeeComponent() {
  const [status, setStatus] = useState<CoffeeData>({
    state: 'no',
    cups: 0,
    temperature: 'cold',
    mtime: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const res = await fetch('https://api.fsie-kiel.de/coffee');
        const data = await res.json();
        setStatus(data);
      } catch (err) {
        console.error('Failed to fetch coffee status', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffee();
    const interval = setInterval(fetchCoffee, 10000);
    return () => clearInterval(interval);
  }, []);

  const totalCupsMax = 10;
  const currentCups = Math.min(Math.max(status.cups, 0), totalCupsMax);
  const isNoCoffee = !loading && currentCups === 0;
  const isOneLeft = !loading && currentCups === 1;

  const formattedTime = status.mtime
    ? new Date(status.mtime).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '';

  return (
    <div className="w-full max-w-xl space-y-4 justify-center content-center" style={{ height: "stretch" }}>
      <div className={`w-full p-8 rounded-2xl border shadow-sm flex flex-col justify-center items-center text-center space-y-8 transition-colors ${
        isNoCoffee 
          ? 'bg-red-50 border-red-300' 
          : isOneLeft 
          ? 'bg-amber-50 border-amber-300' 
          : 'bg-white border-zinc-200'
      }`}>
        <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight">
          Gibt&apos;s Kaffee?
        </h2>

        {isNoCoffee ? (
          <div className="flex flex-col items-center justify-center space-y-4 my-2">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-36 w-36 sm:h-48 sm:w-48 rounded-full bg-red-400 opacity-75 animate-ping" />
              <AlertTriangle className="relative w-36 h-36 sm:w-48 sm:h-48 text-red-600 animate-pulse drop-shadow-md" />
            </div>
            <span className="text-3xl sm:text-4xl font-extrabold text-red-600 tracking-wider uppercase animate-bounce">
              KEIN KAFFEE MEHR!
            </span>
          </div>
        ) : isOneLeft ? (
          <div className="flex flex-col items-center justify-center space-y-4 my-2">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-36 w-36 sm:h-48 sm:w-48 rounded-full  opacity-75" />
              <AlertTriangle className="relative w-36 h-36 sm:w-48 sm:h-48 text-amber-600 drop-shadow-md" />
            </div>
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-700 tracking-wider uppercase ">
              NUR NOCH 1 TASSE ÜBRIG!
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-3 sm:gap-4 w-full justify-items-center">
            {Array.from({ length: totalCupsMax }).map((_, index) => {
              const isAvailable = index < currentCups;
              return (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-xl flex items-center justify-center transition-all ${
                    isAvailable
                      ? 'bg-amber-50 text-amber-700 border border-amber-300 scale-105 shadow-xs'
                      : 'bg-zinc-100 text-zinc-300 border border-zinc-200/60'
                  }`}
                >
                  <CoffeeIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
              );
            })}
          </div>
        )}

        <div className="space-y-1.5">
          <p className={`text-2xl sm:text-3xl font-medium ${
            isNoCoffee 
              ? 'text-red-700 font-bold' 
              : isOneLeft 
              ? 'text-amber-800 font-bold' 
              : 'text-zinc-800'
          }`}>
            {loading
              ? 'Lade Kaffeestatus...'
              : isNoCoffee
              ? '0 von 10 Tassen verfügbar!'
              : isOneLeft
              ? ''
              : `${currentCups} von ${totalCupsMax} Tassen verfügbar`}
          </p>
          {formattedTime && (
            <p className="text-sm sm:text-base font-medium text-zinc-400">
              Zuletzt aktualisiert um {formattedTime} Uhr
            </p>
          )}
        </div>
      </div>

      <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/70 text-zinc-600 space-y-2 text-2xl">
        <div className="flex items-center gap-2.5">
          <span className="text-zinc-800">
            <div><span className="font-semibold text-2xl">Kaffee</span> ist KOSTENLOS.</div>
            <div>
              <span className="font-semibold text-2xl">Softdrinks</span> kosten 1,00 €.
              <div className="text-xl">10er Karten kosten 10€.</div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}