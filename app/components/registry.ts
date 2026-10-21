import React from 'react';
import CoffeeComponent from './CoffeeComponent';
import { MensaComponent } from './MensaComponent';
import { BusComponent } from './BusComponent';
import MinecraftComponent from './MinecraftComponent';
import { AltklausurenComponent } from './AltklausurenComponent';
import { DailyChessPuzzleComponent } from './ChessComponent';

export interface DashboardComponentConfig {
    id: string;
    name: string;
    component: React.ComponentType;
    isScheduled?: (now: Date) => boolean;
    isVisible?: (now: Date) => boolean;
}

const isMensaHours = (now: Date) => {
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins >= 10 * 60 && mins < 14 * 60;
};

const isMensaVisible = (now: Date) => {
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins < 14 * 60 + 30;
};

export const DASHBOARD_COMPONENTS: DashboardComponentConfig[] = [
    
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
    {
        id: 'minecraft',
        name: 'Minecraft Status',
        component: MinecraftComponent,
    },
    {
        id: 'klausuren',
        name: 'Klausuren status',
        component: AltklausurenComponent,
    },
    {
        id: 'chess',
        name: 'Chess Component',
        component: DailyChessPuzzleComponent,
    }
];