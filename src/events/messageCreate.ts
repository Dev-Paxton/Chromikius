import { Message } from "discord.js";
import { Database } from "../structures/Database";
import { Event } from "../structures/Event";

export default new Event("messageCreate", async (message: Message) => {
    if (message.author.bot) return

    await Database.levelsystem_register(message.author.id)
    await Database.levelsystem_add_xp(message.author.id)
    await Database.levelsystem_level_up(message.author.id, message)
})