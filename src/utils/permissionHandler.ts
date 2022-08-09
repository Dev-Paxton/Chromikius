import { CommandInteraction, EmbedBuilder } from "discord.js"
import { client } from "../../main"
import { CommandType } from "../types/commandType"

export default async function checkPermissions(command: CommandType, interaction: CommandInteraction) {
    if (!command.userPermissions && !command.botPermissions) return

    const guildMember = await interaction.guild.members.fetch(interaction.user.id)
    const guildBot = await interaction.guild.members.fetch(client.user.id)

    var requiredUserPermissions = []
    var requiredBotPermissions = []

    if (command.userPermissions) {
        command.userPermissions.forEach(async (permission) => {
            if (!guildMember.permissions.has(permission)) {
                requiredUserPermissions.push(permission)
            }
        })
    }

    if (command.botPermissions) {
        command.botPermissions.forEach(async (permission) => {
            if (!guildBot.permissions.has(permission)) {
                requiredBotPermissions.push(permission)
            }
        })
    }
    
    if (requiredBotPermissions.length != 0 || requiredUserPermissions.length != 0) {
        const embed = new EmbedBuilder().setColor("#fc030b")

        if (requiredUserPermissions) embed.setTitle("Dazu bist du nicht berechtigt")
        else if (requiredBotPermissions) embed.setTitle("Dafür fehlen mir Berechtigungen")

        embed.setDescription("Folgende Berechtigungen fehlen:")

        if (requiredUserPermissions.length != 0) {
            let userValue = ""
            requiredUserPermissions.forEach(permission => {
                if (userValue === undefined) userValue = permission + "\n"
                else userValue += permission + "\n"
            })
            embed.addFields()

            embed.addFields({ name: "user", value: userValue, inline: true})
        }

        if (requiredBotPermissions.length != 0) {
            let botValue = ""
            requiredBotPermissions.forEach(permission => {
                if (botValue === undefined) botValue = permission + "\n"
                else botValue += permission + "\n"
            })

            embed.addFields({ name: "Bot", value: botValue, inline: true })
        }

        interaction.reply({ embeds: [embed], ephemeral: true })

        return true
    }
    
    return false
}