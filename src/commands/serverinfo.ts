import { MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";

export default new Command({
    name: "serverinfo",
    description: "Zeigt Informationen über den Server",
    execute: async ({ interaction }) => {
        const embed = new MessageEmbed()
                .setColor("#ff9e00")
                .setTitle(interaction.guild.name)
                .addField("Member:", String(interaction.guild.memberCount))
                .addField("Channel:", String(interaction.guild.channels.channelCountWithoutThreads))
                .addField("Boosts:", String(interaction.guild.premiumSubscriptionCount))
                .addField("Servererstellung:", String(interaction.guild.createdAt), false)
                .addField("Serverowner:", (await interaction.guild.fetchOwner()).displayName)
                .setThumbnail(interaction.guild.iconURL())
            
        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
})