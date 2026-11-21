'use client';

import React from 'react';
import CoffeeComponent from './CoffeeComponent';
import { MensaComponent } from './MensaComponent';
import { BusComponent } from './BusComponent';
import { ROLLED_POOLS, RolledPool } from '../constants/rolledPools';

export interface DashboardComponentConfig {
    id: string;
    name: string;
    component?: React.ComponentType;
    pool?: RolledPool;
    priorityReason?: (now: Date) => boolean;
    isVisible?: (now: Date) => boolean;
}

let currentCoffeeCups: number | null = null;

const fetchCoffeeStatus = async () => {
    try {
        const res = await fetch('https://api.fsie-kiel.de/coffee');
        const data = await res.json();
        currentCoffeeCups = typeof data.cups === 'number' ? data.cups : data; 
    } catch (err) {
        console.error('Failed to fetch coffee status in registry', err);
    }
};

if (typeof window !== 'undefined') {
    fetchCoffeeStatus();
    setInterval(fetchCoffeeStatus, 60000); 
}

export const updateCoffeeCups = (cups: number) => {
    currentCoffeeCups = cups;
};

const isNoCoffee = () => {
    return currentCoffeeCups === 0;
};

const isCoffeeVisible = (now: Date) => {
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins < 14 * 60 + 30  || (currentCoffeeCups ?? 0) >  0;
};

const isMensaHours = (now: Date) => {
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins >= 10 * 60 && mins < 12 * 60 + 45;
};

const isMensaVisible = (now: Date) => {
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins < 14 * 60 + 20 && ![0,6].includes(now.getDay(   ));
};

const busSchedule = (now: Date) => true;

export const DASHBOARD_COMPONENTS: DashboardComponentConfig[] = [
    {
        id: 'recreational',
        name: 'Recreational',
        pool: ROLLED_POOLS.recreational,
    },
    {
        id: 'uni',
        name: 'Uni',
        pool: ROLLED_POOLS.uni,
    },
    {
        id: 'coffee',
        name: 'Coffee Status',
        component: CoffeeComponent,
        priorityReason: isNoCoffee,
        isVisible: isCoffeeVisible,
    },
    {
        id: 'mensa',
        name: 'Mensa Menu',
        component: MensaComponent,
        priorityReason: isMensaHours,
        isVisible: isMensaVisible,
    },
    {
        id: 'bus',
        name: 'Bus Schedule',
        component: BusComponent,
        priorityReason: busSchedule,
    }
];
