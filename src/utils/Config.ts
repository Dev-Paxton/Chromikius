import config from "config"
import { BotSettings, DatabaseSettings, GuildSettings } from "../types/config"

export default class Config {
    static database: DatabaseSettings
    static bot: BotSettings
    static guild: GuildSettings


    static loadConfig() {
        console.log(process.env.NODE_ENV)

        this.database = config.get("database")
        this.bot = config.get("bot")
        this.guild = config.get("guild")
        console.log(this.database)
    }
}