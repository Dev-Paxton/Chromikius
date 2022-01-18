import { MessageEmbed, TextChannel } from "discord.js";
import { Command } from "../structures/Command";
import delay from "../utils/delay";

export default new Command({
    data: {
        name: "clear",
        description: "Löscht Nachrichten",
        options: [
            {
                type: 4,
                name: "anzahl",
                description: "Anzahl der Nachrichten die gelöscht werden soll",
            },
        ]
    },
    userPermissions: ["MANAGE_MESSAGES", "READ_MESSAGE_HISTORY"],
    botPermissions: ["MANAGE_MESSAGES", "READ_MESSAGE_HISTORY"],
    allowDm: false,
    execute: async ({ interaction }) => {
        const inputInteger = interaction.options.get("anzahl")

        if (messsagesToBeDeleted === null) var messsagesToBeDeleted = 1
        else if (messsagesToBeDeleted <= 0) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Du musst eine Zahl über 0 angeben")
            interaction.reply({ embeds: [embed], ephemeral: true })
        } else var messsagesToBeDeleted = inputInteger.value as number

        const channel = await interaction.guild.channels.fetch(interaction.channelId) as TextChannel
        const messages = (await channel.messages.fetch({ limit: messsagesToBeDeleted })).forEach((message) => {
            message.delete()
        })

        const embed = new MessageEmbed()
            .setColor("#ff9e00")
            .setDescription(messsagesToBeDeleted + ". Nachrichten wurden gelöscht")
            .setFooter("Wird in 5 sek. gelöscht")
        interaction.reply({ embeds: [embed] })
        await delay(5000)
        interaction.deleteReply()
    }
})