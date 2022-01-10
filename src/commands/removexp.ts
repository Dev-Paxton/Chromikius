import { GuildMember, MessageEmbed, Permissions } from "discord.js";
import { db } from "../../main";
import { Command } from "../structures/Command";

export default new Command({
    name: "removexp",
    description: "Entfernt xp eines Members",
    options: [
        {
            type: 6,
            name: "member",
            description: "Member von dem xp entfernt werden soll",
            required: true,
        },
        {
            type: 4,
            name: "xp",
            description: "Erfahrung die entfernt werden soll",
            required: true,
        },
    ],
    execute: async ({ interaction }) => {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Dazu bist du nicht berechtigt")
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        const member = interaction.options.get("member")
        const xpToBeRemoved = interaction.options.get("xp").value as number

        const stats = await db.levelsystem_get_stats(member.user.id)
        
        if (stats === undefined) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Dieser User hat noch keine Nachricht verfasst")
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        const newXp = stats.xp - xpToBeRemoved
        const newLevel = Math.ceil(Math.sqrt(newXp))
        
        db.levelsystem_removexp(newXp, newLevel, member.user.id)

        await interaction.reply(`${member.user} wurden ${xpToBeRemoved} xp abgezogen`)
    }
})