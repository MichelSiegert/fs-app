'use client';

export function OverengineeredComponent() {
    return (
        <div className="relative w-full h-full mx-auto flex flex-col justify-center overflow-hidden bg-gradient-to-br from-fuchsia-950 via-pink-900 to-rose-950 p-6 sm:p-10 selection:bg-pink-500 selection:text-white">
            <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-pink-500/40 blur-[120px] animate-pulse" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/40 blur-[130px] animate-pulse" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[34rem] w-[34rem] rounded-full bg-rose-500/20 blur-[150px]" />

            <div className="relative z-10 w-full h-full rounded-[2.5rem] border-2 border-pink-400/50 bg-gradient-to-b from-white/15 via-pink-500/10 to-fuchsia-950/40 backdrop-blur-2xl shadow-[0_0_80px_-15px_rgba(236,72,153,0.75)] flex flex-col justify-evenly items-center text-center p-6 sm:p-12 overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent opacity-80" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-80" />

                <div className="relative space-y-4 max-w-4xl">
                    <div className="inline-block rounded-full bg-linear-to-r from-pink-500 via-fuchsia-500 to-rose-500 p-[2px] shadow-[0_0_30px_rgba(236,72,153,0.8)]">
                        <div className="rounded-full bg-fuchsia-950/90 px-6 py-1.5 backdrop-blur-md">
                            <span className="bg-linear-to-r from-pink-200 via-white to-pink-200 bg-clip-text text-transparent font-extrabold text-sm sm:text-base tracking-widest uppercase">
                                ★ ★ ★ ★ ★
                            </span>
                        </div>
                    </div>

                    <h2 className="text-4xl sm:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-pink-200 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_6px_24px_rgba(236,72,153,0.9)]">
                        Werde Fachschafts-Helfer:in!
                    </h2>

                    <p className="font-bold text-xl sm:text-3xl text-pink-100 drop-shadow-[0_2px_12px_rgba(244,114,182,0.8)]">
                        Unterstütze uns ganz ohne Verpflichtungen!
                    </p>
                </div>

                <div className="relative w-full max-w-4xl rounded-3xl p-[2px] bg-gradient-to-br from-pink-300 via-fuchsia-500 to-rose-600 shadow-[0_0_60px_-10px_rgba(244,114,182,0.85)]">
                    <div className="w-full h-full rounded-[calc(1.5rem-2px)] bg-gradient-to-br from-fuchsia-950/90 via-pink-950/95 to-rose-950/90 backdrop-blur-xl text-left p-6 sm:p-10 space-y-6">
                        <p className="text-2xl sm:text-4xl font-black tracking-wide bg-gradient-to-r from-pink-300 via-rose-200 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(236,72,153,0.75)]">
                            Was dich erwartet:
                        </p>

                        <ul className="text-lg sm:text-2xl text-pink-50 space-y-4">
                            <li className="group flex items-center gap-4 rounded-2xl border border-pink-400/30 bg-gradient-to-r from-pink-500/20 via-fuchsia-500/15 to-transparent p-4 shadow-[0_0_25px_rgba(236,72,153,0.2)] transition-all duration-300 hover:scale-[1.02] hover:border-pink-300 hover:shadow-[0_0_35px_rgba(236,72,153,0.6)]">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-fuchsia-400 text-white font-black shadow-[0_0_20px_rgba(236,72,153,1)] ring-4 ring-pink-400/30">
                                    ✦
                                </span>
                                <span className="font-semibold tracking-wide drop-shadow">
                                    Hilfe bei Partys, Erstiwoche, LAN-Party &amp; Co.
                                </span>
                            </li>

                            <li className="group flex items-center gap-4 rounded-2xl border border-pink-400/30 bg-gradient-to-r from-pink-500/20 via-fuchsia-500/15 to-transparent p-4 shadow-[0_0_25px_rgba(236,72,153,0.2)] transition-all duration-300 hover:scale-[1.02] hover:border-pink-300 hover:shadow-[0_0_35px_rgba(236,72,153,0.6)]">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-fuchsia-400 text-white font-black shadow-[0_0_20px_rgba(236,72,153,1)] ring-4 ring-pink-400/30">
                                    ✦
                                </span>
                                <span className="font-semibold tracking-wide drop-shadow">
                                    Freigetränke &amp; Verpflegung bei deinen Schichten auf Events
                                </span>
                            </li>

                            <li className="group flex items-center gap-4 rounded-2xl border border-pink-400/30 bg-gradient-to-r from-pink-500/20 via-fuchsia-500/15 to-transparent p-4 shadow-[0_0_25px_rgba(236,72,153,0.2)] transition-all duration-300 hover:scale-[1.02] hover:border-pink-300 hover:shadow-[0_0_35px_rgba(236,72,153,0.6)]">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-fuchsia-400 text-white font-black shadow-[0_0_20px_rgba(236,72,153,1)] ring-4 ring-pink-400/30">
                                    ✦
                                </span>
                                <span className="font-semibold tracking-wide drop-shadow">
                                    Coole Leute aus allen Semestern kennenlernen und mit anpacken!
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}