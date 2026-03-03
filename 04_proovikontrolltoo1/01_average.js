function average_of_3(number1, number2, number3) {
    return (number1 + number2 + number3) / 3;
}
console.log(average_of_3(100, 1529, 200));
function average_of_array(numbers) {
    var sum = 0;
    for (var i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum / numbers.length;
}
console.log(average_of_array([4, 6, 7]));
function average_of_array_2(numbers) {
    return numbers.reduce(function (sum, current) { return sum + current; }, 0) / numbers.length;
}
console.log(average_of_array_2([4, 6, 7]));
function sliding_average(numbers) {
    var out = [];
    for (var i = 0; i < numbers.length - 2; i++) {
        out.push(average_of_3(numbers[i], numbers[i + 1], numbers[i + 2]));
    }
    return out;
}
console.log(sliding_average([1, 2, 4, 6, 4, 7, 7, 5]));
function sliding_average_1(numbers, window_size) {
    if (window_size === void 0) { window_size = 2; }
    var out = [];
    for (var i = 0; i < numbers.length - window_size + 1; i++) {
        out.push(average_of_array(numbers.slice(i, i + window_size)));
    }
    return out;
}
console.log(sliding_average_1([1, 2, 4, 6, 4, 7, 7, 5]));
