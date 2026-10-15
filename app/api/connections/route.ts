/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import createClient from 'nahsh-hafas';

const client = createClient('kiel-transport-app');

export async function GET() {
  try {
    const [fromStations, toStations, ferryStations] = await Promise.all([
      client.locations('Kiel Grenzstraße', { results: 1 }),
      client.locations('Kiel Hauptbahnhof', { results: 1 }),
      client.locations('Kiel Dietrichsdorf (Fähre)', { results: 1 }),
    ]);

    if (!fromStations.length || !toStations.length) {
      return NextResponse.json({ error: 'Stations not found' }, { status: 404 });
    }

    const originId = fromStations[0].id;
    const hbfId = toStations[0].id;
    const ferryId = ferryStations.length > 0 ? ferryStations[0].id : null;

    const [journeyResult, ferryDepartures] = await Promise.all([
      client.journeys(originId, hbfId, { 
        departure: new Date(), 
        results: 3, 
        stopovers: false 
      }),
      ferryId
        ? client.departures(ferryId, {
            when: new Date(),
            duration: 120,
            results: 5,
            products: { ferry: true },
          })
        : Promise.resolve([]),
    ]);

    const ferryList = Array.isArray(ferryDepartures)
      ? ferryDepartures
      : ferryDepartures.departures || [];

    const enrichedJourneys = await Promise.all(
      journeyResult.journeys.map(async (journey: any) => {
        const leg = journey.legs[0];
        const arrivalTimestamp = new Date(leg.arrival || leg.plannedArrival);

        try {
          const hbfDeps = await client.departures(hbfId, {
            when: arrivalTimestamp,
            duration: 20,
            results: 30,
            products: { bus: true },
          });

          const depsList = Array.isArray(hbfDeps) ? hbfDeps : hbfDeps.departures || [];

          const lineNames = depsList
            .filter((dep: any) => dep.line?.mode === 'bus' || dep.line?.product === 'bus')
            .map((dep: any) => dep.line?.name?.replace(/^Bus\s*/i, '') || '')
            .filter((name: string) => name !== '')
            .filter((val: string, idx: number, self: string[]) => self.indexOf(val) === idx);

          return {
            ...journey,
            arrivalAtHbf: arrivalTimestamp.toISOString(),
            reachableBusesString: lineNames.length > 0 ? lineNames.join(', ') : 'None',
          };
        } catch {
          return {
            ...journey,
            arrivalAtHbf: arrivalTimestamp.toISOString(),
            reachableBusesString: '—',
          };
        }
      })
    );

    const filteredFerries = ferryList.filter((dep: any) => {
      const mode = dep.line?.mode;
      const product = dep.line?.product;
      const name = dep.line?.name || '';
      return mode === 'ferry' || mode === 'ship' || product === 'ferry' || product === 'ship' || name.toLowerCase().includes('fähr') || name.startsWith('F');
    });

    const formattedFerries = filteredFerries.map((dep: any) => {
      const depTime = new Date(dep.when || dep.plannedWhen);
      return {
        line: dep.line?.name || 'F2',
        direction: dep.direction || 'Kiel',
        time: depTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
    });

    return NextResponse.json({
      journeys: enrichedJourneys,
      ferries: formattedFerries,
    });
  } catch (error: any) {
    console.error('HAFAS Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to load' }, { status: 500 });
  }
} 