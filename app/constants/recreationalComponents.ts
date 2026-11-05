import { AltklausurenComponent } from "../components/AltklausurenComponent";
import { DailyChessPuzzleComponent } from "../components/ChessComponent";
import MinecraftComponent from "../components/MinecraftComponent";
import SubwaySurferComponent from "../components/SubwaySurfer/SubwaySurfer";

export const RECREATIONAL_ITEMS = [
  { id: 'chess', name: 'Chess Puzzle', component: DailyChessPuzzleComponent },
  { id: 'minecraft', name: 'Minecraft', component: MinecraftComponent },
  { id: 'klausuren', name: 'Altklausuren', component: AltklausurenComponent },
  { id: 'surfer', name: 'surfer', component: SubwaySurferComponent },
];