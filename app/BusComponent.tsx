/* eslint-disable @typescript-eslint/no-explicit-any */
import { Anchor, ArrowRight, Bus, Clock, Train } from "lucide-react";
import { useEffect, useState } from "react";

//#85C3DF für Fähren
// Spotify, Chess, Mensa, Minecraft

export function BusComponent() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [, setLastUpdated] = useState<string>('');

    const fetchConnections = async () => {
        try {
            const res = await fetch('/api/connections');
            const result = await res.json();
            setData(result);
            setLastUpdated(
                new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
            );
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
    console.log(data)

    return (
        <div className="space-y-6 w-full mx-auto">
            <div className="space-y-3">
                {loading && !data && (
                    <div className="text-center py-12 text-zinc-400 text-lg">Fahrpläne werden geladen...</div>
                )}

                {data?.journeys?.map((journey: any, idx: number) => {

                    const depPlanned: Date = new Date(journey.when);
                    const delayMinutes: number = journey.delay;
                    const depActual: Date = new Date(depPlanned.getTime()+ delayMinutes * 1000);
                   const arrTime = new Date(); //TODO
                    const arrPlanned = new Date(); //TODO 

                    return (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs space-y-2.5 text-xl">
                            <div className="flex justify-between items-center">
                                <div className="items-center gap-3 w-full">
                                    <div className="flex w-full">
                                        <span className="font-semibold text-black px-2 py-0.5 text-3xl">
                                            {depPlanned.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                        </span>
                                    </div>
                                    <div className=" text-green-600 px-2 py-0.5 rounded bg-gray text-2xl">
                                        <span> 
                                            {depActual.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })} 
                                        </span>
                                    </div>
                                    <div className="w-full text-center mt-2 bg-[#00305D] font-bold text-white rounded-sm text-3xl">
                                        {journey.line.name ?? "some fucking bus I guess?"}
                                    </div>
                                    <div className=" text-2xl mt-1 flex w-full justify-between">
                                        <div>  {journey.stop.name} </div>
                                        <div> {journey.destination.name} </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}