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
var converter1 = new CmToInchConverter();
console.log(converter1.calculate(10));
console.log("Input unit: ".concat(converter1.inputUnit()));
console.log("Output unit: ".concat(converter1.outputUnit()));
