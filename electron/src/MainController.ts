import { CncDriver } from "./drivers/CncDriver";
import { DriverFactory, DriverOptionsMap } from "./drivers/DriverFactory";

export class MainController {
    private _cncDriver: CncDriver | null = null;

    constructor() {}

    setCncDriver<T extends keyof DriverOptionsMap>(cncDriver: T, options: DriverOptionsMap[T]): boolean {
        try {
            this._cncDriver = DriverFactory.createDriver(cncDriver, options);
            return true;
        } catch (e) {
            return false;
        }
    }

    getCncDriver(): CncDriver {
        if (!this._cncDriver) {
            throw new Error("CncDriver not initialized");
        }

        return this._cncDriver;
    }
}
