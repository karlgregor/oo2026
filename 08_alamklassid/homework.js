var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PaymentMethod = /** @class */ (function () {
    function PaymentMethod() {
    }
    PaymentMethod.prototype.printType = function () {
        console.log("Generic payment method");
    };
    return PaymentMethod;
}());
var CardPayment = /** @class */ (function (_super) {
    __extends(CardPayment, _super);
    function CardPayment(cardNumber, holderName) {
        var _this = _super.call(this) || this;
        _this.cardNumber = cardNumber;
        _this.holderName = holderName;
        return _this;
    }
    CardPayment.prototype.validate = function () {
        return this.cardNumber.length >= 15 && this.cardNumber.length <= 16;
    };
    CardPayment.prototype.getCardType = function () {
        var num = this.cardNumber;
        if (num.startsWith("4")) {
            return "Visa";
        }
        var firstTwo = parseInt(num.slice(0, 2));
        var firstSix = parseInt(num.slice(0, 6));
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
    };
    CardPayment.prototype.pay = function (amount) {
        if (!this.validate()) {
            throw new Error("Invalid card number.");
        }
        var type = this.getCardType();
        console.log("".concat(this.holderName, " paid ").concat(amount, "\u20AC with ").concat(type, " card"));
    };
    CardPayment.prototype.printCardInfo = function () {
        var type = this.getCardType();
        console.log("Card holder: ".concat(this.holderName, ", card: ").concat(this.cardNumber, ", type: ").concat(type));
    };
    return CardPayment;
}(PaymentMethod));
var CashPayment = /** @class */ (function (_super) {
    __extends(CashPayment, _super);
    function CashPayment(availableMoney) {
        var _this = _super.call(this) || this;
        _this.availableMoney = availableMoney;
        return _this;
    }
    CashPayment.prototype.validate = function () {
        return this.availableMoney > 0;
    };
    CashPayment.prototype.pay = function (amount) {
        if (!this.validate()) {
            throw new Error("No cash available.");
        }
        if (amount > this.availableMoney) {
            throw new Error("Not enough cash.");
        }
        this.availableMoney -= amount;
        console.log("Cash payment completed: ".concat(amount, "\u20AC"));
    };
    CashPayment.prototype.printCashLeft = function () {
        console.log("Cash left: ".concat(this.availableMoney, "\u20AC"));
    };
    return CashPayment;
}(PaymentMethod));
var OnlinePayment = /** @class */ (function (_super) {
    __extends(OnlinePayment, _super);
    function OnlinePayment(accountId) {
        var _this = _super.call(this) || this;
        _this.accountId = accountId;
        return _this;
    }
    OnlinePayment.prototype.printAccount = function () {
        console.log("Account ID: ".concat(this.accountId));
    };
    return OnlinePayment;
}(PaymentMethod));
var PayPalPayment = /** @class */ (function (_super) {
    __extends(PayPalPayment, _super);
    function PayPalPayment(accountId, email) {
        var _this = _super.call(this, accountId) || this;
        _this.email = email;
        return _this;
    }
    PayPalPayment.prototype.validate = function () {
        return this.email.includes("@");
    };
    PayPalPayment.prototype.pay = function (amount) {
        if (!this.validate()) {
            throw new Error("Invalid PayPal email.");
        }
        console.log("Paid ".concat(amount, "\u20AC using PayPal account ").concat(this.email));
    };
    return PayPalPayment;
}(OnlinePayment));
var CryptoPayment = /** @class */ (function (_super) {
    __extends(CryptoPayment, _super);
    function CryptoPayment(accountId, walletAddress) {
        var _this = _super.call(this, accountId) || this;
        _this.walletAddress = walletAddress;
        return _this;
    }
    CryptoPayment.prototype.validate = function () {
        return this.walletAddress.length > 10;
    };
    CryptoPayment.prototype.pay = function (amount) {
        if (!this.validate()) {
            throw new Error("Invalid crypto wallet address.");
        }
        console.log("Paid ".concat(amount, "\u20AC using crypto wallet ").concat(this.walletAddress));
    };
    return CryptoPayment;
}(OnlinePayment));
var card1 = new CardPayment("4043599734026677", "Karl");
console.log(card1.validate());
card1.printCardInfo();
card1.pay(50);
var cash1 = new CashPayment(100);
console.log(cash1.validate());
cash1.pay(25);
cash1.printCashLeft();
var paypal1 = new PayPalPayment("PP1", "user@email.com");
paypal1.printAccount();
console.log("PayPal valid: " + paypal1.validate());
paypal1.pay(35);
var crypto1 = new CryptoPayment("CR1", "bc1qwq2yyujp8hu3va7m8w90dsualxqvh7s99cf6qq");
crypto1.printAccount();
console.log("Crypto valid: " + crypto1.validate());
crypto1.pay(70);
