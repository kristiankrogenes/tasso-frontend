import { checkIfValidHandicap, checkIfValidScore } from "../helpers/helpers";

describe(("Testing Score Validation Function"), () => {
    test('Score under 18', () => {
        const score = checkIfValidScore(17);
        expect(score).toBe(false);
    });
    test('Score over 200', () => {
        const score = checkIfValidScore(201);
        expect(score).toBe(false);
    });
    test('Valid score between 18 and 200', () => {
        const score = checkIfValidScore(99);
        expect(score).toBe(true);
    });
    test('Valid score at 18 (Edgecase)', () => {
        const score = checkIfValidScore(18);
        expect(score).toBe(true);
    });
    test('Valid score at 200 (Edgecase)', () => {
        const score = checkIfValidScore(200);
        expect(score).toBe(true);
    });
});

describe(("Testing Handicap Validation Function"), () => {
    test('Hcp under -25', () => {
        const score = checkIfValidHandicap(-26);
        expect(score).toBe(false);
    });
    test('Score over 54', () => {
        const score = checkIfValidHandicap(55);
        expect(score).toBe(false);
    });
    test('Valid hcp between -25 and 54', () => {
        const score = checkIfValidHandicap(10);
        expect(score).toBe(true);
    });
    test('Valid hcp at -25 (Edgecase)', () => {
        const score = checkIfValidHandicap(-25);
        expect(score).toBe(true);
    });
    test('Valid hcp at 54 (Edgecase)', () => {
        const score = checkIfValidHandicap(54);
        expect(score).toBe(true);
    });
});