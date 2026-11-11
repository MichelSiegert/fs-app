'use client';

import { useEffect, useState } from 'react';
import { Users, Wifi, WifiOff, Gamepad2, KeyRound } from 'lucide-react';
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
        <div className="w-full max-w-4xl min-w-4xl   mx-auto space-y-6 content-center animate-spin [animation-duration:3000s]">
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

            <div className="bg-white border-2 w-full border-zinc-200 rounded-3xl p-8 mx-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-zinc-100 pb-6">
                    <span className="text-3xl font-bold text-zinc-600">Server IP</span>
                    <span className="text-5xl sm:text-6xl font-extrabold text-black tracking-tight font-mono">
                        {status.ip}{status.port && status.port !== 25565 ? `:${status.port}` : ''}
                    </span>
                </div>

                <div className="space-y-4 pt-2">
                    <div className="text-2xl text-zinc-600 font-medium leading-relaxed">
                        Server ist im IOT-NAT (fürs erste, ich arbeite dran das ins eduroam zu bringen!).
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-50 border-2 border-gray-200 p-6 rounded-2xl">
                        <div className="flex items-center gap-4 text-zinc-700 text-2xl font-semibold">
                            <KeyRound className="w-9 h-9 text-gray-600 shrink-0" />
                            <span>IOT-NAT Passwort:</span>
                        </div>
                        <span className="text-3xl font-mono font-bold bg-gray-100 text-gray-900 px-6 py-3 rounded-xl border border-gray-300">
                            !FH-NAT-001!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}