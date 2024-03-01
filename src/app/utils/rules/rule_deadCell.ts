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

export default checkRulesDead;
