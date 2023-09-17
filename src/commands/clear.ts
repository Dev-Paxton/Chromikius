import { EmbedBuilder, TextChannel } from "discord.js";
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
    userPermissions: ["ManageMessages", "ReadMessageHistory"],
    botPermissions: ["ManageMessages", "ReadMessageHistory"],
    allowDm: false,
    execute: async ({ interaction }) => {
        const input = interaction.options.get("anzahl")

        if (input === null) var messsagesToBeDeleted = 1
        else var messsagesToBeDeleted = Number(input.value)

        if (messsagesToBeDeleted <= 0) {
            const embed = new EmbedBuilder()
                .setColor("#fc030b")
                .setTitle("Du musst eine Zahl über 0 angeben")
            interaction.reply({ embeds: [embed], ephemeral: true })
        } else {
            const channel = await interaction.guild.channels.fetch(interaction.channelId) as TextChannel
            const messages = (await channel.messages.fetch({ limit: messsagesToBeDeleted })).forEach((message) => {
                message.delete()
            })

            const embed = new EmbedBuilder()
                .setColor("#ff9e00")
                .setDescription(messsagesToBeDeleted + ". Nachrichten wurden gelöscht")
                .setFooter({ text: "Wird in 5 sek. gelöscht" })
            interaction.reply({ embeds: [embed] })
            await delay(5000)
            interaction.deleteReply()
        }

        
    }
})