/* eslint-disable react-hooks/refs */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, useMemo, useRef } from 'react'
import { COMPONENT_PRIORITIES } from '../constants/componentPriorities';
import { COMPONENT_DURATIONS } from '../constants/componentDuration';
import { DASHBOARD_COMPONENTS } from '../components/registry';



function useNow(refreshMs = 60000) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), refreshMs);
    return () => clearInterval(timer);
  }, [refreshMs]);

  return now;
}

function useCoffeeCups(refreshMs = 60000) {
  const [cups, setCups] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const res = await fetch('https://api.fsie-kiel.de/coffee');
        const data = await res.json();
        setCups(typeof data?.cups === 'number' ? data.cups : undefined);
      } catch {}
    };

    fetchCoffee();
    const timer = setInterval(fetchCoffee, refreshMs);
    return () => clearInterval(timer);
  }, [refreshMs]);

  return cups;
}

function getPriority(id: string, coffeeCups?: number) {
  if (id === 'coffee') return coffeeCups === 0 ? 9000 : -1;
  return COMPONENT_PRIORITIES[id] ?? 0;
}

export function useDashboardRotation(defaultIntervalMs = 30000) {
  const now = useNow();
  const coffeeCups = useCoffeeCups();

  const [step, setStep] = useState(0);
  const [slot, setSlot] = useState(0);
  const lastRolledIds = useRef<Record<string, string>>({});

  const isMounted = now !== null;

  const visibleComponents = useMemo(() => {
    if (!now) return DASHBOARD_COMPONENTS;
    return DASHBOARD_COMPONENTS.filter((item) => item.isVisible?.(now) ?? true);
  }, [now]);

  const priorityItem = useMemo(() => {
    if (!now) return undefined;
    return visibleComponents
      .filter((item) => item.priorityReason?.(now))
      .sort((a, b) => getPriority(b.id, coffeeCups) - getPriority(a.id, coffeeCups))[0];
  }, [visibleComponents, now, coffeeCups]);

  const poolComponents = useMemo(
    () => visibleComponents.filter((item) => item.id !== priorityItem?.id),
    [visibleComponents, priorityItem]
  );

  const entry = poolComponents[step % poolComponents.length] ?? visibleComponents[0];

  const rotatingItem = useMemo(() => {
    if (!entry?.pool) return entry;
    if (!isMounted) return entry.pool.items[0];
    return entry.pool.pick(lastRolledIds.current[entry.id]);
  }, [entry, isMounted]);

  useEffect(() => {
    if (entry?.pool && rotatingItem) {
      lastRolledIds.current[entry.id] = rotatingItem.id;
    }
  }, [entry, rotatingItem]);

  const rotationInterval =
    (rotatingItem && COMPONENT_DURATIONS[rotatingItem.id]) || defaultIntervalMs;

  useEffect(() => {
    if (poolComponents.length === 0) return;

    setSlot((s) => s + 1);
    const timer = setTimeout(() => setStep((s) => s + 1), rotationInterval);
    return () => clearTimeout(timer);
  }, [step, rotatingItem, rotationInterval, poolComponents.length]);

  return {
    priorityItem,
    rotatingItem,
    rotationInterval,
    progressKey: slot,
  };
}