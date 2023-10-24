import { Button, Label, Select } from "flowbite-react";
import React from "react";
import type { PortInfo } from "@serialport/bindings-interface";

export const DriverSettings: React.FC = () => {
    const [serialPorts, setSerialPorts] = React.useState<PortInfo[]>([]);
    const [selectedPort, setSelectedPort] = React.useState<string | null>(null);

    React.useEffect(() => {
        window.Main.getAvailableSerialPorts().then((ports) => {
            setSerialPorts(ports);
            setSelectedPort(ports[0]?.path ?? null);
        });
    }, []);

    function handleConnect() {
        if (selectedPort) {
            window.Main.setCncDriver("Grbl", {
                port: selectedPort,
                baudRate: 115200,
                rtscts: true,
                pin: 1
            });
        }
    }

    return (
        <div className="">
            <Label value="Serial Port" />
            <Select value={selectedPort ?? "Test"} onChange={(e) => setSelectedPort(e.target.value)}>
                {serialPorts?.map((port) => (
                    <option value={port.path} key={port.path}>
                        {port.path} ({port.manufacturer})
                    </option>
                ))}
            </Select>
            <Button color="primary" onClick={handleConnect}>
                Connect
            </Button>
        </div>
    );
};

DriverSettings.displayName = "DriverSettings";
