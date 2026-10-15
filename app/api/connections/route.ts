/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import createClient from 'nahsh-hafas';

const client = createClient('kiel-transport-app');

export async function GET() {
  try {
    const [fromStations, toStations] = await Promise.all([
      client.locations('Kiel Grenzstraße', { results: 1 }),
      client.locations('Kiel Hauptbahnhof', { results: 1 }),
    ]);

    if (!fromStations.length) {
      return NextResponse.json({ error: 'Stations not found' }, { status: 404 });
    }

    const originId = fromStations[0].id;
    const hbfId = toStations[0]?.id;

    const departures = await client.departures(originId, { 
      when: new Date(), 
      results: 10,
      duration: 60
    });

    const enrichedJourneys = await Promise.all(
      departures.map(async (dep: any) => {
        const lineName = 
          dep.line?.name || 
          dep.line?.fahrtNr || 
          (dep.line?.symbol ? `Bus ${dep.line.symbol}` : null) || 
          'Bus';

        let arrivalTime = dep.when;
        let arrivalDelay = dep.delay ?? 0;
        let trip: any = {};

        if (dep.tripId) {
          try {
            trip = await client.trip(dep.tripId, lineName);
            

            const lastStop = trip.stopovers?.[trip.stopovers.length - 1];
            if (lastStop) {
              arrivalTime = lastStop.arrival; 
              arrivalDelay = lastStop.arrivalDelay;
            }
          } catch (tripErr) {
            console.warn(`Trip details failed for ${dep.tripId}:`, tripErr);
          }
        }

        return {
          when: dep.when,
          delay: dep.delay ?? 0,
          arrivalTime,
          arrivalDelay,
          lineName,
          stopName: dep.stop?.name ?? 'Kiel Grenzstraße',
          destinationName: dep.destination?.name ?? 'Unbekanntes Ziel',
        };
      })
    );

    const filteredJourneys = enrichedJourneys
      .filter((e: any) => !e.destinationName.includes("HAW"))
      .slice(0, 4);

    return NextResponse.json({
      journeys: filteredJourneys
    });

  } catch (error: any) {
    console.error('HAFAS Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to load' }, { status: 500 });
  }
}