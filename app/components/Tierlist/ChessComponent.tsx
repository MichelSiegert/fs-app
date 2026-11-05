import { TierData, TierListComponent } from "./TierlistComponent";


const modules = [

]
const sampleRankings: TierData = {
    S: [
        { id: '9', label: 'KS' },
        { id: '10', label: 'MOB' },
        { id: '26', label: 'AUD' },
        { id: '32', label: 'AN' },
    ],
    A: [
        { id: '4', label: 'PRG' },
        { id: '6', label: 'EKI' },
        { id: '17', label: 'CC' },
        { id: '18', label: 'CG' },
        { id: '37', label: 'PROI' },
        { id: '38', label: 'AEM' },
    ],
    B: [
        { id: '1', label: 'ANF' },
        { id: '7', label: 'HCI' },
        { id: '14', label: 'Projekt' },
        { id: '22', label: 'ML' },
        { id: '23', label: 'ROB' },
        { id: '27', label: 'DBN' },
        { id: '29', label: 'OOP' },
        { id: '30', label: 'WA' },
        { id: '31', label: 'ADL' },
    ],
    C: [
        { id: '2', label: 'EIN' },
        { id: '8', label: 'IUG' },
        { id: '34', label: 'COCO' },
        { id: '36', label: 'PIC' },
        { id: '38', label: 'TSW' }
    ],
    D: [
        { id: '3', label: 'MA1' },
        { id: '11', label: 'STA' },
        { id: '28', label: 'MA2-I' },
        { id: '13', label: 'Creative Technologies' },
        { id: '15', label: 'Creative Coding' },
        { id: '35', label: 'DIG' },
    ],
    F: [
        { id: '5', label: 'BS' },
        { id: '16', label: 'functional programming' },
        { id: '21', label: 'EMT' },
        { id: '24', label: 'SEG' },
        { id: '33', label: 'ASA' },
    ],
};

export default function InfModulTierList() {
    return (
        <main className="w-full">
            <TierListComponent data={sampleRankings} />
        </main>
    );
}