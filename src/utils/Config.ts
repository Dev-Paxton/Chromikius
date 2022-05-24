import config from "config"
import { BotSettings, DatabaseSettings, GuildSettings } from "../types/config"

export default class Config {
    static database: DatabaseSettings
    static bot: BotSettings
    static guild: GuildSettings


    static loadConfig() {
        this.database = config.get("database")
        this.bot = config.get("bot")
        this.guild = config.get("guild")

        console.log("Enviroment: " + process.env.NODE_ENV)
        if (!this.database.required) {
            console.log("Database disabled")
        }
    }
}