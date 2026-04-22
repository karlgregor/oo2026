class MaterialAmount {
    mass: number; // kg
    specificHeatCapacity: number; // J / (kg * °C)
    temperature: number;// °C

    constructor(mass: number, specificHeatCapacity: number, temperature: number) {
        this.mass = mass
        this.specificHeatCapacity = specificHeatCapacity
        this.temperature = temperature
    }

    getTemperature(): number {
        return this.temperature;
    }

    getHeatCapacity(): number {
        return this.mass * this.specificHeatCapacity;
    }

    // Q = m * c * ΔT => ΔT = Q / (m * c)
    changeEnergy(energy: number): void {
        const temperatureChange = energy / (this.mass * this.specificHeatCapacity);
        this.temperature += temperatureChange;
    }
}

class AirAmount extends MaterialAmount {
    static airDensity = 1.23; // kg / m^3
    static airSpecificHeat = 1012; // J / (kg * °C)

    length: number;
    width: number;
    height: number;

    constructor(length: number, width: number, height: number, temperature: number) {
        const volume = length * width * height
        const mass = AirAmount.airDensity * volume;

        super(mass, AirAmount.airSpecificHeat, temperature);

        this.length = length;
        this.width = width;
        this.height = height;
    }
}

function CalculateEqualTemperature(materials: MaterialAmount[]): number {
    let weightedTemperatureSum = 0;
    let totalHeatCapacity = 0;

    for (const material of materials) {
        const heatCapacity = material.getHeatCapacity()
        weightedTemperatureSum += heatCapacity * material.getTemperature();
        totalHeatCapacity += heatCapacity;
    }

    return weightedTemperatureSum / totalHeatCapacity;
}

// TESTS

let water = new MaterialAmount(3, 4200, 20)
let iron = new MaterialAmount(10, 412, 20)

water.changeEnergy(10000);
iron.changeEnergy(10000);

console.log("After adding 10,000 J:");
console.log("Water temperature:", water.getTemperature().toFixed(2), "°C");
console.log("Iron temperature:", iron.getTemperature().toFixed(2), "°C");

if (iron.getTemperature() > water.getTemperature()) {
    iron.changeEnergy(-1000)
    water.changeEnergy(1000)

    console.log("After transfering 1000 J:");
    console.log("Water temperature:", water.getTemperature().toFixed(2), "°C");
    console.log("Iron temperature:", iron.getTemperature().toFixed(2), "°C");
} else {
    console.log("Iron object isn't hotter than water object, not transfering.")
}

const airInRoom = new AirAmount(5, 5, 5, 21)

console.log("Air in room mass: " + airInRoom.mass)
console.log("Air in room temperature: " + airInRoom.temperature)

const equalTemperature = CalculateEqualTemperature([water, iron, airInRoom]);
console.log(equalTemperature)

