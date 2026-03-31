import { Calculator } from "../03_Calculator";

let calcObj: Calculator;

beforeEach(() => {
    calcObj = new Calculator();
})

test("empty init", () => {
    expect(calcObj.getPanelContent()).toBe("");
})

test("simple input", () => {
    calcObj.pressButton('7');
    expect(calcObj.getPanelContent()).toBe("7");
})

test("multiple input", () => {
    calcObj.pressButton('7');
    calcObj.pressButton('8');
    expect(calcObj.getPanelContent()).toBe("78");
})