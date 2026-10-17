import { NextResponse } from 'next/server';
import os from 'os';
import net from 'net';

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

async function checkPort(ip: string, port: number): Promise<boolean> {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(2000);

        socket.on('connect', () => {
            socket.destroy();
            resolve(true);
        });

        socket.on('timeout', () => {
            socket.destroy();
            resolve(false);
        });

        socket.on('error', () => {
            socket.destroy();
            resolve(false);
        });

        socket.connect(port, ip);
    });
}

export async function GET() {
    const localIP = getLocalIP();
    const port = 25565; 
    const online = await checkPort(localIP, port);

    return NextResponse.json({
        online,
        ip: localIP,
        port,
    });
}