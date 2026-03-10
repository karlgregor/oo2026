var SimpleAdder = /** @class */ (function () {
    function SimpleAdder() {
        this.sum = 0;
    }
    SimpleAdder.prototype.add = function (nr) {
        this.sum += nr;
    };
    SimpleAdder.prototype.getSum = function () {
        return this.sum;
    };
    return SimpleAdder;
}());
var adder1 = new SimpleAdder();
//adder1.add(5);
//console.log(adder1.getSum()); // Output: 5
var CharCounter = /** @class */ (function () {
    // The constructor receives an Adder object and stores it inside the class.
    function CharCounter(adder) {
        this.adder = adder;
    }
    CharCounter.prototype.addWordCharacters = function (word) {
        // This method takes a word, counts the number of characters in it, and adds that number to the Adder object.
        var charCount = word.length;
        this.adder.add(charCount);
    };
    CharCounter.prototype.getCharacterCount = function () {
        // This method returns the current character count from the Adder object.
        return this.adder.getSum();
    };
    return CharCounter;
}());
var counter1 = new CharCounter(adder1);
counter1.addWordCharacters("Good morning!");
console.log(counter1.getCharacterCount());
