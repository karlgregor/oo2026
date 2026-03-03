// Car class - represents a single car with properties and methods to update its position and draw itself on the canvas.
var Car = /** @class */ (function () {
    // Constructor initializes the car's position, color, and speed.
    function Car(x, y, color, speed) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 30;
        this.color = color;
        this.speed = speed;
    }
    // Update method moves the car to the right based on its speed and resets its position when it goes off the canvas.
    Car.prototype.update = function (canvasWidth) {
        this.x += this.speed;
        if (this.x > canvasWidth) {
            this.x = -this.width;
        }
    };
    // Draw method renders the car on the canvas using its properties.
    Car.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x + 15, this.y + this.height, 6, 0, Math.PI * 2);
        ctx.arc(this.x + 45, this.y + this.height, 6, 0, Math.PI * 2);
        ctx.fill();
    };
    return Car;
}());
// CarManager class - manages multiple cars, allowing us to add new cars, update their positions, and draw them on the canvas.
var CarManager = /** @class */ (function () {
    function CarManager() {
        this.cars = [];
    }
    // Method to add a new car to the manager.
    CarManager.prototype.addCar = function (car) {
        this.cars.push(car);
    };
    // Update method iterates through all cars and updates their positions.
    CarManager.prototype.updateAll = function (canvasWidth) {
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var car = _a[_i];
            car.update(canvasWidth);
        }
    };
    // Draw method iterates through all cars and draws them on the canvas.
    CarManager.prototype.drawAll = function (ctx) {
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var car = _a[_i];
            car.draw(ctx);
        }
    };
    return CarManager;
}());
// Main function - initializes the canvas, sets up the event listener for the button, and starts the animation loop.
function main() {
    var canvas = document.getElementById("carCanvas");
    var ctx = canvas.getContext("2d");
    var button = document.getElementById("addCarBtn");
    // Check if the 2D context is available before proceeding.
    if (!ctx) {
        console.error("2D context puudub.");
        return;
    }
    // Create an instance of CarManager to manage our cars.
    var manager = new CarManager();
    // Animate function - clears the canvas, updates all cars, and redraws them in a loop using requestAnimationFrame.
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        manager.updateAll(canvas.width);
        manager.drawAll(ctx);
        requestAnimationFrame(animate);
    }
    // Event listener for the button to add a new car with random properties when clicked.
    button.addEventListener("click", function () {
        var randomY = Math.random() * 300 + 20;
        var randomSpeed = Math.random() * 8 + 2;
        var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        var newCar = new Car(-60, randomY, randomColor, randomSpeed);
        manager.addCar(newCar);
    });
    animate();
}
window.onload = main;
