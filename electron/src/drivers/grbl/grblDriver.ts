import { SerialPort } from "serialport";

/*
const DATABITS = Object.freeze([5, 6, 7, 8]);
const STOPBITS = Object.freeze([1, 2]);
const PARITY = Object.freeze(["none", "even", "mark", "odd", "space"]);
const FLOWCONTROLS = Object.freeze(["rtscts", "xon", "xoff", "xany"]);

const defaultSettings = Object.freeze({
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    parity: "none",
    rtscts: false,
    xon: false,
    xoff: false,
    xany: false
});
*/

export class SerialConnection {
    private _port: SerialPort;

    constructor() {
        this._port = new SerialPort(
            {
                path: "/dev/ttyS3",
                baudRate: 115200
            },
            (err) => {
                if (err) {
                    console.error(err);
                }
            }
        );

        this._port.on("readable", () => {
            console.log("Data:", this._port.read());
        });
    }

    isOpen() {}

    open() {}

    close() {}

    write(data: string) {
        this._port.write(data, (err) => {
            if (err) {
                console.error(err);
            }

            console.log("Data written");
        });
    }
}

export class GrblDriver {}
