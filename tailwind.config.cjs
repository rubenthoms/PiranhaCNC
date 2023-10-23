module.exports = {
    content: ["./src/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            primary: {
                DEFAULT: "#1D5D9B",
                50: "#87B9E9",
                100: "#76AEE5",
                200: "#539ADF",
                300: "#3186D8",
                400: "#2372BD",
                500: "#1D5D9B",
                600: "#14416C",
                700: "#0B243C",
                800: "#02080D",
                900: "#000000",
                950: "#000000"
            },
            primaryVariant: {
                DEFAULT: "#75C2F6",
                50: "#FFFFFF",
                100: "#FFFFFF",
                200: "#E8F5FD",
                300: "#C2E4FB",
                400: "#9BD3F8",
                500: "#75C2F6",
                600: "#40ABF3",
                700: "#0F93EB",
                800: "#0C72B7",
                900: "#085182",
                950: "#074168"
            },
            secondary: {
                DEFAULT: "#F4D160",
                50: "#FFFFFF",
                100: "#FFFDF9",
                200: "#FCF2D2",
                300: "#F9E7AC",
                400: "#F7DC86",
                500: "#F4D160",
                600: "#F0C22C",
                700: "#D5A60F",
                800: "#A17D0B",
                900: "#6C5407",
                950: "#524006"
            },
            secondaryVariant: {
                DEFAULT: "#FBEEAC",
                50: "#FFFFFF",
                100: "#FFFFFF",
                200: "#FFFFFF",
                300: "#FFFEFA",
                400: "#FDF6D3",
                500: "#FBEEAC",
                600: "#F8E376",
                700: "#F6D841",
                800: "#F3CD0C",
                900: "#BDA009",
                950: "#A38908"
            },
            background: "#f7f7ff",
            surface: "#f7f7ff",
            error: "#e3170a",
            onPrimary: "#000000",
            onSecondary: "#000000",
            onBackground: "#0a0f0d",
            onSurface: "#0a0f0d",
            onError: "#ffffff"
        }
    },
    variants: {
        extend: {},
        fontFamily: {
            sans: ["Inter", "ui-sans-serif", "system-ui"]
        }
    },
    plugins: [require("flowbite/plugin")]
};
