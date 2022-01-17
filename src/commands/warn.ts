import { GuildMember, Message, MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";
import Config from "../utils/Config";
import Database from "../utils/Database";
import delay from "../utils/delay";

function createPrivateWarnembed(adminName, guildName, warnlevel, reason, minutes) {
    const embed = new MessageEmbed()
        .setColor("#ff9e00")
        .setTitle(`Du wurdest von ${adminName} auf ${guildName} verwarnd`)

    if (warnlevel <= 3) {
        embed.addField("Strafe:", `${minutes} min. mute`)
    }

    if (warnlevel === 4) {
        embed.addField("Strafe:", "Kick")
    }

    if (warnlevel === 5) {
        embed.addField("Strafe:", "Bann")
    }

    if (reason) {
        embed.addField("Grund:", reason)
    }

    return embed
}

function createWarnembed(memberName, warnlevel, penance, minutes=null) {
    var title = `${memberName} wrude für die ${warnlevel}. Verwarnung `

    if (penance === "mute") {
        title += `für ${minutes} min. gemuted`
    } else if (penance === "kick") {
        title += "gekickt"
    } else if (penance === "ban") {
        title += "gebannt"
    }

    return new MessageEmbed().setColor("#ff9e00").setTitle(title)
}

export default new Command({
    data: {
        name: "warn",
        description: "Verwarnt einen User",
        options: [
            {
                type: 6,
                name: "member",
                description: "Member der verwarnt werden soll",
                required: true,
            },
            {
                type: 3,
                name: "grund",
                description: "Grund der Verwarnung"
            }
        ]
    },
    allowDm: false,
    execute: async ({ interaction }) => {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES") || !interaction.member.permissions.has("KICK_MEMBERS") || !interaction.member.permissions.has("BAN_MEMBERS")) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Dazu bist du nicht berechtigt")
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }

        const member = await interaction.guild.members.fetch(interaction.options.get("member").user.id)
        
        var reason = interaction.options.get("grund")
        if (reason) {
            var reasonValue = reason.value as string
        } else {
            reasonValue = null
        }

        const muteRole = interaction.guild.roles.cache.get(Config.guild.muteRoleId)

        await Database.warnsystem_register(member.id)

        const warnlevel = await Database.warnsystem_get_stats(member.id)
        const new_warnlevel = warnlevel + 1

        if (warnlevel != 4) {
            await Database.warnsystem_add_warn(member.id)
        }

        if (new_warnlevel <= 3) {
            const timeout = new_warnlevel * 600000
            const minutes = timeout / 1000 / 60

            interaction.reply({ embeds: [createWarnembed(member.user.username + "#" + member.user.discriminator, new_warnlevel, "mute", minutes)] })
            member.send({ embeds: [createPrivateWarnembed(interaction.user.username + "#" + member.user.discriminator, interaction.guild, new_warnlevel, reasonValue, minutes)] }).catch(error => {
                return
            })

            await member.roles.add(muteRole, reasonValue)
            await delay(timeout)
            await member.roles.remove(muteRole)
        }

        if (new_warnlevel === 4) {
            interaction.reply({ embeds: [createWarnembed(member.user.username + "#" + member.user.discriminator, new_warnlevel, "kick")] })
            member.send({ embeds: [createPrivateWarnembed(interaction.user.username + "#" + member.user.discriminator, interaction.guild, new_warnlevel, reasonValue, null)] }).catch(error => {
                return
            })

            member.kick()
        }

        if (new_warnlevel === 5) {
            interaction.reply({ embeds: [createWarnembed(member.user.username + "#" + member.user.discriminator, new_warnlevel, "ban")] })
            member.send({ embeds: [createPrivateWarnembed(interaction.user.username + "#" + member.user.discriminator, interaction.guild, new_warnlevel, reasonValue, null)] }).catch(error => {
                return
            })

            member.ban()
        }
    }
})