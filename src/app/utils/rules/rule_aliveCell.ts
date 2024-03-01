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

export default checkRulesAlive;
