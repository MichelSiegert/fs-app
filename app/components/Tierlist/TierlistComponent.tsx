'use client';

import React from 'react';

export interface TierItem {
    id: string;
    label: string;
    sublabel?: string;
    image?: string;
}

export type TierData = Record<'S' | 'A' | 'B' | 'C' | 'D' | 'F', TierItem[]>;

interface TierConfig {
    id: keyof TierData;
    name: string;
    bgHeader: string;
}

const TIER_STYLES: TierConfig[] = [
    { id: 'S', name: 'S', bgHeader: 'bg-red-500 text-white' },
    { id: 'A', name: 'A', bgHeader: 'bg-orange-500 text-white' },
    { id: 'B', name: 'B', bgHeader: 'bg-amber-500 text-white' },
    { id: 'C', name: 'C', bgHeader: 'bg-yellow-500 text-black' },
    { id: 'D', name: 'D', bgHeader: 'bg-emerald-500 text-white' },
    { id: 'F', name: 'F', bgHeader: 'bg-blue-500 text-white' },
];

interface StaticTierListProps {
    data: TierData;
    title?: string;
}

export function TierListComponent({ data, title }: StaticTierListProps) {
    return (
        <div className="w-full mx-auto space-y-6 h-full">
            <div className="space-y-2 h-full max-h overflow-hidden border border-zinc-200 shadow-md bg-zinc-900 p-2 sm:p-3">
                {title && (
                    <h2 className="text-center text-3xl sm:text-5xl font-black text-zinc-100 tracking-tight py-2 select-none">
                        {title}
                    </h2>
                )}


                {TIER_STYLES.map((tier) => {
                    const items = data[tier.id] || [];

                    return (
                        <div
                            key={tier.id}
                            className="flex min-h-39 w-full bg-zinc-800/90 rounded-2xl overflow-hidden border border-zinc-700/50"
                        >
                            <div
                                className={`w-32 sm:w-32 flex items-center justify-center font-black text-2xl sm:text-4xl shrink-0 select-none ${tier.bgHeader}`}
                            >
                                {tier.name}
                            </div>

                            <div className="flex-1 p-3 flex flex-wrap gap-3 items-center text-3xl">
                                {items.length > 0 ? (
                                    items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-zinc-700/80 hover:bg-zinc-700 border border-zinc-600/80 px-3 py-2 rounded-xl flex items-center gap-3 transition shadow-sm"
                                        >
                                            {item.image && (
                                                <img
                                                    src={item.image}
                                                    alt={item.label}
                                                    className="w-8 h-8 object-contain rounded-md shrink-0"
                                                />
                                            )}
                                            {!item.image && (
                                            <div className="flex flex-col">
                                                <span className="text-3xl font-semibold text-zinc-100 leading-tight">
                                                    {item.label}
                                                </span>
                                                {item.sublabel && (
                                                    <span className="text-zinc-400 font-medium">
                                                        {item.sublabel}
                                                    </span>
                                                )}
                                            </div>
                                            )}
                                        </div>
                                    ))
                                ) : (null)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}