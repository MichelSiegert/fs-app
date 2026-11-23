import { Rankings } from "@/app/data/Rankings";
import { TierListComponent } from "./TierlistComponent";

const ranking = Rankings[Math.floor(Math.random()*Rankings.length)];

export default function RankingComponent() {
    return (
        <main className="w-full">
            <TierListComponent data={ranking.data} title={ranking.title} />
        </main>
    );
}