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

export default checkRulesCancer;
