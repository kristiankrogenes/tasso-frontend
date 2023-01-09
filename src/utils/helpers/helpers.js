
export function checkIfValidScore(num) {
    const intNum = parseInt(num);
    return intNum >= 18 && intNum <= 200;
}

export function checkIfValidHandicap(num) {
    const intHcp = parseInt(num);
    return intHcp >= -25 && intHcp <= 54;
}