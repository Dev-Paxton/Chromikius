import dotenv from "dotenv"
import config from "config"


interface DbSettings {
    host: string
    databaseName: string
    userName: string
    password: string
}

interface BotSettings {
    id: string
    token: string 
}

interface Config {
    database : DbSettings
    bot: BotSettings
}

export default class ConfigService {
    private static config : Config

    public static getConfig() {
        if(!this.config) this.config = this.loadConfig();

        return this.config;
    }

    private static loadConfig() : Config {
        dotenv.config()
        const database = { ...config.get("database"), password: process.env.DATABASE_PSWD} as DbSettings;        
        const bot = {...config.get("bot"), token: process.env.BOT_TOKEN} as BotSettings; 

        return {
            database,
            bot
        };
    }
}