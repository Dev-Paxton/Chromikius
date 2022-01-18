import { MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";

export default new Command({
    data: {
        name: "kick",
        description: "Kickt einen User",
        options: [
            {
                type: 6,
                name: "member",
                description: "Member der gekickt werden soll",
                required: true
            }
        ]
    },
    execute: async ({ interaction }) => {
        if (!interaction.member.permissions.has("KICK_MEMBERS")) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Dazu bist du nicht berechtigt")
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        const member = await interaction.guild.members.fetch(interaction.options.get("member").user.id)
        await member.kick()
        interaction.reply(member.user.username + "#" + member.user.discriminator + " wurde gekickt")
    }
})