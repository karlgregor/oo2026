export class IDCode {
    constructor(protected code: string) {}

    gender() {
        return parseInt(this.code[0]) % 2 === 0 ? "female" : "male";
    }
}