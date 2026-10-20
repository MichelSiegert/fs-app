'use client';

import { FileText, Gift, Heart } from 'lucide-react';

export function AltklausurenComponent() {
    return (
        <div className="w-full max-w-xl space-y-4 justify-center content-center" style={{ height: "stretch" }}>
            <div className="w-full p-8 rounded-2xl border border-zinc-200 bg-white shadow-sm flex flex-col justify-center items-center text-center space-y-6">

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-600">
                    <FileText className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
                        Wir sammeln Altklausuren!
                    </h2>
                </div>

                <div className="w-full p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xl text-amber-900 flex items-center justify-center gap-3">
                    <Gift className="w-6 h-6 text-amber-600 shrink-0" />
                    <span className="font-semibold text-3xl">
                        Sichere dir eine gratis 5er-Getränkekarte!
                    </span>
                </div>

                <div className="w-full text-left bg-zinc-50 p-4 rounded-xl border border-zinc-200/80 space-y-2">
                    <p className="text-2xl font-semibold tracking-wider text-zinc-500">
                        Was du einreichen kannst:
                    </p>
                    <ul className="text-xl text-zinc-700 space-y-1 list-disc list-inside">
                        <li>Gedankenprotokolle von Prüfungen</li>
                        <li>Alte Klausuren & Mitschriften</li>
                        <li>Weitere nützliche Modulleistungen</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}