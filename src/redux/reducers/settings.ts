import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

import electronStore from "@utils/electronStore";

import initialState from "@redux/initialState";
import { DriverOptionsMap } from "@root/electron/src/drivers/DriverFactory";

export type SettingsState = typeof initialState.settings;

export const settingsSlice = createSlice({
    name: "settings",
    initialState: initialState.settings,
    reducers: {
        setController<T extends keyof DriverOptionsMap>(
            c: Draft<SettingsState>,
            action: PayloadAction<{ driverName: T; driverOptions: DriverOptionsMap[T] }>
        ) {
            c.cncDriver = action.payload.driverName;
            c.cncDriverOptions = action.payload.driverOptions;

            electronStore.set("settings.cncDriver", c.cncDriver);
            electronStore.set("settings.cncDriverOptions", c.cncDriverOptions);
        }
    }
});

export const { setController } = settingsSlice.actions;
export default settingsSlice.reducer;
