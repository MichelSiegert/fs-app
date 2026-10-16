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
    }, [])


    return (
        <div>

            {(data?.success ?? false) && (data?.meals ?? []).length ? data.meals.map((e: any) => {
                return (
                    <div key={e.meal} className="w-full bg-gray-50 my-2 p-2 py-8 border-gray-100 rounded text-xl flex">
                        <div className="text-2xl w-10/12">{e.meal}</div>
                        <div className="w-2/12text-lg">{e.price}</div>
                    </div>
                )
            }) : <div>
                gibt nix
            </div>
            }
        </div>
    )
}