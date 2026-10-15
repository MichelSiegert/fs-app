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

    const journeyResult = await client.departures(originId, { 
        when: new Date(), 
        results: 6,
        duration: 60
      });

    const enrichedJourneys = journeyResult
    .map((journey: any) => {
        return {
          ...journey,
        }}
      )
      .filter((e:any)=>!e.destination.name.includes("HAW"))
      .slice(0,4);

    return NextResponse.json({
      journeys: enrichedJourneys
    });

  } catch (error: any) {
    console.error('HAFAS Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to load' }, { status: 500 });
  }
} 
