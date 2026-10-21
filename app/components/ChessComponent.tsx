/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { Trophy, RefreshCw, AlertCircle } from 'lucide-react';

interface LichessPuzzleData {
    game: {
        id: string;
        perf: { name: string };
        players: Array<{ name: string; color: string }>;
    };
    puzzle: {
        id: string;
        rating: number;
        plays: number;
        solution: string[];
        themes: string[];
        initialPly: number;
    };
}

export function DailyChessPuzzleComponent() {
    const [puzzleData, setPuzzleData] = useState<LichessPuzzleData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://lichess.org/api/puzzle/daily')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch from Lichess');
                return res.json();
            })
            .then((data) => {
                setPuzzleData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    // Lichess static board thumbnail generator
    const boardImageUrl = puzzleData
        ? `https://lichess1.org/training/export/gif/thumbnail/${puzzleData.puzzle.id}.gif`
        : '';

    const playerWhite = puzzleData?.game?.players?.[0]?.name || 'Weiss';
    const playerBlack = puzzleData?.game?.players?.[1]?.name || 'Schwarz';

    return (
        <div className="w-full max-w-3xl space-y-6 justify-center content-center mx-auto" style={{ height: "stretch" }}>
            <div className="w-full p-10 sm:p-12 rounded-3xl border border-zinc-200 bg-white shadow-md flex flex-col justify-center items-center text-center space-y-8">

                {loading && (
                    <div className="w-full p-16 flex flex-col items-center justify-center text-zinc-400 gap-4">
                        <RefreshCw className="w-10 h-10 animate-spin text-amber-600" />
                        <span className="text-2xl font-medium">Lade Puzzle...</span>
                    </div>
                )}

                {error && (
                    <div className="w-full p-6 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-center justify-center gap-4">
                        <AlertCircle className="w-8 h-8 text-red-600 shrink-0" />
                        <span className="text-xl font-medium">Puzzle konnte nicht geladen werden.</span>
                    </div>
                )}

                {!loading && !error && puzzleData && (
                    <>
                        <div className="w-full rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 flex flex-col items-center justify-center gap-2">
                            <span className="font-bold text-xl sm:text-4xl">
                                Rating: {puzzleData.puzzle.rating}
                            </span>
                            {puzzleData.puzzle.themes.length > 0 && (
                                <span className="text-base sm:text-lg font-medium text-amber-700/80 capitalize">
                                    {puzzleData.puzzle.themes.slice(0, 3).join(' • ')}
                                </span>
                            )}
                        </div>

                        <div className="w-full bg-zinc-50 p-6 sm:p-8 rounded-2xl border border-zinc-200/80 flex flex-col items-center justify-center space-y-4">
                            <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-md pointer-events-none select-none w-full max-w-[560px]">
                                <img
                                    src={boardImageUrl}
                                    alt={`Lichess Puzzle ${puzzleData.puzzle.id}`}
                                    className="w-full h-auto object-contain mx-auto rounded-lg"
                                />
                            </div>

                            <p className="text-base sm:text-lg text-zinc-600 font-medium select-none pt-2">
                                {playerWhite} vs. {playerBlack}
                            </p>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
