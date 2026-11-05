/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React from 'react';
import CoffeeComponent from './CoffeeComponent';
import { MensaComponent } from './MensaComponent';
import { BusComponent } from './BusComponent';
import InfModulTierList from './Tierlist/ChessComponent';

export interface DashboardComponentConfig {
    id: string;
    name: string;
    component: React.ComponentType;
    isScheduled?: (now: Date) => boolean;
    isVisible?: (now: Date) => boolean;
}

let currentCoffeeCups: number | null = null;

export const updateCoffeeCups = (cups: number) => {
    currentCoffeeCups = cups;
};

const isCoffeeScheduled = () => {
    return currentCoffeeCups === 0;
};

const isMensaHours = (now: Date) => {
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins >= 10 * 60 && mins < 12 * 60 + 45;
};

const isMensaVisible = (now: Date) => {
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins < 14 * 60 + 20;
};

export const DASHBOARD_COMPONENTS: DashboardComponentConfig[] = [
    {
        id: 'recreational',
        name: 'Recreational',
        component: CoffeeComponent,
    },
    {
        id: 'coffee',
        name: 'Coffee Status',
        component: CoffeeComponent,
        isScheduled: isCoffeeScheduled,
    },
    {
        id: 'mensa',
        name: 'Mensa Menu',
        component: MensaComponent,
        isScheduled: isMensaHours,
        isVisible: isMensaVisible,
    },
    {
        id: 'bus',
        name: 'Bus Schedule',
        component: BusComponent,
    },
];