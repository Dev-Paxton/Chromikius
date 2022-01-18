import { MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";

export default new Command({
    data: {
        name: "unban",
        description: "Entbannt einen User",
        options: [
            {
                type: 3,
                name: "username",
                description: "username#discriminator",
                required: true
            }
        ]
    },
    execute: async ({ interaction }) => {
        if (!interaction.member.permissions.has("BAN_MEMBERS")) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Dazu bist du nicht berechtigt")
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        const user = interaction.options.getString('username').split("#")

        const bannedUsers = await interaction.guild.bans.fetch()
        const userName = user[0]
        const userDiscriminator = user[1]
        
        bannedUsers.forEach(banEntry => {
            let user = banEntry.user
            if (userName === user.username && userDiscriminator === user.discriminator) {
                interaction.guild.members.unban(user)
                interaction.reply(user.username + "#" + user.discriminator + " wurde entbannt")
            }
        })

        const embed = new MessageEmbed()
            .setColor("#fc030b")
            .setTitle(`Für ${userName}#${userDiscriminator} wurde kein User gefunden`)
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
})