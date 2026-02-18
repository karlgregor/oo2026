class Resistor {
    protected r: number;
    protected g: CanvasRenderingContext2D;

    constructor(r: number, g: CanvasRenderingContext2D) {
        this.r = r;
        this.g = g;
        this.draw();
    }

    draw() {
        this.g.beginPath();

        this.g.rect(10, 10, 80, 30);
        this.g.stroke();

        this.g.strokeText(this.r.toString(), 50, 30);
    }
}