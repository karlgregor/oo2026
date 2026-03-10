interface Adder {
    // This method takes a number and adds to something.
    add(nr: number): void;

    // This method returns the current sum.
    getSum(): number,
}
class SimpleAdder implements Adder {
    protected sum: number = 0;

    add(nr: number): void {
        this.sum += nr;
    }
    
    getSum(): number {
        return this.sum;
    }
}

let adder1: Adder = new SimpleAdder();

//adder1.add(5);
//console.log(adder1.getSum()); // Output: 5

class CharCounter {
    // The constructor receives an Adder object and stores it inside the class.
    constructor(protected adder: Adder) {}

    addWordCharacters(word: string): void {
        // This method takes a word, counts the number of characters in it, and adds that number to the Adder object.
        const charCount = word.length;
        this.adder.add(charCount);
    }

    getCharacterCount(): number {
        // This method returns the current character count from the Adder object.
        return this.adder.getSum();
    }
}

let counter1: CharCounter = new CharCounter(adder1);

counter1.addWordCharacters("Good morning!");
console.log(counter1.getCharacterCount());