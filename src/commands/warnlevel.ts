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
    userPermissions: ["MANAGE_MESSAGES", "KICK_MEMBERS", "BAN_MEMBERS"],
    botPermissions: ["MANAGE_MESSAGES", "KICK_MEMBERS", "BAN_MEMBERS"],
    allowDm: false,
    execute: async ({ interaction }) => {
        const member = interaction.options.get("member").user

        var warnlevel = await Database.warnsystem_get_stats(member.id)

        if (warnlevel === undefined) warnlevel = 0

        const embed = new MessageEmbed()
            .setColor("#ff9e00")
            .setTitle(member.username)
            .setDescription("Warnlevel: " + warnlevel)
        
        interaction.reply({ embeds: [embed] })
    }
})