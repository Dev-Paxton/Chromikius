declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string;
            BOT_ID: string;
            DEV_BOT_TOKEN: string;
            DEV_BOT_ID: string;
            ENVIROMENT: "dev" | "prod";
        }
    }
}

export {}