import { ReadlineParser, SerialPort } from "serialport";
import { MessageBroker } from "./PublishSubscribeBroker";
import { Logger } from "./Logger";

export interface SerialConnectionSettings {
    path: string;
    baudRate?: number;
    dataBits?: 5 | 6 | 7 | 8;
    stopBits?: 1 | 2 | 1.5;
    parity?: "none" | "even" | "mark" | "odd" | "space";
    rtscts?: boolean;
    xon?: boolean;
    xoff?: boolean;
    xany?: boolean;
    writeFilter?: (data: string) => string;
}

const defaultSettings: Required<Omit<SerialConnectionSettings, "path">> = Object.freeze({
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    parity: "none",
    rtscts: false,
    xon: false,
    xoff: false,
    xany: false,
    writeFilter: (data: string) => data
});

export enum SerialConnectionEvent {
    Data = "data",
    Error = "error",
    Open = "open",
    Close = "close"
}

export interface SerialConnectionEvents {
    [SerialConnectionEvent.Data]: string;
    [SerialConnectionEvent.Error]: Error;
    [SerialConnectionEvent.Open]: null;
    [SerialConnectionEvent.Close]: null;
}

export class SerialConnection {
    private _settings: Required<SerialConnectionSettings>;
    private _port: SerialPort | null = null;
    private _parser: ReadlineParser | null = null;
    private _logger: Logger = new Logger("SerialConnection");
    private _messageBroker: MessageBroker<SerialConnectionEvents> = new MessageBroker();

    constructor(customSettings: SerialConnectionSettings) {
        this._settings = { ...defaultSettings, ...customSettings };

        this._logger.info(`Created SerialConnection with settings: ${JSON.stringify(this._settings)}`);
    }

    isOpen(): boolean {
        return this._port?.isOpen ?? false;
    }

    getMessageBroker() {
        return this._messageBroker;
    }

    async open() {
        return new Promise<null>((resolve) => {
            this._port = new SerialPort(
                {
                    ...this._settings,
                    autoOpen: false
                },
                (err) => {
                    if (err) {
                        console.error(err);
                    }
                }
            );

            this._parser = this._port.pipe(new ReadlineParser({ delimiter: "\n" }));
            this._parser.on("data", (data) => {
                this._messageBroker.publish(SerialConnectionEvent.Data, data);
            });

            this._port.on("error", (err) => {
                this._messageBroker.publish(SerialConnectionEvent.Error, err);
            });

            this._port.on("open", () => {
                resolve(null);
                this._messageBroker.publish(SerialConnectionEvent.Open, null);
            });

            this._port.on("close", () => {
                this._messageBroker.publish(SerialConnectionEvent.Close, null);
            });

            this._port.open();
        });
    }

    close() {
        if (!this._port) {
            this._logger.error("Port not open");
            return;
        }

        this._port.removeAllListeners("data");
        this._port.removeAllListeners("error");
        this._port.removeAllListeners("open");
        this._port.removeAllListeners("close");

        this._port?.close((err) => {
            if (err) {
                this._logger.error(err.message);
            }
        });

        this._port = null;
    }

    write(data: string) {
        if (!this._port) {
            this._logger.error("Port not open");
            return;
        }
        this._port.write(data, (err) => {
            if (err) {
                this._logger.error(err.message);
            }

            this._logger.info(`Data written: ${data}`);
        });
    }

    destroy() {
        this.close();
        this._parser = null;
    }
}
