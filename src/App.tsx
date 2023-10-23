import React, { useEffect, useState } from "react";
import AppBar from "./AppBar";

import { LoadingScreen } from "./LoadingScreen";
import { SerialConnection } from "../electron/src/drivers/grbl/grblDriver";

function App() {
    console.log(window.ipcRenderer);

    const [isOpen, setOpen] = useState(false);
    const [isSent, setSent] = useState(false);
    const [fromMain, setFromMain] = useState<string | null>(null);

    return (
        <div className="flex flex-col h-screen rounded bg-background">
            {window.Main && (
                <div className="flex-none">
                    <AppBar />
                </div>
            )}
            <div className="flex-auto">
                <LoadingScreen />
            </div>
        </div>
    );
}

export default App;
