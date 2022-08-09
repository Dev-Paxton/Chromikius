import { EmbedBuilder } from "discord.js";
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
    userPermissions: ["BanMembers"],
    botPermissions: ["BanMembers"],
    allowDm: false,
    execute: async ({ interaction }) => {
        const user = String(interaction.options.get('username').value).split("#")

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

        const embed = new EmbedBuilder()
            .setColor("#fc030b")
            .setTitle(`Für ${userName}#${userDiscriminator} wurde kein User gefunden`)
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
})