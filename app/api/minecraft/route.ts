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
    const host = 'minecraft.fsie-kiel.de';
    const port = 25565;

    let online = false;
    let players = { online: 0, max: 0, playerList: [] as string[] };
    let version = null;



    const javaOptions = {
    timeout: 1000 * 5, // timeout in milliseconds
    enableSRV: true // SRV record lookup
    };



    try {
        const response = await status(host, port, javaOptions);
        console.log(JSON.stringify(response.players.sample?.map((e)=>e.name)))

        online = true;
        players = {
            online: response.players.online,
            max: response.players.max,
            playerList: response.players.sample?.map<string>((e)=>e.name) ?? [],
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
