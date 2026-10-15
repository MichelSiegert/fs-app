/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

//#85C3DF für Fähren
// Spotify, Chess, Mensa, Minecraft

export function BusComponent() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchConnections = async () => {
        try {
            const res = await fetch('/api/connections');
            const result = await res.json();
            setData(result);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchConnections();
        const interval = setInterval(() => {
            fetchConnections();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    console.log(data);

    return (
        <div className="space-y-6 w-full mx-auto">
            <div className="space-y-3">
                {loading && !data && (
                    <div className="text-center py-12 text-zinc-400 text-lg">Fahrpläne werden geladen...</div>
                )}

                {data?.journeys?.map((journey: any, idx: number) => {
                    const depPlanned = new Date(journey.when);

                    return (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs space-y-3 text-xl">
                            <div className="flex flex-col gap-3 w-full">

                                <div className="flex justify-between items-center text-2xl font-semibold">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-zinc-400 font-normal">Ab:</span>
                                        <span className="text-black">
                                            {depPlanned.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full text-center bg-[#00305D] font-bold text-white rounded-md text-2xl py-1.5">
                                    {journey.lineName}
                                </div>

                                <div className="text-lg flex w-full justify-between items-center text-zinc-800">
                                    <div className="font-medium">{journey.stopName}</div>

                                    <div className="font-medium text-right">{journey.destinationName}</div>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}