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

    private _unsubscribeFunctionsMap: Map<string, () => void> = new Map();

    constructor(options: GrblDriverOptions) {
        super();
        this._serialConnection = new SerialConnection({
            path: options.port,
            baudRate: options.baudRate,
            rtscts: options.rtscts,
            writeFilter
        });
        this._logger.info(`Created GrblDriver with options: ${JSON.stringify(options)}`);

        const unsubscribeFromSerialConnectionData = this._serialConnection
            .getMessageBroker()
            .subscribe(SerialConnectionEvent.Data, (data) => {
                this._logger.info(`Received data: ${data}`);
            });

        this._unsubscribeFunctionsMap.set("data", unsubscribeFromSerialConnectionData);

        const unsubscribeFromSerialConnectionError = this._serialConnection
            .getMessageBroker()
            .subscribe(SerialConnectionEvent.Error, (error) => {
                this._logger.error(`Serial connection error: ${error}`);
            });

        this._unsubscribeFunctionsMap.set("error", unsubscribeFromSerialConnectionError);

        const unsubscribeFromSerialConnectionOpen = this._serialConnection
            .getMessageBroker()
            .subscribe(SerialConnectionEvent.Open, () => {
                this._logger.info(`Serial connection opened`);
            });

        this._unsubscribeFunctionsMap.set("open", unsubscribeFromSerialConnectionOpen);

        const unsubscribeFromSerialConnectionClose = this._serialConnection
            .getMessageBroker()
            .subscribe(SerialConnectionEvent.Close, () => {
                this._logger.info(`Serial connection closed`);
            });

        this._unsubscribeFunctionsMap.set("close", unsubscribeFromSerialConnectionClose);
    }

    async connect() {
        await this._serialConnection.open();
    }

    async disconnect() {
        await this._serialConnection.close();
    }

    destroy() {
        this._serialConnection.destroy();
    }
}
