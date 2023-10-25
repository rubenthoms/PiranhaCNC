import electronStore from "@utils/electronStore";
import { SettingsState } from "./types";
import { DriverOptionsMap } from "@root/electron/src/drivers/DriverFactory";

const cncDriver = electronStore.get("settings.cncDriver");
const cncDriverOptions = electronStore.get("settings.cncDriverOptions");

const initialSettingsState: SettingsState = {
    cncDriver: (cncDriver as string) ?? "",
    cncDriverOptions: (cncDriverOptions as DriverOptionsMap[keyof DriverOptionsMap]) ?? {
        port: "",
        baudRate: 115200
    }
};

export default {
    settings: initialSettingsState
};
