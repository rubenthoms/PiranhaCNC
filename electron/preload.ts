import { ipcRenderer, contextBridge } from "electron";
import { SerialPort } from "serialport";
import { PortInfo } from "@serialport/bindings-interface";

import { DriverOptionsMap } from "./src/drivers/DriverFactory";

declare global {
    interface Window {
        Main: typeof api;
        ipcRenderer: typeof ipcRenderer;
        serialPort: typeof SerialPort;
    }
}

const api = {
    /**
     * Here you can expose functions to the renderer process
     * so they can interact with the main (electron) side
     * without security problems.
     */
    openFile: () => {
        ipcRenderer.invoke("dialog:openFile");
    },
    getAvailableSerialPorts: (): Promise<PortInfo[]> => {
        return SerialPort.list();
    },
    setCncDriver: <T extends keyof DriverOptionsMap>(cncDriverName: T, options: DriverOptionsMap[T]) => {
        ipcRenderer.send("set-cnc-driver", cncDriverName, options);
    },
    /**
    Here function for AppBar
   */
    Minimize: () => {
        ipcRenderer.send("minimize");
    },
    Maximize: () => {
        ipcRenderer.send("maximize");
    },
    Close: () => {
        ipcRenderer.send("close");
    },
    /**
     * Provide an easier way to listen to events
     */
    on: (channel: string, callback: (data: any) => void) => {
        ipcRenderer.on(channel, (_, data) => callback(data));
    }
};
contextBridge.exposeInMainWorld("Main", api);
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);

contextBridge.exposeInMainWorld("serialPort", SerialPort);
