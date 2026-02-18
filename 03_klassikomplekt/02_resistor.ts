class Resistor1 {
        protected width: number;
        protected height: number = 30;

        constructor(
            protected r: number,
            protected g: CanvasRenderingContext2D,
            // x position where the resistor should be drawn
            protected startX: number,
            // x position where the resistor should end
            protected endX: number,
            // y position where the resistor should be drawn
            protected y: number
        ) {
            this.width = endX - startX;
            this.draw();
        }

        draw() {
            // DRAW THE LEFT WIRE
            this.g.beginPath();
            this.g.moveTo(this.startX, this.y);
            this.g.lineTo(this.startX + this.width / 4, this.y);
            this.g.stroke();

            // DRAW THE RESISTOR BODY
            const bodyX = this.startX + this.width / 4;
            const bodyY = this.y - this.height / 2;
            const bodyWidth = this.width / 2;
            const bodyHeight = this.height;

            this.g.beginPath();
            this.g.rect(bodyX, bodyY, bodyWidth, bodyHeight);
            this.g.stroke();

            // DRAW THE RIGHT WIRE
            this.g.beginPath();
            this.g.moveTo(this.startX + 3 * this.width / 4, this.y);
            this.g.lineTo(this.endX, this.y);
            this.g.stroke();

            this.g.fillText(this.r + " Ω", bodyX + bodyWidth / 2.5, bodyY + bodyHeight / 2 + 3);
        }

}