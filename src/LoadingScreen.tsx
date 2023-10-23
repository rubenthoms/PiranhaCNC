import React from "react";

import Logo from "./assets/piranha-cnc.svg?react";
import { Progress } from "flowbite-react";

export const LoadingScreen: React.FC = () => {
    const [progress, setProgress] = React.useState<number>(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="flex justify-center items-center flex-col h-full w-full">
            <Logo className="w-40 mx-auto my-8 text-primary" />
            <Progress progress={progress} className="w-40" color="secondary" />
        </div>
    );
};

LoadingScreen.displayName = "LoadingScreen";
