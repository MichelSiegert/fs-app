/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { Trophy, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

interface ChessPuzzleData {
    Puzzle: number;
    Link: string;
    Image: string;
    Text: string;
    Players: string;
    Site: string;
    ShortHeader: string;
}

export function DailyChessPuzzleComponent() {
    const [puzzle, setPuzzle] = useState<ChessPuzzleData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://chesspuzzle.net/Daily/Api')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((data) => {
                setPuzzle(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    return (
        <div className="w-full max-w-xl space-y-4 justify-center content-center" style={{ height: "stretch" }}>
            <div className="w-full p-8 rounded-2xl border border-zinc-200 bg-white shadow-sm flex flex-col justify-center items-center text-center space-y-6">
                <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
                        Schach-Puzzle des Tages
                    </h2>
                </div>

                {loading && (
                    <div className="w-full p-8 flex items-center justify-center text-zinc-400 gap-2">
                        <RefreshCw className="w-6 h-6 animate-spin text-amber-600" />
                        <span className="text-xl">Lade Puzzle...</span>
                    </div>
                )}

                {error && (
                    <div className="w-full p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center justify-center gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
                        <span className="text-lg font-medium">Puzzle konnte nicht geladen werden.</span>
                    </div>
                )}

                {!loading && !error && puzzle && (
                    <>
                        <div className="w-full p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 flex flex-col items-center justify-center gap-1">
                            <span className="font-bold text-2xl sm:text-3xl">
                                {puzzle.Text}
                            </span>
                            <span className="text-sm font-medium text-amber-700/80">
                                {puzzle.ShortHeader}
                            </span>
                        </div>

                        <div className="w-full bg-zinc-50 p-3 rounded-xl border border-zinc-200/80 flex flex-col items-center justify-center space-y-3">
                            <a
                                href={puzzle.Link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block overflow-hidden rounded-lg border border-zinc-200 shadow-sm transition-transform hover:scale-[1.01]"
                            >

                                <img
                                    src={puzzle.Image}
                                    alt={`Chess Puzzle ${puzzle.Puzzle}`}
                                    className="w-full max-w-[320px] h-auto object-contain mx-auto"
                                />
                            </a>
                            <p className="text-sm text-zinc-500 font-medium">
                                {puzzle.Players}
                            </p>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}