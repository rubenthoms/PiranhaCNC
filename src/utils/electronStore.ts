import ElectronStore from "electron-store";
import { JSONSchemaType } from "ajv";

export type ElectronStoreSchema = {
    settings: {
        controllerSettings: {
            cncDriver: string;
            cncDriverOptions: {
                port: string;
                baudRate: number;
            };
        };
    };
};

const schema = {
    type: "object",
    settings: {
        type: "object",
        properties: {
            controllerSettings: {
                type: "object",
                properties: {
                    cncDriver: {
                        type: "string"
                    },
                    cncDriverOptions: {
                        type: "object",
                        properties: {
                            port: {
                                type: "string"
                            },
                            baudRate: {
                                type: "number"
                            }
                        },
                        required: ["port", "baudRate"],
                        additionalProperties: false
                    }
                },
                required: ["cncDriver", "cncDriverOptions"],
                additionalProperties: false
            }
        },
        additionalProperties: false,
        required: ["controllerSettings"]
    },
    additionalProperties: false,
    required: ["settings"]
};

const defaults = {
    settings: {
        controllerSettings: {
            cncDriver: "Grbl",
            cncDriverOptions: {
                port: "COM3",
                baudRate: 115200
            }
        }
    }
};

const electronStore = new ElectronStore({
    // @ts-ignore
    schema,
    defaults
});

export default electronStore;
