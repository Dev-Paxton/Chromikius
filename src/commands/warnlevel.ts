import { MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";
import Database from "../utils/Database";

export default new Command({
    data: {
        name: "warnlevel",
        description: "Zeigt das Warnlevel eines Users an",
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
        if (!interaction.member.permissions.has("MANAGE_MESSAGES") || !interaction.member.permissions.has("KICK_MEMBERS") || !interaction.member.permissions.has("BAN_MEMBERS")) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Dazu bist du nicht berechtigt")
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        var member = interaction.options.get("member").user

        var warnlevel = await Database.warnsystem_get_stats(member.id)

        if (warnlevel === undefined) warnlevel = 0

        const embed = new MessageEmbed()
            .setColor("#ff9e00")
            .setTitle(member.username)
            .setDescription("Warnlevel: " + warnlevel)
        
        interaction.reply({ embeds: [embed] })
    }
})