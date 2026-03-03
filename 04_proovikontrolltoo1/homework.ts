// Car class - represents a single car with properties and methods to update its position and draw itself on the canvas.
class Car {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private color: string;
    private speed: number;
    
    // Constructor initializes the car's position, color, and speed.
    constructor(x: number, y: number, color: string, speed: number) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 30;
        this.color = color;
        this.speed = speed;
    }
    
    // Update method moves the car to the right based on its speed and resets its position when it goes off the canvas.
    update(canvasWidth: number): void {
        this.x += this.speed;
        
        if (this.x > canvasWidth) {
            this.x = -this.width;
        }
    }
    
    // Draw method renders the car on the canvas using its properties.
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x + 15, this.y + this.height, 6, 0, Math.PI * 2);
        ctx.arc(this.x + 45, this.y + this.height, 6, 0, Math.PI * 2);
        ctx.fill();
    }
}

// CarManager class - manages multiple cars, allowing us to add new cars, update their positions, and draw them on the canvas.
class CarManager {
    private cars: Car[] = [];
    
    // Method to add a new car to the manager.
    addCar(car: Car): void {
        this.cars.push(car);
    }
    
    // Update method iterates through all cars and updates their positions.
    updateAll(canvasWidth: number): void {
        for (const car of this.cars) {
            car.update(canvasWidth);
        }
    }
    
    // Draw method iterates through all cars and draws them on the canvas.
    drawAll(ctx: CanvasRenderingContext2D): void {
        for (const car of this.cars) {
            car.draw(ctx);
        }
    }
}

// Main function - initializes the canvas, sets up the event listener for the button, and starts the animation loop.
function main(): void {
    const canvas = document.getElementById("carCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const button = document.getElementById("addCarBtn") as HTMLButtonElement;
    
    // Check if the 2D context is available before proceeding.
    if (!ctx) {
        console.error("2D context puudub.");
        return;
    }

    // Create an instance of CarManager to manage our cars.
    const manager = new CarManager();

    // Animate function - clears the canvas, updates all cars, and redraws them in a loop using requestAnimationFrame.
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        manager.updateAll(canvas.width);
        manager.drawAll(ctx);
        requestAnimationFrame(animate);
    }

    // Event listener for the button to add a new car with random properties when clicked.
    button.addEventListener("click", () => {
        const randomY = Math.random() * 300 + 20;
        const randomSpeed = Math.random() * 8 + 2;
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        const newCar = new Car(-60, randomY, randomColor, randomSpeed);
        manager.addCar(newCar);
    });

    animate();
}

window.onload = main;