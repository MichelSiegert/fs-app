'use client';

import { AnimatedCard } from "./components/AnimatedCard";
import { useDashboardRotation } from "./hooks/useDashboardRotation.";

export default function Home() {
  const ROTATION_INTERVAL = 30000;
  const { priorityItem, rotatingItem } = useDashboardRotation(ROTATION_INTERVAL);

  const PriorityComp = priorityItem.component;
  const RotatingComp = rotatingItem.component;

  return (
    <main className="min-h-screen max-h-screen overflow-y-hidden bg-zinc-50 text-zinc-900 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-200 overflow-hidden">
      <section className="w-full md:w-1/2 max-h-full overflow-y-hidden p-6 flex flex-col items-center">
        <AnimatedCard componentKey={priorityItem.id}>
          <PriorityComp />
        </AnimatedCard>
      </section>

      <section className="w-full md:w-1/2 p-6 flex flex-col items-center bg-white min-h-full relative pb-8">
        <AnimatedCard componentKey={rotatingItem.id}>
          <RotatingComp />
        </AnimatedCard>

        <div className="absolute bottom-0 left-0 w-full h-3 bg-[#85C3DF] overflow-hidden">
          <div
            key={rotatingItem.id}
            className="h-full bg-[#00305D]"
            style={{
              animation: `progressAnimation ${ROTATION_INTERVAL}ms linear forwards`
            }}
          />
        </div>
      </section>

      <style jsx>{`
        @keyframes progressAnimation {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}