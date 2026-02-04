// Function 01 - Say "Hello world"

function sayHello() {
    return "Hello world"
}

let testing = sayHello()

console.log(testing);

// Function 02 - Multiply numbers

function multiply(a: number, b: number) {
    return a * b;
}

let testing2 = multiply(2, 4)

console.log(testing2)

// Function 03 - Calculate BMI

function bmiCalc(cm: number, kg: number) {
    // Converting CM to M
    let heightInMeter: number = cm / 100;

    // Calculating the BMI using "heightInMeter" and "kg"
    return kg / (heightInMeter * heightInMeter);
}

let weight = 70;
let height = 175;

console.log(bmiCalc(height, weight))

let weights: number[] = [80, 90, 100, 110, 115]

for (let weight of weights) {
    let bmi: number = bmiCalc(height, weight);
    console.log("For weight " + weight + " kg, the BMI is " + bmi.toFixed(2));
}

// map runs the given function for each value in the array
// for each weight, BMI is called.
// the returned BMI values are collected into a new array.
let bmivalue: number [] = weights.map(weight => bmiCalc(height, weight));
//console.log(bmivalue)

// function 04 - but different function for bmi
// alternative formula for bmi
function bmiCalc2 (cm: number, kg: number) {
    let m: number = cm / 100;

    return 1.3*kg/Math.pow(m, 2.5)
}

let bmivalue2: number [] = weights.map(weight => bmiCalc2(height, weight));
//console.log(bmivalue2)

let results: number[][] = [];

for (let height = 150; height <= 190; height += 2) {
    results.push([
        height,
        bmiCalc(height, 90),
        bmiCalc2(height, 90),
    ]
    )
}

console.log(results)

// function 05 - calculate area of circle

let radius: number = 15;

function areaCalculator(r: number) {
    let area: number = Math.PI * Math.pow(r, 2);
    let roundArea: number = Math.round(area * 100) / 100;
    return roundArea;
}

let area: number = areaCalculator(radius);

console.log("Area of circle with radius " + radius + " is " + area);