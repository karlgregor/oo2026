// dailyPrices – electricity prices in cents (24 hours) for 02-10-2026
// Data is from https://elektrihind.ee/api/stock_price_daily.php

var dailyPrices = [
    14.88, 14.65, 15.47, 16.19, 13.66, 13.51,
    13.34, 18.61, 23.93, 37.20, 40.18, 31.99,
    33.57, 32.34, 25.54, 22.98, 21.68, 27.25,
    35.83, 41.78, 28.89, 20.36, 18.6, 13.78
];

// hoursOfUsage - User set amount of hours of electricity usage
// Used to calculate the cheapest hours for electricity usage

let hoursOfUsage = 3;

// findCheapestHour - Function that finds the cheapest hour of electricity
// Takes 24 hours of electricity prices and returns the hour of the day with the cheapest price + the price of that hour

function findCheapestHour(prices: number[]): { hour: number, price: number } {
    var cheapestPrice = prices[0];
    var cheapestHour = 0;

    // iterate through all hours
    for (var i = 1; i < prices.length; i++) {
        // if we find a cheaper price
        if (prices[i] < cheapestPrice) {
            cheapestPrice = prices[i];
            cheapestHour = i;
        }
    }

    // return the hour (0–23) and the price
    return { hour: cheapestHour, price: cheapestPrice };
}

// findCheapestHours - Function that finds the cheapest hours of electricity from the given data
// The amount of hours is given by the user and the function returns an array of hours + the average price of the given cheapest hours
function findCheapestHours(prices: number[], hours: number): { hours: number[], averagePrice: number } {
    var cheapestStartHour = 0;
    var cheapestSum = Infinity;

    // iterate through all possible start hours
    for (var i = 0; i <= prices.length - hours; i++) {
        var sum = 0;

        // add the prices of the consecutive hours
        for (var j = 0; j < hours; j++) {
            sum += prices[i + j];
        }

        // check if this is the cheapest sum
        if (sum < cheapestSum) {
            cheapestSum = sum;
            cheapestStartHour = i;
        }
    }

    // return the hours (e.g. ['03:00', '04:00', '05:00'])
    var result: number[] = [];
    for (var k = 0; k < hours; k++) {
        result.push(cheapestStartHour + k);
    }

    // return the average price of the given cheapest hours
    var averagePrice = cheapestSum / hours;

    return { hours: result, averagePrice };
}

// Run + outputs
console.log("Cheapest single hour:", findCheapestHour(dailyPrices).hour + ":00", "with the price of", findCheapestHour(dailyPrices).price, "cents per kWh");

var cheapestHours = findCheapestHours(dailyPrices, hoursOfUsage);
console.log("Cheapest", hoursOfUsage, "hours:", cheapestHours.hours.map(h => h + ":00"), "with the average price of", cheapestHours.averagePrice.toFixed(2), "cents per kWh");
