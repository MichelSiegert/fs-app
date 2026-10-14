/* eslint-disable @typescript-eslint/no-explicit-any */
import { Anchor, ArrowRight, Bus, Clock, Train } from "lucide-react";
import { useEffect, useState } from "react";

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
        <div className="space-y-6 max-w-xl mx-auto">
            <header className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
                <h1 className="text-lg font-semibold flex items-center gap-2">
                    Kiel Grenzstraße <ArrowRight className="w-4 h-4 text-zinc-400" /> Kiel Hbf
                </h1>
            </header>

            <div className="space-y-3">
                {loading && !data && (
                    <div className="text-center py-12 text-zinc-400 text-sm">Fahrpläne werden geladen...</div>
                )}

                {data?.journeys?.map((journey: any, idx: number) => {
                    const leg = journey.legs[0];

                    const depPlanned = new Date(leg.plannedDeparture);
                    const depActual = new Date(leg.departure || leg.plannedDeparture);
                    const delayMinutes = Math.round((depActual.getTime() - depPlanned.getTime()) / 60000);

                    const arrTime = new Date(journey.arrivalAtHbf || leg.arrival || leg.plannedArrival);

                    return (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs space-y-2.5">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-zinc-100 rounded-md text-zinc-700">
                                        {leg.line?.mode === 'bus' ? <Bus className="w-4 h-4" /> : <Train className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <span className="font-semibold text-zinc-900 text-xs bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                                            {leg.line?.name || 'Linie'}
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-zinc-600">
                                            <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                            <span>
                                                Abf: <strong className="text-zinc-900">{depPlanned.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })}</strong>
                                            </span>
                                            {delayMinutes > 0 ? (
                                                <span className="text-[11px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-medium border border-red-200">
                                                    +{delayMinutes}m
                                                </span>
                                            ) : (
                                                <span className="text-[11px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded font-medium">
                                                    Pünktlich
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className="text-[11px] text-zinc-400 block">Ankunft Hbf</span>
                                    <span className="text-sm font-semibold text-zinc-900">
                                        {arrTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-zinc-50 px-3 py-2 rounded-lg border border-zinc-200/60 text-xs flex justify-between items-center">
                                <span className="text-zinc-500 mr-5">Verbindungen:</span>
                                <span className="font-semibold text-zinc-800 tracking-wide">
                                    {journey.reachableBusesString}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {data?.ferries && data.ferries.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                        <Anchor className="w-4 h-4 text-zinc-600" />
                        <h2 className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                            Fähre ab Dietrichsdorf
                        </h2>
                    </div>
                    <div className="divide-y divide-zinc-100">
                        {data.ferries.map((f: any, fIdx: number) => (
                            <div key={fIdx} className="py-2 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-zinc-900 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
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