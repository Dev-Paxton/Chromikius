import { MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";
import Config from "../utils/Config";

export default new Command({
    data: {
        name: "unmute",
        description : "Endmuted einen User",
        options: [
            {
                type: 6,
                name: "member",
                description: "Das Mitglied welches endmuted werden soll",
                required: true
            }
        ]
    },
    execute: async ({ interaction }) => {
        if (!interaction.member.permissions.has("MANAGE_ROLES")) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Dazu bist du nicht berechtigt")
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        const member = await interaction.guild.members.fetch(interaction.options.get("member").user.id)
        const muteRole = await interaction.guild.roles.fetch(Config.guild.muteRoleId)

        member.roles.remove(muteRole)
        interaction.reply(member.user.toString() + " wurde endmuted")
    }
})