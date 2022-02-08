import { TextChannel } from "discord.js";
import { client } from "../../main";
import Config from "./Config";
import Database from "./Database";

export async function cacheMessages() {
    const selfroles = await Database.selfrole_getAll()
    const guild = await client.guilds.fetch(Config.guild.id)

    selfroles.forEach(async selfrole => {
        const channel = await guild.channels.fetch(selfrole.channelId) as TextChannel
        const message = await channel.messages.fetch(selfrole.messageId)
    })
}