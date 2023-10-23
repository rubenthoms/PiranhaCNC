export class Driver {
    private _type: string = "Driver";

    constructor() {
        console.log("Driver constructor");
    }

    get type(): string {
        return this._type;
    }
}
