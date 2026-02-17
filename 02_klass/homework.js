var ParkingMachine = /** @class */ (function () {
    // Constructor to initialize the parking machine with name, price per hour, and open spots
    function ParkingMachine(name, pricePerHour, openSpots) {
        this.name = name;
        this.pricePerHour = pricePerHour;
        this.openSpots = openSpots;
    }
    // Method to calculate the price based on hours parked
    ParkingMachine.prototype.calculatePrice = function (hours) {
        return hours * this.pricePerHour;
    };
    // Method to check if parking is available at specific machine
    ParkingMachine.prototype.canPark = function () {
        if (this.openSpots > 0) {
            console.log("You can park at ".concat(this.name, "."));
        }
        else {
            console.log("No parking spots available at ".concat(this.name, "."));
        }
    };
    // Method to display the details of the parking machine
    ParkingMachine.prototype.show = function () {
        console.log("Machine: ".concat(this.name, ", Price per hour: ").concat(this.pricePerHour, "\u20AC, Open spots: ").concat(this.openSpots));
    };
    // Method to get the name of the parking machine
    ParkingMachine.prototype.getName = function () {
        return this.name;
    };
    return ParkingMachine;
}());
// Creating instances of ParkingMachine with different details
var cityCenterMachine = new ParkingMachine("City Center Parking", 2, 10);
var mallParkingMachine = new ParkingMachine("Shopping Mall Parking", 5, 50);
var hospitalParkingMachine = new ParkingMachine("Hospital Parking", 3, 0);
// Displaying the details of each parking machine
cityCenterMachine.show();
mallParkingMachine.show();
hospitalParkingMachine.show();
// Checking if parking is available at each machine
cityCenterMachine.canPark();
mallParkingMachine.canPark();
hospitalParkingMachine.canPark();
// Create an array to pass hours of several customers
var customers = [
    { name: "Marko", hours: 2 },
    { name: "David", hours: 5 },
    { name: "Eva", hours: 10 }
];
// Calculate and display the price for each customer at the city center parking machine
customers.forEach(function (customer) {
    var price = cityCenterMachine.calculatePrice(customer.hours);
    console.log("".concat(customer.name, " pays ").concat(price, "\u20AC at ").concat(cityCenterMachine.getName(), " for ").concat(customer.hours, " hours."));
});
