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

export default checkRulesAntibody;
