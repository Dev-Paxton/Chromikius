import { Message, EmbedBuilder, TextChannel } from "discord.js"
import Database from "./Database"

export async function create(interaction, descriptionHeader){
    const selfroles = await Database.selfrole_getAll()

        var description = descriptionHeader
        for (var selfrole of selfroles) {
            const role = await interaction.guild.roles.fetch(selfrole.roleId)
            const channel = await interaction.guild.channels.fetch(selfrole.channelId) as TextChannel
            const message = (await channel.messages.fetch(selfrole.messageId).catch(error => {
                if (error.code === 10008) {
                    return
                } else {
                    throw error
                }
            })) as Message

            if (description === undefined) {
                description = "`#" + selfrole.id + "` " + selfrole.emoji + ` ${role} ${channel} [MessageLink](${message.url})`
            } else {
                description += "\n`#" + selfrole.id + "` " + selfrole.emoji + ` ${role} ${channel} [MessageLink](${message.url})`
            }
        }
        
        const embed = new EmbedBuilder()
            .setColor("#ff9e00")
            .setTitle("Selfroles")
            .setDescription(description)

        return embed
}