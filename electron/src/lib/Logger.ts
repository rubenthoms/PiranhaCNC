import { app } from "electron";

export enum LogMessageType {
    Info,
    Warning,
    Error
}

export interface Log {
    type: LogMessageType;
    message: string;
    timestampMs: number;
}

export class Logger {
    private _log: Log[] = [];
    private _name: string;
    private _isDev: boolean;

    constructor(name: string) {
        this._name = name;
        this._isDev = !app.isPackaged;
    }

    consoleLogInDevMode() {
        if (this._isDev) {
            const lastLogEntry = this._log[this._log.length - 1];
            if (!lastLogEntry) {
                return;
            }
            console.log(
                `(${lastLogEntry.type}) [${this._name}] ${new Date(lastLogEntry.timestampMs).toUTCString()}: ${
                    lastLogEntry.message
                }`
            );
        }
    }

    info(message: string) {
        this._log.push({
            type: LogMessageType.Info,
            message,
            timestampMs: Date.now()
        });

        this.consoleLogInDevMode();
    }

    warning(message: string) {
        this._log.push({
            type: LogMessageType.Warning,
            message,
            timestampMs: Date.now()
        });

        this.consoleLogInDevMode();
    }

    error(message: string) {
        this._log.push({
            type: LogMessageType.Error,
            message,
            timestampMs: Date.now()
        });

        this.consoleLogInDevMode();
    }

    getLog(): Log[] {
        return this._log;
    }
}
