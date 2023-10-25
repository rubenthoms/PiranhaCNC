import { Button, Label, Select } from "flowbite-react";
import React from "react";
import type { PortInfo } from "@serialport/bindings-interface";

export const DriverSettings: React.FC = () => {
    const [connectionError, setConnectionError] = React.useState<string | null>(null);
    const [serialPorts, setSerialPorts] = React.useState<PortInfo[]>([]);
    const [settings, setSettings] = React.useState<{ port: string; baudRate: number }>({
        port: "",
        baudRate: 115200
    });

    React.useEffect(() => {
        window.Main.getAvailableSerialPorts().then((ports) => {
            setSerialPorts(ports);
            setSettings((prev) => ({
                ...prev,
                port: ports[0].path
            }));
        });
    }, []);

    function handleConnect() {
        window.Main.setCncDriver("Grbl", {
            ...settings,
            rtscts: true,
            pin: 1
        })
            .then(() => {})
            .catch((err) => {
                setConnectionError(err.message);
            });
    }

    return (
        <div className="p-4">
            <Label value="Serial Port" />
            <Select
                value={settings.port ?? "Test"}
                onChange={(e) => setSettings((prev) => ({ ...prev, port: e.target.value }))}
            >
                {serialPorts?.map((port) => (
                    <option value={port.path} key={port.path}>
                        {port.path} ({port.manufacturer})
                    </option>
                ))}
            </Select>
            <Label value="Baud Rate" />
            <Select
                value={settings.baudRate ?? 115200}
                onChange={(e) => setSettings((prev) => ({ ...prev, baudRate: parseInt(e.target.value, 10) }))}
            >
                <option value="300">300</option>
                <option value="1200">1200</option>
                <option value="9600">9600</option>
                <option value="14400">14400</option>
                <option value="19200">19200</option>
                <option value="38400">38400</option>
                <option value="57600">57600</option>
                <option value="115200">115200</option>
            </Select>
            <Button color="primary" onClick={handleConnect}>
                Connect
            </Button>
        </div>
    );
};

DriverSettings.displayName = "DriverSettings";
