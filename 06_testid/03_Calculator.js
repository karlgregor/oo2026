var Calculator = /** @class */ (function () {
    function Calculator() {
        this.panel = "";
    }
    Calculator.prototype.pressButton = function (b) {
        var operators = ["+", "-", "*", "/"];
        var lastChar = this.panel[this.panel.length - 1];
        if (b === "C") {
            this.panel = "";
            return;
        }
        if (this.panel === "Error") {
            this.panel = "";
        }
        if (b === "=") {
            if (this.panel === "")
                return;
            if (operators.includes(lastChar))
                return;
            try {
                var result = new Function("return ".concat(this.panel))();
                if (result === Infinity || result === -Infinity) {
                    this.panel = "Error";
                }
                else {
                    this.panel = String(result);
                }
            }
            catch (_a) {
                this.panel = "Error";
            }
            return;
        }
        if (operators.includes(b)) {
            if (this.panel === "")
                return;
            if (operators.includes(lastChar))
                return;
        }
        this.panel += b;
    };
    Calculator.prototype.getPanelContent = function () {
        return this.panel;
    };
    return Calculator;
}());
window.Calculator = Calculator;
