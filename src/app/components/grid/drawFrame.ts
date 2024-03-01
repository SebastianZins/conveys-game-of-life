import cellTypesArray from '@/app/utils/types/cellTypes';
import CellProps from '@/app/utils/types/cellprops';

function drawFrame({
    canvas2D,
    grid,
    cellSize,
    spacing,
}: {
    canvas2D: CanvasRenderingContext2D | null;
    grid: CellProps[][];
    cellSize: number;
    spacing: number;
}) {
    if (!canvas2D) return;

    grid.map((row: CellProps[], x) => {
        row.map((cell: CellProps, y) => {
            canvas2D.fillStyle =
                cellTypesArray[cell.typeName].stateColors[cell.index];

            canvas2D.fillRect(
                x * (cellSize + spacing),
                y * (cellSize + spacing),
                cellSize,
                cellSize
            );
        });
    });
}

export default drawFrame;
