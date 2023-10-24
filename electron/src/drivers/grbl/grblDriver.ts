import { CncDriver, CncDriverOptions } from "../CncDriver";
import { SerialConnection, SerialConnectionEvent } from "../../lib/SerialConnection";

export interface GrblDriverOptions extends CncDriverOptions {
    port: string;
    baudRate: number;
    rtscts: boolean;
    pin: number;
}

function writeFilter(data: string) {
    return data;
}

export class GrblDriver extends CncDriver {
    protected _type = "GrblDriver";
    private _serialConnection: SerialConnection;

    constructor(options: GrblDriverOptions) {
        super();
        this._serialConnection = new SerialConnection({
            path: options.port,
            baudRate: options.baudRate,
            rtscts: options.rtscts,
            writeFilter
        });
        this._logger.info(`Created GrblDriver with options: ${JSON.stringify(options)}`);

        this._serialConnection.subscribe(SerialConnectionEvent.Data, (data) => {
            this._logger.info(`Received data: ${data}`);
        });

        this._serialConnection.subscribe(SerialConnectionEvent.Error, (error) => {
            this._logger.error(`Serial connection error: ${error}`);
        });

        this._serialConnection.subscribe(SerialConnectionEvent.Open, () => {
            this._logger.info(`Serial connection opened`);
        });

        this._serialConnection.subscribe(SerialConnectionEvent.Close, () => {
            this._logger.info(`Serial connection closed`);
        });

        this._serialConnection.open();
    }

    async connect() {
        await this._serialConnection.open();
    }
}
