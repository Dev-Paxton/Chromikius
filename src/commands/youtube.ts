import { MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";

export default new Command({
    data: {
        name: "youtube",
        description: "Kevin Chromiks YouTube Kanal",
    },
    execute: async ({ interaction }) => {
        const embed = new MessageEmbed()
            .setColor("#ff9e00")
            .setTitle("Kevin Chromik's YouTube Kanal:\nhttps://www.youtube.com/c/KevinChromik")

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
})