var CelsiusToFahrenheit = /** @class */ (function () {
    function CelsiusToFahrenheit() {
    }
    CelsiusToFahrenheit.prototype.calculate = function (x) {
        return Math.round((x * 9 / 5 + 32) * 10) / 10;
    };
    CelsiusToFahrenheit.prototype.inputUnit = function () {
        return "°C";
    };
    CelsiusToFahrenheit.prototype.outputUnit = function () {
        return "°F";
    };
    return CelsiusToFahrenheit;
}());
var FahrenheitToCelsius = /** @class */ (function () {
    function FahrenheitToCelsius() {
    }
    FahrenheitToCelsius.prototype.calculate = function (x) {
        return Math.round(((x - 32) * 5 / 9) * 10) / 10;
    };
    FahrenheitToCelsius.prototype.inputUnit = function () {
        return "°F";
    };
    FahrenheitToCelsius.prototype.outputUnit = function () {
        return "°C";
    };
    return FahrenheitToCelsius;
}());
var CelsiusToKelvin = /** @class */ (function () {
    function CelsiusToKelvin() {
    }
    CelsiusToKelvin.prototype.calculate = function (x) {
        return Math.round((x + 273.15) * 10) / 10;
    };
    CelsiusToKelvin.prototype.inputUnit = function () {
        return "°C";
    };
    CelsiusToKelvin.prototype.outputUnit = function () {
        return "K";
    };
    return CelsiusToKelvin;
}());
var KelvinToCelsius = /** @class */ (function () {
    function KelvinToCelsius() {
    }
    KelvinToCelsius.prototype.calculate = function (x) {
        return Math.round((x - 273.15) * 10) / 10;
    };
    KelvinToCelsius.prototype.inputUnit = function () {
        return "K";
    };
    KelvinToCelsius.prototype.outputUnit = function () {
        return "°C";
    };
    return KelvinToCelsius;
}());
var KelvinToFahrenheit = /** @class */ (function () {
    function KelvinToFahrenheit() {
    }
    KelvinToFahrenheit.prototype.calculate = function (x) {
        return Math.round(((x - 273.15) * 9 / 5 + 32) * 10) / 10;
    };
    KelvinToFahrenheit.prototype.inputUnit = function () {
        return "K";
    };
    KelvinToFahrenheit.prototype.outputUnit = function () {
        return "°F";
    };
    return KelvinToFahrenheit;
}());
var FahrenheitToKelvin = /** @class */ (function () {
    function FahrenheitToKelvin() {
    }
    FahrenheitToKelvin.prototype.calculate = function (x) {
        return Math.round(((x - 32) * 5 / 9 + 273.15) * 10) / 10;
    };
    FahrenheitToKelvin.prototype.inputUnit = function () {
        return "°F";
    };
    FahrenheitToKelvin.prototype.outputUnit = function () {
        return "K";
    };
    return FahrenheitToKelvin;
}());
