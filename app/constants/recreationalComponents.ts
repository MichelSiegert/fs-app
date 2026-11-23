import { DailyChessPuzzleComponent } from "../components/ChessComponent";
import { GapminderQuizComponent } from "../components/GapMinderQuizComponent";
import MinecraftComponent from "../components/MinecraftComponent";
import BrainrotComponent from "../components/BrainRotComponent/BrainrotComponent";
import RankingComponent from "../components/Tierlist/RankingComponent";

export const RECREATIONAL_ITEMS = [
  { id: 'chess', name: 'Chess Puzzle', component: DailyChessPuzzleComponent },
  { id: 'minecraft', name: 'Minecraft', component: MinecraftComponent },
  { id: 'rot', name: 'Brainrot', component: BrainrotComponent },
  { id: 'modtierlist', name: 'rankings', component: RankingComponent},
  { id: 'questions', name: 'questionaire', component: GapminderQuizComponent,},
];
