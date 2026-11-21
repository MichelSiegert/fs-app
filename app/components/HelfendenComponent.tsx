'use client';

export function FachschaftsHelferComponent() {
    return (
        <div className="w-full h-full mx-auto flex flex-col justify-center items-center bg-pink-50/40 p-8 sm:p-16">
            <div className="w-full max-w-2xl flex flex-col justify-center gap-12 sm:gap-16 text-left">
                <div className="space-y-4 border-b border-pink-200/80 pb-10 sm:pb-12">
                    <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-pink-600 leading-tight">
                        Werde Fachschafts-Helfer:in!
                    </h2>
                    <p className="text-2xl sm:text-4xl text-pink-950/60 font-normal leading-snug">
                        Unterstütze uns ganz ohne Verpflichtungen!
                    </p>
                </div>

                <div className="space-y-6 sm:space-y-8">
                    <p className="text-2xl sm:text-4xl font-medium uppercase tracking-widest text-pink-500">
                        Was dich erwartet:
                    </p>
                    <ul className="space-y-5 sm:space-y-6 text-lg sm:text-3xl text-zinc-700 leading-relaxed">
                        <li className="flex items-baseline gap-4">
                            <span className="text-pink-400">—</span>
                            <span>Hilfe bei Partys, Erstiwoche, LAN-Party &amp; Co.</span>
                        </li>
                        <li className="flex items-baseline gap-4">
                            <span className="text-pink-400">—</span>
                            <span>Freigetränke &amp; Verpflegung bei deinen Schichten auf Events</span>
                        </li>
                        <li className="flex items-baseline gap-4">
                            <span className="text-pink-400">—</span>
                            <span>Coole Leute aus allen Semestern kennenlernen und mit anpacken!</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}