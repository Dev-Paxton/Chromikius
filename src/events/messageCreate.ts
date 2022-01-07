import { Message } from "discord.js";
import { db } from "../../main";
import { Event } from "../structures/Event";

export default new Event("messageCreate", async (message: Message) => {
    if (message.author.bot) return

    await db.levelsystem_register(message.author.id)
    await db.levelsystem_add_xp(message.author.id)
    await db.levelsystem_level_up(message.author.id, message)
})