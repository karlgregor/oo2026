var Resistor1 = /** @class */ (function () {
    function Resistor1(r, g, 
    // x position where the resistor should be drawn
    startX, 
    // x position where the resistor should end
    endX, 
    // y position where the resistor should be drawn
    y) {
        this.r = r;
        this.g = g;
        this.startX = startX;
        this.endX = endX;
        this.y = y;
        this.height = 30;
        this.width = endX - startX;
        this.draw();
    }
    Resistor1.prototype.draw = function () {
        // DRAW THE LEFT WIRE
        this.g.beginPath();
        this.g.moveTo(this.startX, this.y);
        this.g.lineTo(this.startX + this.width / 4, this.y);
        this.g.stroke();
        // DRAW THE RESISTOR BODY
        var bodyX = this.startX + this.width / 4;
        var bodyY = this.y - this.height / 2;
        var bodyWidth = this.width / 2;
        var bodyHeight = this.height;
        this.g.beginPath();
        this.g.rect(bodyX, bodyY, bodyWidth, bodyHeight);
        this.g.stroke();
        // DRAW THE RIGHT WIRE
        this.g.beginPath();
        this.g.moveTo(this.startX + 3 * this.width / 4, this.y);
        this.g.lineTo(this.endX, this.y);
        this.g.stroke();
        this.g.fillText(this.r + " Ω", bodyX + bodyWidth / 2.5, bodyY + bodyHeight / 2 + 3);
    };
    return Resistor1;
}());
