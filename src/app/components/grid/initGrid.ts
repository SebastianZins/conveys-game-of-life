import CellProps from '@/app/utils/types/cellprops';

function initializeGrid(rows: number, cols: number): CellProps[][] {
    const grid: CellProps[][] = [];

    for (let x = 0; x < rows; x++) {
        const newRow: CellProps[] = [];
        for (let y = 0; y < cols; y++) {
            newRow.push({
                typeName: 'dead',
                index: 0,
            });
        }
        grid.push(newRow);
    }
    return grid;
}

export default initializeGrid;
