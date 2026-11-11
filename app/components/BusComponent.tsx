/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

function getColorByName(name: string) {
    if (name.includes("60")) return "bg-[#E3242B]";
    else if (name.includes("11")) return "bg-[#00305D]";
    else return "bg-[#85C3DF]";
}

function getFontColorByName(name: string){
    if (name.includes("60") || name.includes("11")) return "text-[#FFFFFF]";
    else return "text-[#202020]";
}

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


    return (
        <div className="space-y-6 w-full mx-auto">
            <div className="space-y-3">
                {loading && !data && (
                    <div className="text-center py-12 text-zinc-400 text-lg">Fahrpläne werden geladen...</div>
                )}

                {data?.journeys?.map((journey: any, idx: number) => {
                    const depPlanned = new Date(journey.when);

                    return (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-zinc-200 shadow-xs space-y-3 text-xl">
                            <div className="flex flex-col gap-3 w-full">
                                <div className={`w-full font-bold text-black  rounded-2xl text-6xl flex  pr-5   ${getColorByName(journey.lineName)}`}>
                                    
                                    <div className="content-center w-8/12">
                                        <div className="flex justify-between items-center text-2xl font-semibold ">
                                          <div className="flex items-center gap-2   ">
                                            <span className={`text-6xl pl-3 ${getFontColorByName(journey.lineName)}`}>Ab:</span>
                                            <span className={`${getFontColorByName(journey.lineName)} text-6xl`}>
                                                {depPlanned.toLocaleTimeString('de-DE',     { hour: '2-digit', minute: '2-digit', hour12: false })}
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={` text-center py-4 ${getFontColorByName(journey.lineName)}`}>
                                        {journey.lineName}
                                    </div>

                                </div>

                                <div className="text-2xl flex w-full justify-between items-center text-zinc-800">
                                    <div className="">{journey.stopName}</div>
                                    <div className="text-right">{journey.destinationName}</div>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}