export interface MinecraftData {
    online: boolean;
    ip: string;
    port?: number;
    version: string;
    players?: {
        online: number;
        max: number;
    };
}
