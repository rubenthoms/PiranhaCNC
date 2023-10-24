import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Theme } from "./Theme";

const container = document.getElementById("root");

if (!container) {
    throw new Error("Could not find root container");
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Theme>
            <App />
        </Theme>
    </React.StrictMode>
);
