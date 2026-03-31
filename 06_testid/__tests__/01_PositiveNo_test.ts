import { isPositiveNo } from '../01_PositiveNo';

test("positive", () => {
    expect(isPositiveNo(1)).toBe(true);
    expect(isPositiveNo(-2)).toBe(false);
    expect(isPositiveNo(0)).toBe(false);
})