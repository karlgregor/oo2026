// Function 01 - Say "Hello world"
function sayHello() {
    return "Hello world";
}
var testing = sayHello();
console.log(testing);
// Function 02 - Multiply numbers
function multiply(a, b) {
    return a * b;
}
var testing2 = multiply(2, 4);
console.log(testing2);
// Function 03 - Calculate BMI
function bmiCalc(cm, kg) {
    // Converting CM to M
    var heightInMeter = cm / 100;
    // Calculating the BMI using "heightInMeter" and "kg"
    return kg / (heightInMeter * heightInMeter);
}
var weight = 70;
var height = 175;
console.log(bmiCalc(height, weight));
var weights = [80, 90, 100, 110, 115];
for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
    var weight_1 = weights_1[_i];
    var bmi = bmiCalc(height, weight_1);
    console.log("For weight " + weight_1 + " kg, the BMI is " + bmi.toFixed(2));
}
// map runs the given function for each value in the array
// for each weight, BMI is called.
// the returned BMI values are collected into a new array.
var bmivalue = weights.map(function (weight) { return bmiCalc(height, weight); });
//console.log(bmivalue)
// function 04 - but different function for bmi
// alternative formula for bmi
function bmiCalc2(cm, kg) {
    var m = cm / 100;
    return 1.3 * kg / Math.pow(m, 2.5);
}
var bmivalue2 = weights.map(function (weight) { return bmiCalc2(height, weight); });
//console.log(bmivalue2)
var results = [];
for (var height_1 = 150; height_1 <= 190; height_1 += 2) {
    results.push([
        height_1,
        bmiCalc(height_1, 90),
        bmiCalc2(height_1, 90),
    ]);
}
console.log(results);
// function 05 - calculate area of circle
var radius = 15;
function areaCalculator(r) {
    var area = Math.PI * Math.pow(r, 2);
    var roundArea = Math.round(area * 100) / 100;
    return roundArea;
}
var area = areaCalculator(radius);
console.log("Area of circle with radius " + radius + " is " + area);
