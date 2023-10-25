export type SettingsState = {
    cncDriver: string;
    cncDriverOptions: {
        port: string;
        baudRate: number;
    };
};
