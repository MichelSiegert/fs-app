/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, useMemo } from 'react';
import { DASHBOARD_COMPONENTS } from '../components/registry';
import MinecraftComponent from '../components/MinecraftComponent';
import { DailyChessPuzzleComponent } from '../components/ChessComponent';
import { AltklausurenComponent } from '../components/AltklausurenComponent';
import SubwaySurferComponent from '../components/SubwaySurfer/SubwaySurfer';

const RECREATIONAL_ITEMS = [
  { id: 'chess', name: 'Chess Puzzle', component: DailyChessPuzzleComponent },
  { id: 'minecraft', name: 'Minecraft', component: MinecraftComponent },
  { id: 'klausuren', name: 'Altklausuren', component: AltklausurenComponent },
  { id: 'surfer', name: 'surfer', component: SubwaySurferComponent },
];

const COMPONENT_DURATIONS: Record<string, number> = {
  chess: 60 * 1000,     
  minecraft: 15 * 1000, 
  klausuren: 15 * 1000, 
  coffee: 15 * 1000,    
  mensa: 30 * 1000,     
  bus: 60 * 1000,       
  surfer: 15 * 1000,
};

function getRandomRecreationalItem() {
  const rand = Math.random() * 100;

  if (rand < 50) {
    return RECREATIONAL_ITEMS.find((item) => item.id === 'klausuren')!;
  } else if (rand < 51) {
    return RECREATIONAL_ITEMS.find((item) => item.id === 'surfer')!;
  } else {
    const remaining = RECREATIONAL_ITEMS.filter((item) => item.id === 'chess' || item.id === 'minecraft');
    const index = Math.floor(Math.random() * remaining.length);
    return remaining[index];
  }
}

export function useDashboardRotation(defaultIntervalMs = 30000) {
  const [now, setNow] = useState<Date | null>(null);
  const [rotationIndex, setRotationIndex] = useState(0);
  
  const [currentRecreational, setCurrentRecreational] = useState(RECREATIONAL_ITEMS[0]);
  const [currentInterval, setCurrentInterval] = useState(defaultIntervalMs);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const visibleComponents = useMemo(() => {
    if (!now) return DASHBOARD_COMPONENTS;
    return DASHBOARD_COMPONENTS.filter((item) => (item.isVisible ? item.isVisible(now) : true));
  }, [now]);

  const priorityComponent = useMemo(() => {
    if (!now) return undefined;
    return visibleComponents.find((item) => item.isScheduled?.(now));
  }, [visibleComponents, now]);

  const defaultPriority = visibleComponents.find((c) => c.id === 'bus') || visibleComponents[0];
  const activePriorityItem = priorityComponent || defaultPriority;

  const poolComponents = useMemo(() => {
    return visibleComponents.filter((item) => item.id !== activePriorityItem?.id);
  }, [visibleComponents, activePriorityItem]);

  const safeIndex = poolComponents.length > 0 ? rotationIndex % poolComponents.length : 0;
  const rawRotatingComponent = poolComponents[safeIndex] || visibleComponents[0];

  const rotatingItem = useMemo(() => {
    if (rawRotatingComponent.id === 'recreational') {
      return currentRecreational;
    }
    return rawRotatingComponent;
  }, [rawRotatingComponent, currentRecreational]);

  useEffect(() => {
    if (poolComponents.length === 0) return;

    let timeoutDuration = defaultIntervalMs;

    if (rawRotatingComponent.id === 'recreational') {
      const weightedItem = getRandomRecreationalItem();
      setCurrentRecreational(weightedItem);
      timeoutDuration = COMPONENT_DURATIONS[weightedItem.id] || defaultIntervalMs;
    } else {
      timeoutDuration = COMPONENT_DURATIONS[rawRotatingComponent.id] || defaultIntervalMs;
    }

    setCurrentInterval(timeoutDuration);

    const timer = setTimeout(() => {
      setRotationIndex((prev) => (prev + 1) % poolComponents.length);
    }, timeoutDuration);

    return () => clearTimeout(timer);
  }, [rotationIndex, poolComponents.length, rawRotatingComponent.id, defaultIntervalMs]);

  return {
    priorityItem: activePriorityItem,
    rotatingItem,
    rotationInterval: currentInterval,
  };
}