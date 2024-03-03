'use client';

import CellProps from '@/app/utils/types/cellprops';
import { useEffect, useRef, useState } from 'react';
import initializeGrid from './initGrid';
import randomFillGrid from './randomizeGrid';
import updateGrid from './updateGrid';
import drawFrame from './drawFrame';

function Grid() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const height = 800;
    const width = 1200;

    const cellSize = 2;

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
            return updateGrid({
                oldGrid: prevGrid,
                survRate: survRate,
                survRateAntibody: survRateAntibody,
                isFading: isFading,
            });
        });
        setFrame((prevFrame) => prevFrame + 1);
    };

    useEffect(() => {
        const newGrid = initializeGrid(rows, cols);
        randomFillGrid({
            grid: newGrid,
            chanceAntibody: 0,
        });
        setGrid(newGrid);

        const tickerInterval = setInterval(() => {
            updateFrame();
        }, 50);
        return () => clearInterval(tickerInterval);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        drawFrame({
            canvas2D: ctx,
            grid: grid,
            cellSize: cellSize,
            spacing: spacing,
        });
    }, [frame]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className='bg-black rounded-l-lg p-2'
        />
    );
}

export default Grid;
