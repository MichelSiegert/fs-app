/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export function MensaComponent() {
    const [data, setData] = useState<any>();

    useEffect(() => {
        const someFunc = async () => {
            const req = await fetch('/api/mensa');
            const res = await req.json();
            setData(res);
        }
        someFunc();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4">
            {(data?.success ?? false) && (data?.meals ?? []).length ? (
                data.meals.map((e: any) => (
                    <div
                        key={e.meal}
                        className="w-full bg-white my-5 p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition-shadow"
                    >
                        <div className="text-2xl font-medium text-gray-800 w-10/12 pr-4">{e.meal}</div>
                        <div className="text-2xl font-semibold text-emerald-600 w-2/12 text-right">{e.price}</div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 text-gray-500 italic bg-gray-50 rounded-lg my-3 border border-dashed border-gray-200">
                    Gibt heute leider nix!
                </div>
            )}

            <div className="mt-6 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-800 text-3xl font-bold mb-1">
                    <span>Reste-Teller</span>
                </div>
                <p className="text-2xl text-emerald-900 leading-relaxed">
                    Von <span className="font-semibold">14:15 bis 14:30 Uhr</span> gibt es in der Mensa Reste-Teller.
                    Ist relativ cheap und es wird weniger wegeworfen.
                </p>
            </div>
        </div>
    );
}