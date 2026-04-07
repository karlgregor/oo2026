abstract class AbstractResistor {
    // This function must be created in child branches
    abstract getResistance(): number;

    getCurrent(u: number): number {
        return u / this.getResistance();
    }
}

class Resistor extends AbstractResistor {
    r: number;

    constructor(r: number) {
        super();
        this.r = r;
    }

    getResistance(): number {
        return this.r;
    }

    printResistance() {
        console.log(`Resistance: ${this.r} ohms`);
    }
}

class Switch extends AbstractResistor {
    isOn: boolean = false;

    setOn(state: boolean) {
        this.isOn = state;
    }

    getResistance(): number {
        return this.isOn ? 0 : 1000000000;
    }

    getCurrent(u: number): number {
        if (u > 0 && !this.isOn) {
            throw new Error("Switch is off, no current can flow.");
        }

        return super.getCurrent(u);
    }
}

const resistor1 = new Resistor(100);
console.log(resistor1.getResistance());
let switch1 = new Switch();
console.log(switch1.getResistance());
switch1.setOn(true);
console.log(switch1.getResistance());
console.log(switch1.getCurrent(5));
// Current = u/resistance value
// switch1.setOn(false);
// console.log(switch1.getCurrent(5));

abstract class MultipleConnection extends AbstractResistor {
    resistors: AbstractResistor[] = [];

    addResistor(resistor: AbstractResistor) {
        this.resistors.push(resistor);
    }
}

class SeriesConnection extends MultipleConnection {
    getResistance(): number {
        let totalResistance: number = 0;

        for (let resistor of this.resistors) {
            totalResistance += resistor.getResistance();
        }

        return totalResistance;
        //return this.resistors.reduce((total, resistor) => total + resistor.getResistance(), 0);
    }
}

class ParallelConnection extends MultipleConnection {
    getResistance(): number {
        let totalConductance: number = 0;

        for (let resistor of this.resistors) {
            totalConductance += 1 / resistor.getResistance();
        }

        return 1 / totalConductance;
        //return 1 / this.resistors.reduce((total, resistor) => total + 1 / resistor.getResistance(), 0);
    }
}

let s: SeriesConnection = new SeriesConnection();
s.addResistor(new Resistor(100));
s.addResistor(new Resistor(200));
s.addResistor(new Resistor(300));
console.log("Resistance of series connection: " + s.getResistance());

let p: ParallelConnection = new ParallelConnection();
p.addResistor(new Resistor(100));
p.addResistor(new Resistor(200));
p.addResistor(new Resistor(300));
console.log("Resistance of parallel connection: " + p.getResistance());