var Resistor = /** @class */ (function () {
    function Resistor(r, g) {
        this.r = r;
        this.g = g;
        this.draw();
    }
    Resistor.prototype.draw = function () {
        this.g.beginPath();
        this.g.rect(10, 10, 80, 30);
        this.g.stroke();
        this.g.strokeText(this.r.toString(), 50, 30);
    };
    return Resistor;
}());
