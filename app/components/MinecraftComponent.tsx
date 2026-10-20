'use client';

import { useEffect, useState } from 'react';
import { Users, Wifi, WifiOff } from 'lucide-react';
import { MinecraftData } from '../types/minecraft';

export default function MinecraftComponent() {
    const [status, setStatus] = useState<MinecraftData>({
        online: false,
        ip: 'localhost',
        version: "26.3"
    });
    const [loading, setLoading] = useState(true);

    const serverAddress = 'localhost';

    useEffect(() => {
        const fetchServerStatus = async () => {
            try {
                const res = await fetch('/api/minecraft');
                const data = await res.json();
                setStatus({
                    online: data.online ?? false,
                    ip: data.ip || serverAddress,
                    port: data.port,
                    players: data.players,
                    version: "26.3"
                });
            } catch (err) {
                console.error('Failed to fetch Minecraft status', err);
                setStatus((prev) => ({ ...prev, online: false }));
            } finally {
                setLoading(false);
            }
        };

        fetchServerStatus();
        const interval = setInterval(fetchServerStatus, 15000);
        return () => clearInterval(interval);
    }, [serverAddress]);

    return (
        <div className="w-full max-w-xl space-y-4 justify-center content-center" style={{ height: "stretch" }}>
            <div className="w-full p-8 rounded-2xl border border-zinc-200 bg-white shadow-sm flex flex-col justify-center items-center text-center space-y-8">
                <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight">
                    Minecraft Server
                </h2>

                <div className="w-full flex justify-center">
                    <div
                        className={`p-6 sm:p-8 rounded-2xl flex items-center justify-center transition-all ${status.online
                            ? 'border scale-105 shadow-xs'
                            : 'voter-box  border'
                            }`}
                    >
                        {status.online ? (
                            <Wifi className="w-12 h-12 sm:w-16 sm:h-16" />
                        ) : (
                            <WifiOff className="w-12 h-12 sm:w-16 sm:h-16" />
                        )}
                    </div>
                </div>

                <div className="space-y-2 w-full">
                    <p className="text-2xl sm:text-3xl font-medium text-zinc-800">
                        {loading
                            ? 'Prüfe Server-Status...'
                            : status.online
                                ? 'Server ist Online'
                                : 'Server ist Offline'}
                    </p>

                    {status.online && status.players && (
                        <div className="flex items-center justify-center gap-2 text-zinc-600 text-2xl sm:text-xl font-medium">
                            <Users className="w-5 h-5" />
                            <span>
                                {status.players.online} von {status.players.max} Spielern online
                            </span>
                        </div>
                    )}

                    <p className="text-xl pt-2">
                        IP: {status.ip}{status.port && status.port !== 25565 ? `:${status.port}` : ''}
                    </p>
                </div>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/70 text-zinc-600 space-y-2 text-2xl">
                <div className="flex items-center gap-2.5">
                    <span className="text-zinc-800">
                        <div><span className="font-semibold">Version:</span> Java{status.version}</div>
                        <div>Server ist im IOT-Nat (fürs erste, Ich arbeite dran das ins eduroam zu bringen!) </div>
                    </span>
                </div>
            </div>
        </div>
    );
}
