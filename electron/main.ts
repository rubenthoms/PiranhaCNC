// Native
import path from "path";

// Packages
import { BrowserWindow, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import { SerialPort } from "serialport";
import { PortInfo } from "@serialport/bindings-interface";

import { MainController } from "./src/MainController";
import { DriverOptionsMap } from "./src/drivers/DriverFactory";

const height = 600;
const width = 800;

if (app) {
    require("electron-watch")(
        __dirname,
        "dev", // npm scripts, means: npm run dev:electron-main
        path.join(__dirname, "../"), // cwd
        2000 // debounce delay
    );
}

class Main {
    private _mainWindow: BrowserWindow | null = null;
    private _mainController = new MainController();

    constructor() {}

    initAppHandlers() {
        app.on("ready", this.handleAppReady.bind(this));
        app.on("window-all-closed", this.onWindowAllClosed.bind(this));
        app.on("activate", this.onActivate.bind(this));
    }

    private handleAppReady() {
        this.createWindow();
        this.initMainWindowIpcHandlers();
        this.initMainControllerIpcHandlers();
    }

    private initMainWindowIpcHandlers() {
        ipcMain.on("minimize", () => {
            this._mainWindow?.isMinimized() ? this._mainWindow.restore() : this._mainWindow?.minimize();
        });
        ipcMain.on("maximize", () => {
            this._mainWindow?.isMaximized() ? this._mainWindow.restore() : this._mainWindow?.maximize();
        });
        ipcMain.on("close", () => {
            this._mainWindow?.close();
        });
    }

    private initMainControllerIpcHandlers() {
        ipcMain.handle("dialog:openFile", async () => {
            // const result = await dialog.showOpenDialog(window, {
            //     properties: ["openFile"]
            // });
            // if (!result.canceled) {
            //     mainController.openFile(result.filePaths[0]);
            // }
        });

        ipcMain.handle(
            "mainController:setCncDriver",
            <T extends keyof DriverOptionsMap>(_: any, cncDriverName: T, options: DriverOptionsMap[T]) => {
                return this._mainController.setCncDriver(cncDriverName, options);
            }
        );

        ipcMain.handle("serialPort:getAvailableSerialPorts", async (): Promise<PortInfo[]> => {
            const ports = await SerialPort.list();
            console.log(ports);
            return ports;
        });
    }

    private createWindow() {
        this._mainWindow = new BrowserWindow({
            width,
            height,
            //  change to false to use AppBar
            frame: false,
            show: true,
            resizable: true,
            fullscreenable: true,
            webPreferences: {
                preload: path.join(__dirname, "preload.js")
            }
        });

        const port = process.env.PORT || 3000;
        const url = isDev ? `http://localhost:${port}` : path.join(__dirname, "../src/out/index.html");

        if (isDev) {
            this._mainWindow.loadURL(url);
            this._mainWindow.webContents.openDevTools();
        } else {
            this._mainWindow.loadFile(url);
        }
    }

    private onWindowAllClosed() {
        if (process.platform !== "darwin") {
            app.quit();
        }
    }

    private onActivate() {
        if (!this._mainWindow) {
            this.createWindow();
        }
    }
}

const main = new Main();
main.initAppHandlers();
