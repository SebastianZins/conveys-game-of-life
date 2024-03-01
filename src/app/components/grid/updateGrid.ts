import checkRulesAlive from '@/app/utils/rules/rule_aliveCell';
import checkRulesAntibody from '@/app/utils/rules/rule_antibodyCell';
import checkRulesCancer from '@/app/utils/rules/rule_cancerCell';
import checkRulesDead from '@/app/utils/rules/rule_deadCell';
import CellProps from '@/app/utils/types/cellprops';

function updateGrid({
    oldGrid,
    survRate,
    survRateAntibody,
    isFading,
}: {
    oldGrid: CellProps[][];
    survRate: number;
    survRateAntibody: number;
    isFading: boolean;
}) {
    const newGrid: CellProps[][] = [];

    oldGrid.forEach((row, x) => {
        const newRow: CellProps[] = [];
        row.forEach((cell, y) => {
            let numAlive = 0;
            let numCancer = 0;
            for (let difX = -1; difX <= 1; difX++) {
                for (let difY = -1; difY <= 1; difY++) {
                    if (!(difX === 0 && difY === 0)) {
                        try {
                            if (
                                (oldGrid[x + difX][y + difY].typeName ===
                                    'alive' ||
                                    oldGrid[x + difX][y + difY].typeName ===
                                        'antibody') &&
                                oldGrid[x + difX][y + difY].index === 0
                            ) {
                                numAlive += 1;
                            } else if (
                                oldGrid[x + difX][y + difY].typeName ===
                                    'cancer' &&
                                oldGrid[x + difX][y + difY].index === 0
                            ) {
                                numCancer += 1;
                            }
                        } catch {}
                    }
                }
            }
            let newCell: CellProps;

            // check rules for type "alive"
            if (cell.typeName === 'alive' && cell.index === 0) {
                newCell = checkRulesAlive({
                    numAlive: numAlive,
                    numCancer: numCancer,
                    survRate: survRate,
                    isFading: isFading,
                });
            }
            // check rules for type "antibody"
            else if (cell.typeName === 'antibody' && cell.index === 0) {
                newCell = checkRulesAntibody({
                    numAlive: numAlive,
                    numCancer: numCancer,
                    survRate: survRateAntibody,
                    isFading: isFading,
                });
            }
            // check rules for type "cancer"
            else if (cell.typeName === 'cancer' && cell.index === 0) {
                newCell = checkRulesCancer({
                    numCancer: numCancer,
                    isFading: isFading,
                });
            }
            // check rules for type "dead"
            else {
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
}

export default updateGrid;
