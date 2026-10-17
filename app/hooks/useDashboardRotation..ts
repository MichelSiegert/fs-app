'use client';

import { useState, useEffect, useMemo } from 'react';
import { DASHBOARD_COMPONENTS } from '../components/registry';

export function useDashboardRotation(rotationIntervalMs = 45000) {
  const [now, setNow] = useState<Date | null>(null);
  const [rotationIndex, setRotationIndex] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  useEffect(() => {
    if (poolComponents.length === 0) return;

    const interval = setInterval(() => {
      setRotationIndex((prev) => (prev + 1) % poolComponents.length);
    }, rotationIntervalMs);

    return () => clearInterval(interval);
  }, [poolComponents.length, rotationIntervalMs]);

  const safeIndex = poolComponents.length > 0 ? rotationIndex % poolComponents.length : 0;
  const rotatingComponent = poolComponents[safeIndex] || visibleComponents[0];

  return {
    priorityItem: activePriorityItem,
    rotatingItem: rotatingComponent,
  };
}