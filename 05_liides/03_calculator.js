var CmToInchConverter = /** @class */ (function () {
    function CmToInchConverter() {
    }
    CmToInchConverter.prototype.calculate = function (x) {
        return x / 2.54;
    };
    CmToInchConverter.prototype.inputUnit = function () {
        return "cm";
    };
    CmToInchConverter.prototype.outputUnit = function () {
        return "inch";
    };
    return CmToInchConverter;
}());
var InchToCmConverter = /** @class */ (function () {
    function InchToCmConverter() {
    }
    InchToCmConverter.prototype.calculate = function (x) {
        return x * 2.54;
    };
    InchToCmConverter.prototype.inputUnit = function () {
        return "inch";
    };
    InchToCmConverter.prototype.outputUnit = function () {
        return "cm";
    };
    return InchToCmConverter;
}());
var converter1 = new CmToInchConverter();
var converter2 = new InchToCmConverter();
console.log(converter1.calculate(10));
console.log("Input unit: ".concat(converter1.inputUnit()));
console.log("Output unit: ".concat(converter1.outputUnit()));
console.log(converter2.calculate(10));
console.log("Input unit: ".concat(converter2.inputUnit()));
console.log("Output unit: ".concat(converter2.outputUnit()));
