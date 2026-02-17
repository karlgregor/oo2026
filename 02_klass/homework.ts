class ParkingMachine {
    // Constructor to initialize the parking machine with name, price per hour, and open spots
    constructor(private name: string, private pricePerHour: number, private openSpots: number) {}

    // Method to calculate the price based on hours parked
    calculatePrice(hours: number): number {
        return hours * this.pricePerHour;
    }

    // Method to check if parking is available at specific machine
    canPark(): void {
        if (this.openSpots > 0) {
            console.log(`You can park at ${this.name}.`);
        } else {
            console.log(`No parking spots available at ${this.name}.`);
        }
    }

    // Method to display the details of the parking machine
    show(): void {
        console.log(`Machine: ${this.name}, Price per hour: ${this.pricePerHour}€, Open spots: ${this.openSpots}`);
    }

    // Method to get the name of the parking machine
    getName(): string {
        return this.name;
    }
}

// Creating instances of ParkingMachine with different details
let cityCenterMachine = new ParkingMachine("City Center Parking", 2, 10);
let mallParkingMachine = new ParkingMachine("Shopping Mall Parking", 5, 50);
let hospitalParkingMachine = new ParkingMachine("Hospital Parking", 3, 0);

// Displaying the details of each parking machine
cityCenterMachine.show();
mallParkingMachine.show();
hospitalParkingMachine.show();

// Checking if parking is available at each machine
cityCenterMachine.canPark();
mallParkingMachine.canPark();
hospitalParkingMachine.canPark();

// Create an array to pass hours of several customers
let customers = [
    { name: "Marko", hours: 2 },
    { name: "David", hours: 5 },
    { name: "Eva", hours: 10 }
];

// Calculate and display the price for each customer at the city center parking machine
customers.forEach(customer => {
    let price = cityCenterMachine.calculatePrice(customer.hours);
    console.log(`${customer.name} pays ${price}€ at ${cityCenterMachine.getName()} for ${customer.hours} hours.`);
});
