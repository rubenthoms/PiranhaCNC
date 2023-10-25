import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { UserConfig, ConfigEnv } from "vite";
import path, { join } from "path";

import aliases from "./aliases.json";

const srcRoot = join(__dirname, "src");

export default ({ command }: ConfigEnv): UserConfig => {
    // DEV
    if (command === "serve") {
        return {
            root: srcRoot,
            base: "/",
            plugins: [react(), svgr()],
            resolve: {
                alias: Object.keys(aliases.compilerOptions.paths).reduce(
                    (prev, current) => ({
                        ...prev,
                        [current.replace("/*", "")]: path.resolve(
                            __dirname,
                            aliases.compilerOptions.paths[current][0].replace("/*", "")
                        )
                    }),
                    {}
                )
            },
            build: {
                outDir: join(srcRoot, "/out"),
                emptyOutDir: true,
                rollupOptions: {}
            },
            server: {
                port: process.env.PORT === undefined ? 3000 : +process.env.PORT
            },
            optimizeDeps: {
                exclude: ["path"]
            }
        };
    }
    // PROD
    return {
        root: srcRoot,
        base: "./",
        plugins: [react()],
        resolve: {
            alias: {
                "/@": srcRoot
            }
        },
        build: {
            outDir: join(srcRoot, "/out"),
            emptyOutDir: true,
            rollupOptions: {}
        },
        server: {
            port: process.env.PORT === undefined ? 3000 : +process.env.PORT
        },
        optimizeDeps: {
            exclude: ["path"]
        }
    };
};
