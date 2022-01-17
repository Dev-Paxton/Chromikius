import { MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";
import Database from "../utils/Database";

export default new Command({
    data: {
        name: "clearwarnlevel",
        description: "Setzt das Warnlevel eines Users auf 0",
        options: [
            {
                type: 6,
                name: "member",
                description: "Member der verwarnt werden soll",
                required: true,
            },
        ]
    },
    execute: async ({ interaction }) => {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES") || !interaction.member.permissions.has("KICK_MEMBERS") || !interaction.member.permissions.has("BAN_MEMBERS")) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Dazu bist du nicht berechtigt")
            interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        const member = interaction.options.get("member").user

        const warnlevel = await Database.warnsystem_get_stats(member.id)

        if (warnlevel === undefined) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle(member.username + " hat keine Verwarnungen")
            interaction.reply({ embeds: [embed] })
        } else {
            await Database.warnsystem_clear_warnlevel(member.id)
            interaction.reply(`Das Warnlevel von ${member.username} wurde auf 0 gesetzt`)
        }
    }
})