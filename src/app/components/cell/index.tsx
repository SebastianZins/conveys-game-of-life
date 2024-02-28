interface IDictionary {
    [key: string]: string;
}

const stateColor: IDictionary = {
    5: 'bg-cyan-100',
    4: 'bg-cyan-300',
    3: 'bg-cyan-500',
    2: 'bg-cyan-700',
    1: 'bg-cyan-950',
    0: 'bg-black',
};

function Cell({
    state,
    cellSize,
    x,
    y,
}: {
    state: number;
    cellSize: number;
    x: number;
    y: number;
}) {
    return (
        <rect
            height={cellSize}
            width={cellSize}
            x={x * cellSize}
            y={y * cellSize}
            className={stateColor[state]}
        />
    );
}

export default Cell;
