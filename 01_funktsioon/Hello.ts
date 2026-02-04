let message: string = "Hello world.";
console.log(message);

// Create variable for your name and another one for age. Then in the console print name.

let firstName: string = "Karl-Gregor";
let age: number = 18;

console.log("My name is " + firstName + " and my age is " + age + ".");

if (age <= 7) {
    console.log("You can go for free.");
} else {
    console.log("You need to pay for a ticket.");

    if (age <= 16) {
        console.log("Youth ticket")
    } else {
        console.log("Adult ticket")
    }
}

let symbols: string[] = []; // empty array

for (let nr = 0; nr < age; nr++) {
    symbols.push("*");
}

console.log(symbols.join(""));
