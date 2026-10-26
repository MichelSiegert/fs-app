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
    const url = 'https://studentenwerk.sh/de/mensaplandruck?ort=1&mensa=5';

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

    const today = new Date().toISOString().split('T')[0];
    
    const $selected = $(`.tag_headline[data-day="${today}"] .mensa_menu `).extract(
        {
            meals: ['.element_1'],
            prices: ['.element_3']
        });

    const mealArray = $selected.meals.map((meal, index) => ({
    meal: meal,
    price: $selected.prices[index]
    }));

    return (mealArray);
}