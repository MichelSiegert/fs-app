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

    const boardImageUrl = puzzleData
        ? `https://lichess1.org/training/export/gif/thumbnail/${puzzleData.puzzle.id}.gif`
        : '';


    return (
        <div className="w-full text-center space-y-6 justify-center content-center mx-auto" style={{ height: "stretch" }}>

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
                    <div className='justify-center w-full text-6xl font-semibold'>Tägliches Schachpuzzle</div>
                    <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-md pointer-events-none select-none w-full max-w-11/12 justify-self-center">
                        <img
                            src={boardImageUrl}
                            alt={`Lichess Puzzle ${puzzleData.puzzle.id}`}
                            className="w-full h-auto object-contain mx-auto rounded-lg"
                        />
                    </div>
                </>
                )}

        </div>
    );
}
