'use client';

import { AnimatedCard } from "./components/AnimatedCard";
import { useDashboardRotation } from "./hooks/useDashboardRotation.";



export default function Home() {
  const { priorityItem, rotatingItem } = useDashboardRotation(45000);

  const PriorityComp = priorityItem.component;
  const RotatingComp = rotatingItem.component;

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-200 overflow-hidden">
      <section className="w-full md:w-1/2 p-6 flex flex-col  items-center overflow-y-auto">
        <AnimatedCard componentKey={priorityItem.id}>
          <PriorityComp />
        </AnimatedCard>
      </section>

      <section className="w-full md:w-1/2 p-6 flex flex-col items-center bg-white min-h-full">
        <AnimatedCard componentKey={rotatingItem.id}>
          <RotatingComp />
        </AnimatedCard>
      </section>
    </main>
  );
}