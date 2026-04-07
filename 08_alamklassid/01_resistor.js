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
var AbstractResistor = /** @class */ (function () {
    function AbstractResistor() {
    }
    AbstractResistor.prototype.getCurrent = function (u) {
        return u / this.getResistance();
    };
    return AbstractResistor;
}());
var Resistor = /** @class */ (function (_super) {
    __extends(Resistor, _super);
    function Resistor(r) {
        var _this = _super.call(this) || this;
        _this.r = r;
        return _this;
    }
    Resistor.prototype.getResistance = function () {
        return this.r;
    };
    Resistor.prototype.printResistance = function () {
        console.log("Resistance: ".concat(this.r, " ohms"));
    };
    return Resistor;
}(AbstractResistor));
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isOn = false;
        return _this;
    }
    Switch.prototype.setOn = function (state) {
        this.isOn = state;
    };
    Switch.prototype.getResistance = function () {
        return this.isOn ? 0 : 1000000000;
    };
    Switch.prototype.getCurrent = function (u) {
        if (u > 0 && !this.isOn) {
            throw new Error("Switch is off, no current can flow.");
        }
        return _super.prototype.getCurrent.call(this, u);
    };
    return Switch;
}(AbstractResistor));
var resistor1 = new Resistor(100);
console.log(resistor1.getResistance());
var switch1 = new Switch();
console.log(switch1.getResistance());
switch1.setOn(true);
console.log(switch1.getResistance());
console.log(switch1.getCurrent(5));
// Current = u/resistance value
// switch1.setOn(false);
// console.log(switch1.getCurrent(5));
var MultipleConnection = /** @class */ (function (_super) {
    __extends(MultipleConnection, _super);
    function MultipleConnection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resistors = [];
        return _this;
    }
    MultipleConnection.prototype.addResistor = function (resistor) {
        this.resistors.push(resistor);
    };
    return MultipleConnection;
}(AbstractResistor));
var SeriesConnection = /** @class */ (function (_super) {
    __extends(SeriesConnection, _super);
    function SeriesConnection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeriesConnection.prototype.getResistance = function () {
        var totalResistance = 0;
        for (var _i = 0, _a = this.resistors; _i < _a.length; _i++) {
            var resistor = _a[_i];
            totalResistance += resistor.getResistance();
        }
        return totalResistance;
        //return this.resistors.reduce((total, resistor) => total + resistor.getResistance(), 0);
    };
    return SeriesConnection;
}(MultipleConnection));
var ParallelConnection = /** @class */ (function (_super) {
    __extends(ParallelConnection, _super);
    function ParallelConnection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParallelConnection.prototype.getResistance = function () {
        var totalConductance = 0;
        for (var _i = 0, _a = this.resistors; _i < _a.length; _i++) {
            var resistor = _a[_i];
            totalConductance += 1 / resistor.getResistance();
        }
        return 1 / totalConductance;
        //return 1 / this.resistors.reduce((total, resistor) => total + 1 / resistor.getResistance(), 0);
    };
    return ParallelConnection;
}(MultipleConnection));
var s = new SeriesConnection();
s.addResistor(new Resistor(100));
s.addResistor(new Resistor(200));
s.addResistor(new Resistor(300));
console.log("Resistance of series connection: " + s.getResistance());
var p = new ParallelConnection();
p.addResistor(new Resistor(100));
p.addResistor(new Resistor(200));
p.addResistor(new Resistor(300));
console.log("Resistance of parallel connection: " + p.getResistance());
