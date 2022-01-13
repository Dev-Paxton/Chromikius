import { MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";

export default new Command({
    data: {
        name: "userinfo",
        description: "Zeigt Informationen über einen User an",
        options: [
            {
                type: 6,
                name: "member",
                description: "Member dessen Info angezeigt werden soll",
            },
        ],
    },
    allowDm: false,
    execute: async ({ interaction }) => {
        const input_member = interaction.options.get("member")

        if (input_member === null) { 
            var member = interaction.user
        } else {
            var member = input_member.user
        }

        const guildMember = await interaction.guild.members.fetch(member.id)
        
        var roles = ""
        guildMember.roles.cache.forEach(role => {
            if (role.name === "@everyone") return

            if (roles === undefined) {
                roles = "<@&" + role.id + "> "
            } else {
                roles += "<@&" + role.id + "> "
            }
        })

        const joinedAt = guildMember.joinedAt.getDay() + "." + guildMember.joinedAt.getMonth().toString() + "." + guildMember.joinedAt.getFullYear().toString()

        if (guildMember.premiumSince === null) {
            var premiumSice = "0"
        } else {
            var premiumSice = guildMember.premiumSince.toString()
        }

        const embed = new MessageEmbed()
            .setColor("#ff9e00")
            .setTitle(guildMember.displayName)
            .setThumbnail(member.avatarURL())
            .addField("Name", member.username + "#" + member.discriminator, true)
            .addField("ID", String(member.id), true)
            .addField("Rollen", roles, true)
            .addField("Serverbeitritt", joinedAt, true)
            .addField("Booster seit", premiumSice, true)

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
})