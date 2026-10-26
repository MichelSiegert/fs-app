/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export function MensaComponent() {
    const [data, setData] = useState<any>();

    useEffect(() => {
        const someFunc = async () => {
            const req = await fetch('/api/mensa');
            const res = await req.json();

            if (res?.success && Array.isArray(res.meals)) {
                res.meals = res.meals
                    .filter((e: any) => {
                        const name = e.meal.toLowerCase().trim();

                        const hasHalbe = name.includes("halbe");
                        const hasNurSo = name.includes("nur so");
                        const startsWithUnd = name.startsWith("und");

                        return !hasHalbe && !hasNurSo && !startsWithUnd;
                    })
                    .sort((a: any, b: any) => {
                        return getLeftmostNumericPrice(b.price) - getLeftmostNumericPrice(a.price);
                    });
            }

            setData(res);
        }
        someFunc();
    }, []);

    const getLeftmostNumericPrice = (priceStr: string) => {
        if (!priceStr) return 0;
        const leftmost = priceStr.split('/')[0];
        const cleaned = leftmost.replace('€', '').trim().replace(',', '.');
        return parseFloat(cleaned) || 0;
    };

    const getLeftmostDisplayPrice = (priceStr: string) => {
        if (!priceStr) return '';
        return priceStr.split('/')[0].trim();
    };

    return (
        <div className="max-w-full mx-auto">
            {(data?.success ?? false) && (data?.meals ?? []).length ? (
                data.meals.map((e: any) => (
                    <div
                        key={e.meal}
                        className="w-full bg-white my-5 p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition-shadow"
                    >
                        <div className="text-3xl font-medium text-gray-800 w-10/12 pr-4">{e.meal}</div>
                        <div className="text-3xl font-semibold text-emerald-600 w-2/12 text-right">
                            {getLeftmostDisplayPrice(e.price)}
                        </div>
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