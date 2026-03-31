interface CalculatingFunction {
    calculate(x: number): number;
    inputUnit(): string;
    outputUnit(): string;
}

class CelsiusToFahrenheit implements CalculatingFunction {
    calculate(x: number): number {
        return Math.round((x * 9/5 + 32) * 10) / 10;
    }

    inputUnit(): string {
        return "°C";
    }

    outputUnit(): string {
        return "°F";
    }
}

class FahrenheitToCelsius implements CalculatingFunction {
    calculate(x: number): number {
        return Math.round(((x - 32) * 5/9) * 10) / 10;
    }

    inputUnit(): string {
        return "°F";
    }

    outputUnit(): string {
        return "°C";
    }
}

class CelsiusToKelvin implements CalculatingFunction {
    calculate(x: number): number {
        return Math.round((x + 273.15) * 10) / 10;
    }

    inputUnit(): string {
        return "°C";
    }

    outputUnit(): string {
        return "K";
    }
}

class KelvinToCelsius implements CalculatingFunction {
    calculate(x: number): number {
        return Math.round((x - 273.15) * 10) / 10;
    }

    inputUnit(): string {
        return "K";
    }

    outputUnit(): string {
        return "°C";
    }
}

class KelvinToFahrenheit implements CalculatingFunction {
    calculate(x: number): number {
        return Math.round(((x - 273.15) * 9/5 + 32) * 10) / 10;
    }   

    inputUnit(): string {
        return "K";
    }

    outputUnit(): string {
        return "°F";
    }
}

class FahrenheitToKelvin implements CalculatingFunction {
    calculate(x: number): number {
        return Math.round(((x - 32) * 5/9 + 273.15) * 10) / 10;
    }

    inputUnit(): string {
        return "°F";
    }

    outputUnit(): string {
        return "K";
    }
}