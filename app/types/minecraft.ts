export interface MinecraftData {
    online: boolean;
    ip: string;
    port?: number;
    players?: {
        online: number;
        max: number;
    };
}
