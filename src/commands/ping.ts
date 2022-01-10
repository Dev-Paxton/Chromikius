import { MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";

export default new Command({
    name: "ping",
    description: "Antwortet mit der Latenz",
    execute: async({ interaction }) => {
        const embed = new MessageEmbed()
            .setColor("#ff9e00")
            .setTitle("🏓 Pong!")
            .setDescription(`Latency: ${Date.now() - interaction.createdTimestamp}ms\n
			API Latency: ${Math.round(interaction.client.ws.ping)}ms`)
        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
})