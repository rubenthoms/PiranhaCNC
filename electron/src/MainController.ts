import { CncDriver } from "./drivers/CncDriver";
import { DriverFactory, DriverOptionsMap } from "./drivers/DriverFactory";

export class MainController {
    private _cncDriver: CncDriver | null = null;

    constructor() {}

    setCncDriver<T extends keyof DriverOptionsMap>(cncDriver: T, options: DriverOptionsMap[T]) {
        console.log("setCncDriver");
        this._cncDriver = DriverFactory.createDriver(cncDriver, options);
    }

    getCncDriver(): CncDriver {
        if (!this._cncDriver) {
            throw new Error("CncDriver not initialized");
        }

        return this._cncDriver;
    }
}
