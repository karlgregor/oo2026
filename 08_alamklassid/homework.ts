abstract class PaymentMethod {
    abstract validate(): boolean;
    abstract pay(amount: number): void;

    printType(): void {
        console.log("Generic payment method");
    }
}

class CardPayment extends PaymentMethod {
    cardNumber: string;
    holderName: string;

    constructor(cardNumber: string, holderName: string) {
        super();
        this.cardNumber = cardNumber;
        this.holderName = holderName;
    }

    validate(): boolean {
        return this.cardNumber.length >= 15 && this.cardNumber.length <= 16;
    }

    getCardType(): string {
        const num = this.cardNumber;

        if (num.startsWith("4")) {
            return "Visa";
        }

        const firstTwo = parseInt(num.slice(0, 2));
        const firstSix = parseInt(num.slice(0, 6));

        if ((firstTwo >= 51 && firstTwo <= 55) ||
            (firstSix >= 222100 && firstSix <= 272099)) {
            return "MasterCard";
        }

        if (num.startsWith("34") || num.startsWith("37")) {
            return "American Express";
        }

        if (num.startsWith("6011")) {
            return "Discover";
        }

        return "Unknown";
    }

    pay(amount: number): void {
        if (!this.validate()) {
            throw new Error("Invalid card number.");
        }

        const type = this.getCardType();

        console.log(`${this.holderName} paid ${amount}€ with ${type} card`);
    }

    printCardInfo(): void {
        const type = this.getCardType();
        console.log(`Card holder: ${this.holderName}, card: ${this.cardNumber}, type: ${type}`);
    }
}

class CashPayment extends PaymentMethod {
    availableMoney: number;

    constructor(availableMoney: number) {
        super();
        this.availableMoney = availableMoney;
    }

    validate(): boolean {
        return this.availableMoney > 0;
    }

    pay(amount: number): void {
        if (!this.validate()) {
            throw new Error("No cash available.");
        }

        if (amount > this.availableMoney) {
            throw new Error("Not enough cash.");
        }

        this.availableMoney -= amount;
        console.log(`Cash payment completed: ${amount}€`);
    }

    printCashLeft(): void {
        console.log(`Cash left: ${this.availableMoney}€`);
    }
}

abstract class OnlinePayment extends PaymentMethod {
    accountId: string;

    constructor(accountId: string) {
        super();
        this.accountId = accountId;
    }

    printAccount(): void {
        console.log(`Account ID: ${this.accountId}`);
    }
}

class PayPalPayment extends OnlinePayment {
    email: string;

    constructor(accountId: string, email: string) {
        super(accountId);
        this.email = email;
    }

    validate(): boolean {
        return this.email.includes("@");
    }

    pay(amount: number): void {
        if (!this.validate()) {
            throw new Error("Invalid PayPal email.");
        }

        console.log(`Paid ${amount}€ using PayPal account ${this.email}`);
    }
}

class CryptoPayment extends OnlinePayment {
    walletAddress: string;

    constructor(accountId: string, walletAddress: string) {
        super(accountId);
        this.walletAddress = walletAddress;
    }

    validate(): boolean {
        return this.walletAddress.length > 10;
    }

    pay(amount: number): void {
        if (!this.validate()) {
            throw new Error("Invalid crypto wallet address.");
        }

        console.log(`Paid ${amount}€ using crypto wallet ${this.walletAddress}`);
    }
}

let card1: CardPayment = new CardPayment("4043599734026677", "Karl");
console.log(card1.validate());
card1.printCardInfo();
card1.pay(50);

let cash1: CashPayment = new CashPayment(100);
console.log(cash1.validate());
cash1.pay(25);
cash1.printCashLeft();

let paypal1: PayPalPayment = new PayPalPayment("PP1", "user@email.com");
paypal1.printAccount();
console.log("PayPal valid: " + paypal1.validate());
paypal1.pay(35);

let crypto1: CryptoPayment = new CryptoPayment("CR1", "bc1qwq2yyujp8hu3va7m8w90dsualxqvh7s99cf6qq");
crypto1.printAccount();
console.log("Crypto valid: " + crypto1.validate());
crypto1.pay(70);