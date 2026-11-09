/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, useMemo, useRef } from 'react'
import { RECREATIONAL_ITEMS } from '../constants/recreationalComponents';
import { COMPONENT_PRIORITIES } from '../constants/componentPriorities';
import { COMPONENT_DURATIONS } from '../constants/componentDuration';
import { DASHBOARD_COMPONENTS } from '../components/registry';

function pickWeighted() {
  const rand = Math.random() * 100;

  if (rand < 30) {
    return RECREATIONAL_ITEMS.find((item) => item.id === 'klausuren')!;
  } else if (rand < 50) {
    return RECREATIONAL_ITEMS.find((item) => item.id === 'modtierlist')!;
  } else if (rand < 51) {
    return RECREATIONAL_ITEMS.find((item) => item.id === 'surfer')!;
  } else {
    const remaining = RECREATIONAL_ITEMS.filter((item) => item.id === 'chess' || item.id === 'minecraft');
    const index = Math.floor(Math.random() * remaining.length);
    return remaining[index];
  }
}

function getRandomRecreationalItem(excludeId?: string) {
  if (!excludeId || RECREATIONAL_ITEMS.length < 2) return pickWeighted();

  for (let i = 0; i < 20; i++) {
    const item = pickWeighted();
    if (item.id !== excludeId) return item;
  }
  return RECREATIONAL_ITEMS.find((item) => item.id !== excludeId)!;
}

export function useDashboardRotation(defaultIntervalMs = 30000) {
  const [now, setNow] = useState<Date | null>(null);
  const [rotationIndex, setRotationIndex] = useState(0);
  const [recreationalIndex, setRecreationalIndex] = useState(0);
  const [coffeeStatus, setCoffeeStatus] = useState<{ cups?: number } | null>(null);

  const [currentRecreational, setCurrentRecreational] = useState(RECREATIONAL_ITEMS[0]);
  const [currentInterval, setCurrentInterval] = useState(defaultIntervalMs);

  const [tick, setTick] = useState(0);
  const [slot, setSlot] = useState(0);

  const lastRecreationalId = useRef<string | undefined>(undefined);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const res = await fetch('https://api.fsie-kiel.de/coffee');
        const data = await res.json();
        setCoffeeStatus(data);
      } catch {}
    };

    fetchCoffee();
    const timer = setInterval(fetchCoffee, 60000);
    return () => clearInterval(timer);
  }, []);

  const visibleComponents = useMemo(() => {
    if (!now) return DASHBOARD_COMPONENTS;
    return DASHBOARD_COMPONENTS.filter((item) => (item.isVisible ? item.isVisible(now) : true));
  }, [now]);

  const activePriorityItem = useMemo(() => {
    if (!now) return visibleComponents[0];

    const getPriority = (id: string) => {
      if (id === 'coffee') {
        return coffeeStatus?.cups === 0 ? 9000 : -1;
      }
      return COMPONENT_PRIORITIES[id] ?? 0;
    };

    const eligiblePriorityItems = visibleComponents.filter((item) => {
      return Boolean(item.priorityReason?.(now));
    });

    return eligiblePriorityItems.sort(
      (a, b) => getPriority(b.id) - getPriority(a.id)
    )[0];
  }, [visibleComponents, now, coffeeStatus]);

  const poolComponents = useMemo(() => {
    return visibleComponents.filter((item) => item.id !== activePriorityItem?.id);
  }, [visibleComponents, activePriorityItem]);

  const cycleRecreational = visibleComponents.length === 1;

  const safeIndex = poolComponents.length > 0 ? rotationIndex % poolComponents.length : 0;
  const rawRotatingComponent = poolComponents[safeIndex] || visibleComponents[0];

  const rotatingItem = useMemo(() => {
    if (rawRotatingComponent?.id === 'recreational') {
      return cycleRecreational
        ? RECREATIONAL_ITEMS[recreationalIndex % RECREATIONAL_ITEMS.length]
        : currentRecreational;
    }
    return rawRotatingComponent;
  }, [rawRotatingComponent, currentRecreational, cycleRecreational, recreationalIndex]);

  useEffect(() => {
    if (poolComponents.length === 0) return;

    const isRecreational = rawRotatingComponent?.id === 'recreational';
    const onlyRecreational = poolComponents.length === 1 && isRecreational;
    let timeoutDuration = defaultIntervalMs;

    if (isRecreational) {
      let item;
      if (cycleRecreational) {
        item = RECREATIONAL_ITEMS[recreationalIndex % RECREATIONAL_ITEMS.length];
      } else {
        item = getRandomRecreationalItem(
          onlyRecreational ? lastRecreationalId.current : undefined
        );
        setCurrentRecreational(item);
      }
      lastRecreationalId.current = item.id;
      timeoutDuration = COMPONENT_DURATIONS[item.id] || defaultIntervalMs;
    } else if (rawRotatingComponent) {
      timeoutDuration = COMPONENT_DURATIONS[rawRotatingComponent.id] || defaultIntervalMs;
    }

    setCurrentInterval(timeoutDuration);
    setSlot((s) => s + 1);

    const timer = setTimeout(() => {
      setTick((t) => t + 1);
      setRotationIndex((prev) => (prev + 1) % poolComponents.length);
      if (isRecreational && cycleRecreational) {
        setRecreationalIndex((prev) => prev + 1);
      }
    }, timeoutDuration);

    return () => clearTimeout(timer);
  }, [
    tick,
    rotationIndex,
    recreationalIndex,
    poolComponents.length,
    rawRotatingComponent,
    cycleRecreational,
    defaultIntervalMs,
  ]);

  return {
    priorityItem: activePriorityItem,
    rotatingItem,
    rotationInterval: currentInterval,
    progressKey: slot,
  };
}