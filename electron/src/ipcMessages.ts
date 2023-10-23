import { BrowserWindow, ipcMain } from "electron";

export const initIpc = () => {
    ipcMain.on("inspect-element", async (_, x: number, y: number) => {
        const window = BrowserWindow.getFocusedWindow();
        if (window) {
            window.webContents.openDevTools();
            window.webContents.inspectElement(x, y);
        }
    });
};
