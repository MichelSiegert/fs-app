import React from 'react';
import CoffeeComponent from './CoffeeComponent';
import { MensaComponent } from './MensaComponent';
import { BusComponent } from './BusComponent';

export interface DashboardComponentConfig {
    id: string;
    name: string;
    component: React.ComponentType;
    isScheduled?: (now: Date) => boolean;
    isVisible?: (now: Date) => boolean;
}

const isMensaHours = (now: Date) => {
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins >= 10 * 60 && mins < 12 * 60 + 15;
};

const isMensaVisible = (now: Date) => {
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins < 14 * 60 + 20;
};

export const DASHBOARD_COMPONENTS: DashboardComponentConfig[] = [
    {
        id: 'recreational',
        name: 'Recreational',
        component: CoffeeComponent, // could be any I know this is horrible code but it works.
    },
    {
        id: 'coffee',
        name: 'Coffee Status',
        component: CoffeeComponent,
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