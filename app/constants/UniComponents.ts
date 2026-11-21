import { AltklausurenComponent } from "../components/AltklausurenComponent";
import { FachschaftsHelferComponent } from "../components/HelfendenComponent";
import { LampComponent } from "../components/LampComponent";
import { OverengineeredComponent } from "../components/OverTheTopCOmponent";


export const UNI_ITEMS = [
  { id: 'lamp', name: 'lamp', component: LampComponent},
  { id: 'klausuren', name: 'Altklausuren', component: AltklausurenComponent },
  { id: 'helfen', name: 'helfen', component: OverengineeredComponent },
  { id: 'helfen2', name: 'helfen2', component: FachschaftsHelferComponent },
];
