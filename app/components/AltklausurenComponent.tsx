'use client';

import { FileText, Gift } from 'lucide-react';

export function AltklausurenComponent() {
    return (
        <div className="w-full h-full mx-auto flex flex-col justify-center">
            <div className="w-full h-full rounded-2xl border border-zinc-200 bg-white shadow-md flex flex-col justify-evenly items-center text-center gap-6">

                <div className="p-6 bg-amber-50 rounded-3xl border border-amber-200 text-amber-600">
                    <FileText className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>

                <div>
                    <h2 className="text-4xl sm:text-6xl font-black text-zinc-900 tracking-tight">
                        Wir sammeln Altklausuren!
                    </h2>
                </div>

                <div className="w-full max-w-4xl p-6 sm:p-8 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 flex items-center justify-center gap-4">
                    <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 shrink-0" />
                    <span className="font-bold text-2xl sm:text-4xl">
                        Sichere dir eine gratis 5er-Getränkekarte!
                    </span>
                </div>

                <div className="w-full max-w-4xl text-left p-8 rounded-2xl space-y-4">
                    <p className="text-5xl font-bold tracking-wide text-zinc-600">
                        Was du einreichen kannst:
                    </p>
                    <ul className="text-xl sm:text-4xl text-zinc-700 space-y-3 list-disc list-inside">
                        <li>Gedankenprotokolle von Prüfungen</li>
                        <li>Alte Klausuren & Mitschriften</li>
                        <li>Weitere nützliche Modulleistungen</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}