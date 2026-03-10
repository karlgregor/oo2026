interface CalculatingFunction {
    calculate(x: number): number;

    inputUnit(): string;
    
    outputUnit(): string;
}

class CmToInchConverter implements CalculatingFunction {
    calculate(x: number): number {
        return x / 2.54;
    }

    inputUnit(): string {
        return "cm";
    }

    outputUnit(): string {
        return "inch";
    }
}

class InchToCmConverter implements CalculatingFunction {
    calculate(x: number): number {
        return x * 2.54;
    }

    inputUnit(): string {
        return "inch";
    }

    outputUnit(): string {
        return "cm";
    }
}

let converter1: CalculatingFunction = new CmToInchConverter();
let converter2: CalculatingFunction = new InchToCmConverter();

console.log(converter1.calculate(10));
console.log(`Input unit: ${converter1.inputUnit()}`);
console.log(`Output unit: ${converter1.outputUnit()}`);

console.log(converter2.calculate(10));
console.log(`Input unit: ${converter2.inputUnit()}`);
console.log(`Output unit: ${converter2.outputUnit()}`);