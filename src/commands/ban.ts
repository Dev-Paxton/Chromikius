import { MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";

export default new Command({
    data: {
        name: "ban",
        description: "Bannt einen User",
        options: [
            {
                type: 6,
                name: "member",
                description: "Member dessen Warnlevel angezeigt werden soll",
                required: true
            }
        ],
    },
    execute: async ({ interaction }) => {
        if (!interaction.member.permissions.has("BAN_MEMBERS")) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Dazu bist du nicht berechtigt")
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        const member = await interaction.guild.members.fetch(interaction.options.get("member").user.id)

        await member.ban()
        interaction.reply(member.user.username + "#" + member.user.discriminator + " wurde gebannt")
    }
})