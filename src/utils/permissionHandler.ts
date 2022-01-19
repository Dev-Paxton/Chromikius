import { CommandInteraction, MessageEmbed } from "discord.js"
import { client } from "../../main"
import { CommandType } from "../types/commandType"

export default async function checkPermissions(command: CommandType, interaction: CommandInteraction) {
    if (!command.userPermissions && !command.botPermissions) return

    command.botPermissions.push("SEND_MESSAGES", "EMBED_LINKS", "ADD_REACTIONS")

    const guildMember = await interaction.guild.members.fetch(interaction.user.id)
    const guildBot = await interaction.guild.members.fetch(client.user.id)

    var requiredUserPermissions = []
    var requiredBotPermissions = []
    
    command.userPermissions.forEach(async (permission) => {
        if (!guildMember.permissions.has(permission)) {
            requiredUserPermissions.push(permission)
        }
    })

    command.botPermissions.forEach(async (permission) => {
        if (!guildBot.permissions.has(permission)) {
            requiredBotPermissions.push(permission)
        }
    })

    if (requiredBotPermissions.length != 0 || requiredUserPermissions.length != 0) {
        const embed = new MessageEmbed().setColor("#fc030b")

        if (requiredUserPermissions) embed.setTitle("Dazu bist du nicht berechtigt")
        else if (requiredBotPermissions) embed.setTitle("Dafür fehlen mir Berechtigungen")

        embed.setDescription("Folgende Berechtigungen fehlen:")

        if (requiredUserPermissions.length != 0) {
            let userValue = ""
            requiredUserPermissions.forEach(permission => {
                if (userValue === undefined) userValue = permission + "\n"
                else userValue += permission + "\n"
            })

            embed.addField("User", userValue, true)
        }

        if (requiredBotPermissions.length != 0) {
            let botValue = ""
            requiredBotPermissions.forEach(permission => {
                if (botValue === undefined) botValue = permission + "\n"
                else botValue += permission + "\n"
            })

            embed.addField("Bot", botValue, true)
        }

        interaction.reply({ embeds: [embed], ephemeral: true })

        return true
    }
    
    return false
}