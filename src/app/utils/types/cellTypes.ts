import twcolors from 'tailwindcss/colors'; // Import Tailwind colors

interface CellTypeInterface {
    typeName: string;
    stateColors: string[];
}

const aliveCell: CellTypeInterface = {
    typeName: 'alive',
    stateColors: [
        twcolors.cyan[200],
        twcolors.cyan[500],
        twcolors.cyan[700],
        twcolors.cyan[900],
        twcolors.cyan[950],
    ],
};

const antibodyCell: CellTypeInterface = {
    typeName: 'antibody',
    stateColors: [
        twcolors.yellow[200],
        twcolors.yellow[500],
        twcolors.yellow[700],
        twcolors.yellow[900],
        twcolors.yellow[950],
    ],
};

const cancerCell: CellTypeInterface = {
    typeName: 'cancer',
    stateColors: [
        twcolors.red[200],
        twcolors.red[500],
        twcolors.red[700],
        twcolors.red[900],
        twcolors.red[950],
    ],
};

const deadCell: CellTypeInterface = {
    typeName: 'dead',
    stateColors: [twcolors.gray[950]],
};

const cellTypesArray: {
    [key: string]: CellTypeInterface;
} = {
    alive: { ...aliveCell },
    antibody: { ...antibodyCell },
    cancer: { ...cancerCell },
    dead: { ...deadCell },
};

export default cellTypesArray;
