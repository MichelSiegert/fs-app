import { DailyChessPuzzleComponent } from "../components/ChessComponent";
import { GapminderQuizComponent } from "../components/GapMinderQuizComponent";
import MinecraftComponent from "../components/MinecraftComponent";
import BrainrotComponent from "../components/BrainRotComponent/BrainrotComponent";
import InfModulTierList from "../components/Tierlist/InfModules";

export const RECREATIONAL_ITEMS = [
  { id: 'chess', name: 'Chess Puzzle', component: DailyChessPuzzleComponent },
  { id: 'minecraft', name: 'Minecraft', component: MinecraftComponent },
  { id: 'rot', name: 'Brainrot', component: BrainrotComponent },
  { id: 'modtierlist', name: 'mod Tierlist', component: InfModulTierList},
  { id: 'questions', name: 'questionaire', component: GapminderQuizComponent,},
];
