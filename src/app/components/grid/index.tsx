'use client';

import cellTypesArray from '@/app/utils/cellTypes';
import { useEffect, useRef, useState } from 'react';

interface CellProps {
    index: number;
    typeName: string;
}

function createImageArray(rows: number, cols: number): CellProps[][] {
    const grid = new Array<CellProps[]>();
    for (let i = 0; i < rows; i++) {
        const newRow = new Array<CellProps>();
        for (let j = 0; j < cols; j++) {
            const randNumber = Math.floor(Math.random() * 1000);

            if (randNumber < 1) {
                newRow.push({
                    typeName: 'cancer',
                    index: 0,
                });
            } else if (randNumber < 300) {
                newRow.push({
                    typeName: 'alive',
                    index: 0,
                });
            } else {
                newRow.push({
                    typeName: 'dead',
                    index: 0,
                });
            }
        }
        grid.push(newRow);
    }
    return grid;
}

function checkRulesAlive({
    numCancer,
    numAlive,
    survRate,
    isFading,
}: {
    numCancer: number;
    numAlive: number;
    survRate: number;
    isFading: boolean;
}) {
    const numNotDead = numCancer + numAlive;
    if (numNotDead === 2 || numNotDead === 3) {
        if (numAlive + survRate - 1 > numCancer) {
            const randInt = Math.floor(Math.random() * 1000);
            if (randInt > 1000) {
                return {
                    typeName: 'antibody',
                    index: 0,
                };
            } else if (randInt === 0) {
                return {
                    typeName: 'cancer',
                    index: 0,
                };
            } else {
                return {
                    typeName: 'alive',
                    index: 0,
                };
            }
        } else {
            return {
                typeName: 'cancer',
                index: 0,
            };
        }
    } else {
        return {
            typeName: isFading ? 'alive' : 'dead',
            index: isFading ? 1 : 0,
        };
    }
}

function checkRulesAntibody({
    numCancer,
    numAlive,
    survRate,
    isFading,
}: {
    numCancer: number;
    numAlive: number;
    survRate: number;
    isFading: boolean;
}) {
    const numNotDead = numCancer + numAlive;
    if (numNotDead === 2 || numNotDead === 3) {
        if (numAlive + survRate - 1 > numCancer) {
            return {
                typeName: 'antibody',
                index: 0,
            };
        } else {
            return {
                typeName: 'cancer',
                index: 0,
            };
        }
    } else {
        return {
            typeName: isFading ? 'antibody' : 'dead',
            index: isFading ? 1 : 0,
        };
    }
}

function checkRulesCancer({
    numCancer,
    isFading,
}: {
    numCancer: number;
    isFading: boolean;
}) {
    if (numCancer >= 1 && numCancer <= 3) {
        return {
            typeName: 'cancer',
            index: 0,
        };
    } else {
        return {
            typeName: isFading ? 'cancer' : 'dead',
            index: isFading ? 1 : 0,
        };
    }
}

function checkRulesDead({
    numCancer,
    numAlive,
    survRate,
    curIndex,
    curType,
}: {
    numCancer: number;
    numAlive: number;
    survRate: number;
    curIndex: number;
    curType: string;
}) {
    const numNotDead = numCancer + numAlive;
    if (numNotDead === 3) {
        if (numAlive + survRate - 1 > numCancer) {
            const randInt = Math.floor(Math.random() * 1000);
            if (randInt > 1000) {
                return {
                    typeName: 'antibody',
                    index: 0,
                };
            } else if (randInt === 0) {
                return {
                    typeName: 'cancer',
                    index: 0,
                };
            } else {
                return {
                    typeName: 'alive',
                    index: 0,
                };
            }
        } else {
            return {
                typeName: 'cancer',
                index: 0,
            };
        }
    } else {
        if (curIndex === 0 || curIndex === 4) {
            return {
                typeName: 'dead',
                index: 0,
            };
        } else {
            return {
                typeName: curType,
                index: curIndex + 1,
            };
        }
    }
}

function Grid() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const height = 600;
    const width = 800;

    const cellSize = 3;

    const spacing = 1;

    const rows = Math.round(width / (cellSize + spacing));
    const cols = Math.round(height / (cellSize + spacing));

    const [grid, setGrid] = useState<CellProps[][]>([]);
    const [frame, setFrame] = useState<number>(0);
    const [isFading, setFading] = useState<boolean>(true);
    const [survRate, setSurvRate] = useState<number>(2);
    const [survRateAntibody, setSurvRateAntibody] = useState<number>(4);

    const updateFrame = () => {
        setGrid((prevGrid) => {
            const newGrid: CellProps[][] = [];

            prevGrid.forEach((row, x) => {
                const newRow: CellProps[] = [];
                row.forEach((cell, y) => {
                    let numAlive = 0;
                    let numCancer = 0;
                    for (let difX = -1; difX <= 1; difX++) {
                        for (let difY = -1; difY <= 1; difY++) {
                            if (!(difX === 0 && difY === 0)) {
                                try {
                                    if (
                                        (prevGrid[x + difX][y + difY]
                                            .typeName === 'alive' ||
                                            prevGrid[x + difX][y + difY]
                                                .typeName === 'antibody') &&
                                        prevGrid[x + difX][y + difY].index === 0
                                    ) {
                                        numAlive += 1;
                                    } else if (
                                        prevGrid[x + difX][y + difY]
                                            .typeName === 'cancer' &&
                                        prevGrid[x + difX][y + difY].index === 0
                                    ) {
                                        numCancer += 1;
                                    }
                                } catch {}
                            }
                        }
                    }
                    let newCell: CellProps;

                    // rule #1: cell is alive and has 2 or 3 neighbors => stays alive
                    if (cell.typeName === 'alive' && cell.index === 0) {
                        newCell = checkRulesAlive({
                            numAlive: numAlive,
                            numCancer: numCancer,
                            survRate: survRate,
                            isFading: isFading,
                        });
                    } else if (
                        cell.typeName === 'antibody' &&
                        cell.index === 0
                    ) {
                        newCell = checkRulesAntibody({
                            numAlive: numAlive,
                            numCancer: numCancer,
                            survRate: survRateAntibody,
                            isFading: isFading,
                        });
                    } else if (cell.typeName === 'cancer' && cell.index === 0) {
                        newCell = checkRulesCancer({
                            numCancer: numCancer,
                            isFading: isFading,
                        });
                    } else {
                        newCell = checkRulesDead({
                            numAlive: numAlive,
                            numCancer: numCancer,
                            survRate: survRate,
                            curIndex: cell.index,
                            curType: cell.typeName,
                        });
                    }
                    newRow.push(newCell);
                });

                newGrid.push(newRow);
            });
            return newGrid;
        });
        setFrame((prevFrame) => prevFrame + 1);
    };

    useEffect(() => {
        const newGrid = createImageArray(rows, cols);
        setGrid(newGrid);

        const tickerInterval = setInterval(() => {
            updateFrame();
        }, 100);
        return () => clearInterval(tickerInterval);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        // console.log('Frame: ' + frame);

        if (!ctx) return;

        grid.map((row: CellProps[], x) => {
            row.map((cell: CellProps, y) => {
                ctx.fillStyle =
                    cellTypesArray[cell.typeName].stateColors[cell.index];

                ctx.fillRect(
                    x * (cellSize + spacing),
                    y * (cellSize + spacing),
                    cellSize,
                    cellSize
                );
            });
        });
    }, [frame]);

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
