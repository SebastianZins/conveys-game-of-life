import CellProps from '@/app/utils/types/cellprops';

function randomFillGrid({
    grid,
    chanceAlive = 0.3,
    chanceCancer = 0.001,
    chanceAntibody = 0.1,
}: {
    grid: CellProps[][];
    chanceAlive?: number;
    chanceCancer?: number;
    chanceAntibody?: number;
}) {
    grid.forEach((row, x) => {
        row.forEach((cell, y) => {
            const randNumber = Math.floor(Math.random() * 1000);

            if (randNumber < 1000 * chanceCancer) {
                cell.typeName = 'cancer';
            } else if (randNumber < 1000 * chanceAlive) {
                const sndRandNumber = Math.floor(Math.random() * 1000);
                if (sndRandNumber < 1000 * chanceAntibody) {
                    cell.typeName = 'antibody';
                } else {
                    cell.typeName = 'alive';
                }
            }
        });
    });
}

export default randomFillGrid;
