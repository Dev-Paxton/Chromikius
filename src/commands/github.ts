import { MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";

export default new Command({
    name: "github",
    description: "Link zu Kevin Chromiks GitHub Profile",
    execute: async ({ interaction }) => {
        const embed = new MessageEmbed()
                .setColor("#ff9e00")
                .setTitle("Kevin Chromik's GitHub Account:\nhttps://github.com/kchromik")
            
        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
})