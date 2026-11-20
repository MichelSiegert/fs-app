'use client';

import { useEffect, useState } from 'react';
import { Users, Wifi, WifiOff } from 'lucide-react';
import { MinecraftData } from '../types/minecraft';

export default function MinecraftComponent() {
    const [status, setStatus] = useState<MinecraftData>({
        online: false,
        ip: '149.222.157.250',
        port: 25565,
        version: "26.3"
    });
    const [loading, setLoading] = useState(true);

    const serverAddress = '149.222.157.250';

    useEffect(() => {
        const fetchServerStatus = async () => {
            try {
                const res = await fetch('/api/minecraft');
                const data = await res.json();
                setStatus({
                    online: data.online ?? false,
                    ip: data.ip || serverAddress,
                    port: data.port ?? 25565,
                    players: data.players,
                    version: data.version || "26.3"
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
        <div className=" mx-12 w-full space-y-6 content-center animate-spin [animation-duration:6000s]">
            <div className={`mx-5 w-full rounded-3xl border-2 p-6 sm:p-8 flex items-center justify-between transition-all ${
                status.online 
                    ? 'text-green-500 border-green-600' 
                    : 'text-rose-500 border-rose-600'
            }`}>
                <div className="flex items-center gap-6 ">
                    <div className="p-4 bg-white/20 rounded-2xl">
                        {status.online ? (
                            <Wifi className="w-14 h-14" />
                        ) : (
                            <WifiOff className="w-14 h-14" />
                        )}
                    </div>
                    <div>
                        <div className="text-2xl font-semibold opacity-90 uppercase tracking-wider">
                            Minecraft Server
                        </div>
                        <div className="text-6xl sm:text-7xl font-black">
                            {loading 
                                ? 'Prüfe...' 
                                : status.online 
                                    ? 'ONLINE' 
                                    : 'OFFLINE'}
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <span className="text-4xl sm:text-5xl font-extrabold bg-white/20 px-6 py-3 rounded-2xl ">
                        Java {status.version}
                    </span>
                </div>
            </div>

            <div className="w-full mx-5">
                <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 flex items-center justify-between ">
                    <div className='w-full'>
                        <div className="text-2xl font-semibold text-gray-500">Spieler</div>
                        <div className="text-5xl font-bold text-gray-900">
                            {status.online ? (status.players?.online ?? 0) : 0}
                            <span className="text-3xl text-gray-400 font-normal"> / {status.online ? (status.players?.max ?? 0) : 0}</span>
                        </div>
                    </div>
                    <div className="p-5 bg-gray-50 text-gray-600 rounded-2xl">
                        <Users className="w-12 h-12" />
                    </div>
                </div>
            </div>

            <div className="bg-white border-2 w-full border-zinc-200 rounded-3xl p-8 mx-5 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-zinc-100 pb-6">
                    <span className="text-3xl font-bold text-zinc-600">Server IP</span>
                    <span className="text-3xl sm:text-6xl text-black tracking-tight font-mono">
                        minecraft.fsie-kiel.de{status.port && status.port !== 25565 ? `:${status.port}` : ''}
                    </span>
                </div>

                <div className="flex items-start justify-between gap-6 pt-2">
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-2xl font-bold text-zinc-800">
                                Schwierigkeit: Hard
                            </span>
                            <span className="text-zinc-300 text-2xl">•</span>
                            <span className="text-2xl font-bold text-rose-600 font-mono">
                                keepInventory: false
                            </span>
                        </div>
                        <p className="text-3xl text-zinc-600 leading-relaxed">
                            keepInventory ist deaktiviert. Wie Bennett Foddy schon sagte: &quot;Don&apos;t worry, I&apos;ll save your progress, always. Even your mistakes.&quot;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}