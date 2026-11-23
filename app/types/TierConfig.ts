import { TierData } from "./Tierdata";

export interface TierConfig {
    id: keyof TierData;
    name: string;
    bgHeader: string;
}