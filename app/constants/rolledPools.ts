import type React from 'react';
import { RECREATIONAL_ITEMS } from './recreationalComponents';
import { UNI_ITEMS } from './UniComponents';

export interface RolledItem {
    id: string;
    component?: React.ComponentType;
}

export interface RolledPool {
    items: readonly RolledItem[];
    pick: (excludeId?: string) => RolledItem;
}

function pickRandom<T extends RolledItem>(items: readonly T[], excludeId?: string): T {
    const candidates = items.filter((item) => item.id !== excludeId);
    const source = candidates.length > 0 ? candidates : items;
    return source[Math.floor(Math.random() * source.length)];
}

function pickWithRareItem<T extends RolledItem>(
    items: readonly T[],
    rareId: string,
    rareChance: number,
    excludeId?: string
): T {
    const rare = items.find((item) => item.id === rareId);
    const common = items.filter((item) => item.id !== rareId);

    if (rare && rare.id !== excludeId && Math.random() < rareChance) return rare;
    return pickRandom(common.length > 0 ? common : items, excludeId);
}

export const ROLLED_POOLS = {
    recreational: {
        items: RECREATIONAL_ITEMS,
        pick: (excludeId) => pickWithRareItem(RECREATIONAL_ITEMS, 'rot', 0.01, excludeId),
    },
    uni: {
        items: UNI_ITEMS,
        pick: (excludeId) => pickRandom(UNI_ITEMS, excludeId),
    },
} satisfies Record<string, RolledPool>;
