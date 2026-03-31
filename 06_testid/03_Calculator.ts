class Calculator {
    protected panel: string = "";

    pressButton(b: string): void {
        const operators = ["+", "-", "*", "/"];
        const lastChar = this.panel[this.panel.length - 1];

        if (b === "C") {
            this.panel = "";
            return;
        }

        if (this.panel === "Error") {
            this.panel = "";
        }

        if (b === "=") {
            if (this.panel === "") return;
            if (operators.includes(lastChar)) return;

            try {
                const result = new Function(`return ${this.panel}`)();

                if (result === Infinity || result === -Infinity) {
                    this.panel = "Error";
                } else {
                    this.panel = String(result);
                }
            } catch {
                this.panel = "Error";
            }
            return;
        }

        if (operators.includes(b)) {
            if (this.panel === "") return;
            if (operators.includes(lastChar)) return;
        }

        this.panel += b;
    }

    getPanelContent(): string {
        return this.panel;
    }
}

(window as any).Calculator = Calculator;