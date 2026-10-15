'use client';

import { useEffect, useState } from 'react';
import { Coffee as CoffeeIcon } from 'lucide-react';

interface CoffeeData {
    state: string;
    cups: number;
    temperature: string;
    mtime: string;
}

export default function CoffeeStatus() {
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

    const formattedTime = status.mtime
        ? new Date(status.mtime).toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })
        : '';

    return (
        <div className="w-full max-w-xl h-full min-h-125 p-8 rounded-2xl border border-zinc-200 bg-white shadow-sm flex flex-col justify-center items-center text-center space-y-8">
            <h2 className="text-5xl font-bold text-zinc-900 tracking-tight">Gibt&apos;s Kaffee?</h2>

            <div className="grid grid-cols-5 gap-4 w-full max-w-full justify-items-center">
                {Array.from({ length: totalCupsMax }).map((_, index) => {
                    const isAvailable = index < currentCups;
                    return (
                        <div
                            key={index}
                            className={`p-4 rounded-xl flex items-center justify-center transition-all ${isAvailable
                                ? 'bg-amber-50 text-amber-700 border border-amber-300 scale-105 shadow-xs'
                                : 'bg-zinc-100 text-zinc-300 border border-zinc-200/60'
                                }`}
                        >
                            <CoffeeIcon className="w-12 h-12" />
                        </div>
                    );
                })}
            </div>

            <div className="space-y-2">
                <p className="text-3xl font-medium text-zinc-700">
                    {loading ? 'Lade Kaffeestatus...' : `${currentCups} von ${totalCupsMax} Tassen verfügbar`}
                </p>
                {formattedTime && (
                    <p className="text-xl text-zinc-400">
                        Zuletzt aktualisiert um {formattedTime} Uhr
                    </p>
                )}
            </div>
        </div>
    );
} 