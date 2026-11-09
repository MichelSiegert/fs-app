import { AltklausurenComponent } from "../components/AltklausurenComponent";
import { DailyChessPuzzleComponent } from "../components/ChessComponent";
import MinecraftComponent from "../components/MinecraftComponent";
import BrainrotComponent from "../components/SubwaySurfer/BrainrotComponent";
import InfModulTierList from "../components/Tierlist/InfModules";

export const RECREATIONAL_ITEMS = [
  { id: 'chess', name: 'Chess Puzzle', component: DailyChessPuzzleComponent },
  { id: 'minecraft', name: 'Minecraft', component: MinecraftComponent },
  { id: 'klausuren', name: 'Altklausuren', component: AltklausurenComponent },
  { id: 'rot', name: 'Brainrot', component: BrainrotComponent },
  {id: 'modtierlist', name: 'mod Tierlist', component: InfModulTierList}
];