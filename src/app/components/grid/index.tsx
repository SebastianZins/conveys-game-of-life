'use client';

import { useEffect, useRef, useState } from 'react';

function createImageArray({
    rows,
    cols,
}: {
    rows: number;
    cols: number;
}): number[][] {
    const grid = new Array<number[]>();
    for (let i = 0; i < rows; i++) {
        const newRow = new Array<number>();
        for (let j = 0; j < cols; j++) {
            const randNumber = Math.floor(Math.random() * 5);
            newRow.push(randNumber === 0 ? 5 : 0);
        }
        grid.push(newRow);
    }
    return grid;
}

interface IDictionary {
    [key: string]: string;
}

const stateColor: IDictionary = {
    5: '#cffafe',
    4: '#22d3ee',
    3: '#0891b2',
    2: '#155e75',
    1: '#083344',
    0: '#0a0a0a',
};

function Grid() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const height = 600;
    const width = 800;

    const cellSize = 3;

    const rows = Math.round(width / (cellSize + 1));
    const cols = Math.round(height / (cellSize + 1));

    const [grid, setGrid] = useState<number[][]>([]);

    let frame = 0;

    const handleUpdateFrame = () => {
        setGrid((prevGrid) => {
            const newGrid: number[][] = [];

            prevGrid.forEach((row, x) => {
                const newRow: number[] = [];
                row.forEach((cell, y) => {
                    let numNeighbors = 0;
                    for (let difX = -1; difX <= 1; difX++) {
                        for (let difY = -1; difY <= 1; difY++) {
                            if (!(difX === 0 && difY === 0)) {
                                try {
                                    if (prevGrid[x + difX][y + difY] === 5) {
                                        numNeighbors += 1;
                                    }
                                } catch {}
                            }
                        }
                    }

                    // rule #1: cell is dead and has 3 neighbors => becomes alive
                    if (cell != 5 && numNeighbors === 3) {
                        newRow.push(5);
                    }
                    // rule #2: cell is alive, dies from loneliness
                    else if (cell === 5 && numNeighbors < 2) {
                        newRow.push(4);
                    }
                    // rule #3: cell is alive and stays alive
                    else if (
                        cell === 5 &&
                        (numNeighbors === 2 || numNeighbors === 3)
                    ) {
                        newRow.push(5);
                    }
                    // rule #4: cell is alive, dies from overcrowded-nes
                    else if (cell === 5 && numNeighbors > 3) {
                        newRow.push(4);
                    }
                    // extra rule: if is dead, fade if possible
                    else {
                        if (cell === 0) {
                            newRow.push(0);
                        } else {
                            newRow.push(cell - 1);
                        }
                    }
                });
                newGrid.push(newRow);
            });
            frame++;
            return newGrid;
        });
    };

    useEffect(() => {
        const newGrid = createImageArray({ rows: rows, cols: cols });
        setGrid(newGrid);

        const tickerInterval = setInterval(() => {
            handleUpdateFrame();
        }, 50);
        return () => clearInterval(tickerInterval);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        console.log('Frame: ' + frame);

        if (!ctx) return;

        grid.map((row: number[], x) => {
            row.map((cell: number, y) => {
                ctx.fillStyle = stateColor[cell];
                ctx.fillRect(
                    x * (cellSize + 1),
                    y * (cellSize + 1),
                    cellSize,
                    cellSize
                );
            });
        });
    }, [grid, cellSize]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className='bg-black'
        />
    );
}

export default Grid;
