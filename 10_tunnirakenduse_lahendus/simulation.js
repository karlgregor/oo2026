var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MaterialAmount = /** @class */ (function () {
    function MaterialAmount(mass, specificHeatCapacity, temperature) {
        this.mass = mass;
        this.specificHeatCapacity = specificHeatCapacity;
        this.temperature = temperature;
    }
    MaterialAmount.prototype.getTemperature = function () {
        return this.temperature;
    };
    MaterialAmount.prototype.getHeatCapacity = function () {
        return this.mass * this.specificHeatCapacity;
    };
    // Q = m * c * ΔT => ΔT = Q / (m * c)
    MaterialAmount.prototype.changeEnergy = function (energy) {
        var temperatureChange = energy / (this.mass * this.specificHeatCapacity);
        this.temperature += temperatureChange;
    };
    return MaterialAmount;
}());
var AirAmount = /** @class */ (function (_super) {
    __extends(AirAmount, _super);
    function AirAmount(length, width, height, temperature) {
        var _this = this;
        var volume = length * width * height;
        var mass = AirAmount.airDensity * volume;
        _this = _super.call(this, mass, AirAmount.airSpecificHeat, temperature) || this;
        _this.length = length;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    AirAmount.airDensity = 1.23; // kg / m^3
    AirAmount.airSpecificHeat = 1012; // J / (kg * °C)
    return AirAmount;
}(MaterialAmount));
function CalculateEqualTemperature(materials) {
    var weightedTemperatureSum = 0;
    var totalHeatCapacity = 0;
    for (var _i = 0, materials_1 = materials; _i < materials_1.length; _i++) {
        var material = materials_1[_i];
        var heatCapacity = material.getHeatCapacity();
        weightedTemperatureSum += heatCapacity * material.getTemperature();
        totalHeatCapacity += heatCapacity;
    }
    return weightedTemperatureSum / totalHeatCapacity;
}
// TESTS
var water = new MaterialAmount(3, 4200, 20);
var iron = new MaterialAmount(10, 412, 20);
water.changeEnergy(10000);
iron.changeEnergy(10000);
console.log("After adding 10,000 J:");
console.log("Water temperature:", water.getTemperature().toFixed(2), "°C");
console.log("Iron temperature:", iron.getTemperature().toFixed(2), "°C");
if (iron.getTemperature() > water.getTemperature()) {
    iron.changeEnergy(-1000);
    water.changeEnergy(1000);
    console.log("After transfering 1000 J:");
    console.log("Water temperature:", water.getTemperature().toFixed(2), "°C");
    console.log("Iron temperature:", iron.getTemperature().toFixed(2), "°C");
}
else {
    console.log("Iron object isn't hotter than water object, not transfering.");
}
var airInRoom = new AirAmount(5, 5, 5, 21);
console.log(airInRoom.mass);
console.log(airInRoom.temperature);
var equalTemperature = CalculateEqualTemperature([water, iron, airInRoom]);
console.log(equalTemperature);
