/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { BusComponent } from './BusComponent';
import MscComponent from './MscComponent';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-200">
      <section className="w-full md:w-1/2 p-6 overflow-y-auto">
        <BusComponent />
      </section>

      <section className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center bg-white">
        <MscComponent />
      </section>
    </main>
  );
}
