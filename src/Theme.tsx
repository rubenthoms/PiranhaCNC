import React from "react";

import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";

export interface ThemeProps {
    children: React.ReactNode;
}

const theme: CustomFlowbiteTheme = {
    spinner: {
        color: {
            primary: "fill-secondary",
            secondary: "fill-primary"
        }
    },
    button: {
        color: {
            primary: "text-white bg-primary",
            secondary: "text-white bg-secondary",
            success: "text-white bg-success",
            danger: "text-white bg-danger",
            warning: "text-white bg-warning",
            info: "text-white bg-info",
            light: "text-white bg-light",
            dark: "text-white bg-dark",
            link: "text-primary bg-transparent"
        }
    },
    progress: {
        base: "w-full overflow-hidden rounded-full bg-secondary-200 dark:bg-gray-700",
        label: "mb-1 flex justify-between font-medium dark:text-onSecondary",
        bar: "rounded-full text-center font-medium leading-none bg-secondary dark:bg-secondary space-x-2",
        color: {
            primary: "bg-primary dark:bg-primary",
            secondary: "bg-secondary dark:bg-secondary",
            success: "bg-success dark:bg-success",
            danger: "bg-danger dark:bg-danger",
            warning: "bg-warning dark:bg-warning",
            info: "bg-info dark:bg-info",
            light: "bg-light dark:bg-light",
            dark: "bg-dark dark:bg-dark"
        }
    }
};

export const Theme: React.FC<ThemeProps> = (props) => {
    return <Flowbite theme={{ theme }}>{props.children}</Flowbite>;
};

Theme.displayName = "Theme";
