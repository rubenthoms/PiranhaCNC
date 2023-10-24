import { Logger } from "../lib/Logger";
import { PublishSubscribeBroker } from "../lib/PublishSubscribeBroker";

export enum OperatingState {
    Idle,
    Running,
    Paused,
    Stopped,
    Error,
    Homing,
    Jogging,
    Unknown
}

export enum ConnectionState {
    Disconnected,
    Connecting,
    Connected
}

export enum CncDriverEvent {
    OperatingStateChanged = "operatingStateChanged",
    ConnectionStateChanged = "connectionStateChanged"
}

export interface CncDriverEvents {
    [CncDriverEvent.OperatingStateChanged]: OperatingState;
    [CncDriverEvent.ConnectionStateChanged]: ConnectionState;
}

export interface CncDriverOptions {}

export class CncDriver extends PublishSubscribeBroker<CncDriverEvents> {
    protected _type = "CncDriver";
    protected _logger: Logger = new Logger(this._type);

    private _operatingState: OperatingState = OperatingState.Unknown;
    private _connectionState: ConnectionState = ConnectionState.Disconnected;

    constructor() {
        super();
    }

    type(): string {
        return this._type;
    }

    operatingState(): OperatingState {
        return this._operatingState;
    }

    connectionState(): ConnectionState {
        return this._connectionState;
    }

    connect() {
        console.log("connect");
    }

    disconnect() {
        console.log("disconnect");
    }
}
