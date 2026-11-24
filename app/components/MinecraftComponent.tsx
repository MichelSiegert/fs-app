'use client';

import { useEffect, useState } from 'react';
import { Users, Wifi, WifiOff } from 'lucide-react';
import { MinecraftData } from '../types/minecraft';


function getSkinHeadFromUsername(playerName: string){
    var url = "https://mineskin.eu/avatar/"+ playerName + "/128.png";
    return url;
}

function getPlayerDeaths(playerName: string){
    return " "
}

function getPlayerPlayTime(playerName: string){
    return " "
}

function getSkinImageFromUsername(playerName: string){
 if (playerName !== '";'){
    return <img 
        src={getSkinHeadFromUsername(playerName)}
         alt="Spielerskin"
        className="h-15 w-15 object-contain"/>
 }
}

function getPlayerRowEntry(playerName: string) {
    if (!playerName || playerName.trim() === "" || playerName.includes(";")) {
        return;
    }
    else
    return(<tr className = "align-middle bg-[#565656] text-white text-m border-[#7C7C7C] border-4">
            <td>
                {getSkinImageFromUsername(playerName as string)}
            </td>
            <td>
                {playerName}
            </td>
            <td>
                {getPlayerDeaths(playerName)}
            </td>
            <td>
                {getPlayerPlayTime(playerName)}
            </td>
        </tr>)
    }


export default function MinecraftComponent() {
    const [status, setStatus] = useState<MinecraftData>({
        online: false,
        ip: '149.222.157.250',
        port: 25565,
        version: "26.3"
    });
    const [loading, setLoading] = useState(true);

    const serverAddress = 'minecraft.fsie-kiel.de';

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
                console.log("players: ",data.players.playerList);
                console.log("names here are: ", data.players.playerList);
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
 
        <div className="bg-[url(/dirt_bg.png)] bg-repeat w-full space-y-6 content-center justify-items-center">
            <div className={`bg-white max-w-6xl font-mc mx-17 rounded-3xl border-2 p-6 sm:p-8 flex self-center items-center justify-between transition-all ${
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
                        <div className="text-6xl sm:text-6xl font-black">
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

            <div className="text-center bg-white border-2 w-full border-zinc-200 rounded-3xl p-8  mx-17 space-y-6 max-w-6xl">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-zinc-100 pb-6">
                    <span className="text-3xl font-bold text-zinc-600">Server Adresse:</span>
                    <span className="text-3xl sm:text-6xl text-black tracking-tight">
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
                            &quot;Don&apos;t worry, I&apos;ll save your progress, always. Even your mistakes.&quot; 
                            Bennett Foddy
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full mx-17 justify-between max-w-6xl ">
                <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 flex items-center justify-between font-mc  ">
                    <div className='w-full'>
                        <div className="text-5xl font-bold text-gray-900">

                        <div>
                             <span className="text-s text-gray-900 tracking-tight font-mc">
                                Es sind {status.players?.online}/{status.players?.max} Spieler online
                            </span>
                            <div>
                            <table className=" border-black border-2 w-full">
                                <tbody>
                                    {getPlayerRowEntry(status.players?.playerList[0] as string)}
                                    {getPlayerRowEntry(status.players?.playerList[1] as string)}
                                    {getPlayerRowEntry(status.players?.playerList[2] as string)}
                                    {getPlayerRowEntry(status.players?.playerList[3] as string)} 
                                    {getPlayerRowEntry(status.players?.playerList[4] as string)}           
                                </tbody>
                            </table>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}