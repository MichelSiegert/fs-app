/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
    try {
        const meals = await getSchwentineMensaPlan();
        return NextResponse.json({ success: true, meals });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

async function getSchwentineMensaPlan() {
    const url = 'https://www.mensaplan.de/kiel/schwentine-mensa/index.html';

    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);        

    
    const $selected = $('tr td.today .primary.meal').extract(
        {
            meals: ['.description'],
            prices: ['.price']
        });

    const mealArray = $selected.meals.map((meal, index) => ({
    meal: meal,
    price: $selected.prices[index]
}));

    return (mealArray) ;
}