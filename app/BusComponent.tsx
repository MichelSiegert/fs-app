/* eslint-disable @typescript-eslint/no-explicit-any */
import { Anchor, ArrowRight, Bus, Clock, Train } from "lucide-react";
import { useEffect, useState } from "react";

//farben
/*
#85C3DF für Fähren

*/
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

    return (
        <div className="space-y-6 w-full mx-auto">
            <div className="space-y-3">
                {loading && !data && (
                    <div className="text-center py-12 text-zinc-400 text-lg">Fahrpläne werden geladen...</div>
                )}

                {data?.journeys?.map((journey: any, idx: number) => {
                    const leg: any = journey.legs[0];

                    const depPlanned: Date = new Date(leg.plannedDeparture);
                    const depActual: Date = new Date(leg.departure || leg.plannedDeparture);
                    const delayMinutes: number = Math.round((depActual.getTime() - depPlanned.getTime()) / 60000);

                    const arrTime = new Date(journey.arrivalAtHbf || leg.arrival || leg.plannedArrival);
                    const arrPlanned = new Date(leg.plannedArrival);

                    return (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs space-y-2.5 text-xl">
                            <div className="flex justify-between items-center">
                                <div className="items-center gap-3 w-full">
                                    <div className="flex w-full">
                                        <span className="font-semibold text-black px-2 py-0.5 text-3xl">
                                            {depPlanned.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                            - 
                                            {arrPlanned.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false   })}
                                        </span>
                                    </div>
                                    <div className=" text-green-600 px-2 py-0.5 rounded bg-gray text-2xl">
                                        <span> 
                                            {depActual.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })} 
                                            -
                                            {arrTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                        </span>
                                    </div>
                                    <div className="w-full text-center mt-2 bg-[#00305D] font-bold text-white rounded-sm text-3xl">
                                        {leg.line?.name ?? "some fucking bus I guess?"}
                                    </div>
                                    <div className=" text-2xl mt-1 flex w-full justify-between">
                                        <div>  Kiel Grenzstraße </div>
                                        <div>  Kiel HBF </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {data?.ferries && data.ferries.length > 0 && (
                <div className="bg-white text-xl p-4 rounded-xl border border-zinc-200 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                        <Anchor className="w-8 h-8 text-zinc-600" />
                        <h2 className="text-xl font-semibold text-zinc-700 uppercase tracking-wider">
                            Fähre ab Dietrichsdorf
                        </h2>
                    </div>
                    <div className="divide-y">
                        {data.ferries.map((f: any, fIdx: number) => (
                            <div key={fIdx} className="py-2 bg-[#85C3DF] rounded p-4 first:pt-0 last:pb-0 flex justify-between items-center text-2xl">
                                <div className="flex items-center text-black  gap-2">
                                    <span className="font-semibold  px-1.5 py-0.5 rounded ">
                                        {f.line}
                                    </span>
                                    <span className="text-zinc-600">→ {f.direction}</span>
                                </div>
                                <span className="font-semibold text-zinc-900">{f.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}