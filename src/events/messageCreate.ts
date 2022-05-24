import { Message } from "discord.js";
import Database from "../utils/Database";
import { Event } from "../structures/Event";
import Config from "../utils/Config";

export default new Event("messageCreate", async (message: Message) => {
    if (message.author.bot) return

    if (Config.database.required) {
        await Database.levelsystem_register(message.author.id)
        await Database.levelsystem_add_xp(message.author.id)
        await Database.levelsystem_level_up(message.author.id, message)
    }

    if (message.channelId === Config.guild.surveyChannelId) {
        message.react("<:Ja:724324262768279592>").then(() => message.react("<:Nein:724325055923879989>"))
    }
})