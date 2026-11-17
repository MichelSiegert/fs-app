/* eslint-disable @next/next/no-img-element */
'use client';

export function LampComponent() {
    const votingUrl = 'https://flickr.fsie-kiel.de/';
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(votingUrl)}`;

    return (
        <div className="w-full h-full mx-auto flex flex-col justify-center">
            <div className="w-full h-full rounded-2xl border border-zinc-200 bg-white shadow-md flex flex-col justify-evenly items-center text-center gap-6 p-6">
                <div>
                    <h2 className="text-4xl sm:text-6xl font-black text-zinc-900 tracking-tight">
                        Neue Lampen für die Fachschaft!
                    </h2>
                </div>

                <div className="w-full max-w-4xl p-6 sm:p-8 rounded-2xl flex items-center justify-center gap-4">
                    <span className="font-bold text-2xl sm:text-4xl">
                        Wir brauchen neue Lampen und wollen wissen, welche dir am besten gefallen!
                    </span>
                </div>

                <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between p-8 rounded-2xl gap-8">
                    <div className="text-left space-y-4">
                        <p className="text-3xl sm:text-5xl font-bold tracking-wide text-zinc-600">
                            So machst du mit:
                        </p>
                        <ul className="text-xl sm:text-3xl text-zinc-700 space-y-3 list-disc list-inside">
                            <li>QR-Code mit dem Smartphone scannen</li>
                            <li>Lampen-Vorschläge durchstöbern</li>
                            <li>Nach links ablehnen, nach rechts annehmen</li>
                        </ul>
                        <p className="text-lg sm:text-2xl font-medium text-amber-700 pt-2">
                            {votingUrl}
                        </p>
                    </div>

                    <div className="p-5 bg-white rounded-3xl border-2 border-zinc-200 shadow-sm shrink-0">
                        <img
                            src={qrCodeUrl}
                            alt="QR-Code zur Abstimmung"
                            width={220}
                            height={220}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
