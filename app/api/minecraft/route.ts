import { NextResponse } from 'next/server';
import { status } from 'minecraft-server-util';
import os from "os"

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const netInterface of interfaces[name]!) {
            if (netInterface.family === 'IPv4' && !netInterface.internal) {
                return netInterface.address;
            }
        }
    }
    return 'localhost';
}

export async function GET() {
    const host = '127.0.0.1';
    const port = 25565;

    let online = false;
    let players = { online: 0, max: 0 };
    let version = null;

    try {
        const response = await status(host, port, { timeout: 2000 });

        online = true;
        players = {
            online: response.players.online,
            max: response.players.max,
        };
        version = response.version.name;
    } catch (error) {
        console.error('Failed to connect to local Minecraft server:', error);
    }

    return NextResponse.json({
        online,
        ip: getLocalIP(),
        port,
        players,
        version,
    });
}
