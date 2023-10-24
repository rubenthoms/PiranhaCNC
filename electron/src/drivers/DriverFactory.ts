import { GrblDriver, GrblDriverOptions } from "./grbl/grblDriver";

export interface DriverOptionsMap {
    ["Grbl"]: GrblDriverOptions;
}

export class DriverFactory {
    private constructor() {}

    static createDriver<T extends keyof DriverOptionsMap>(driverName: T, options: DriverOptionsMap[T]) {
        switch (driverName) {
            case "Grbl":
                return new GrblDriver(options);
            default:
                throw new Error("Driver not found");
        }
    }
}
