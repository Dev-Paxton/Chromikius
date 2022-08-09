import { EmbedBuilder, TextChannel } from "discord.js";
import { Event } from "../structures/Event";
import Config from "../utils/Config";

export default new Event("guildMemberAdd", (member) => {
    if (member.guild.id != Config.guild.id) return
    
    // Private message
    const embed = new EmbedBuilder()
        .setColor("#ff9e00")
        .setTitle("__**Herzlich Willkommen auf dem offiziellen Discord Server von Kevin Chromik!**__")
        .setDescription(`**Es freut mich, dass du es hierher gefunden hast!**\n
                        **Vorab ein paar Informationen:**\n
                        Der Server dient als Kommunikationsplattform für die Community von Kevin Chromik. Hier können verschiedenste Thematiken zusammen bequatsch werden und erarbeitet 
                        werden. Es kann sich über die Videos von Kevin unterhalten werden und man kann Hilfestellung zu IT-Problemen erhalten\n
                        __**Wichtig:**__\n
                        **Um einen geregelten Ablauf gewährleisten zu können, gibt es ein Regelwerk. Dies findest du hier: <#722059556158570518>**\n
                        **Bitte lies dir diese Regeln aufmerksam durch. Bei Fragen oder Problemen steht dir das Moderatoren Team zur Verfügung.**\n
                        __**Viel Spaß hier!**__\n
                        <:KevinChromikLogo:777119490440953878>`)

    member.send({ embeds: [embed] }).catch(error => {
        return
    })
    

    // Server message
    const messages = [`Hey ${member}, willkommen auf dem Server!`,
                    `Willkommen, ${member}! Sag hallo!`,
                    `${member} ist gelandet`,
                    `${member} hat Pizza mitgebracht!`,
                    `Ein wildes ${member} erscheint!`,
                    `Hey ${member}, ich hoffe du hast das letzte Video von Kevin gesehen!`]
    
    const channel = member.guild.channels.cache.get(Config.guild.welcomeChannelId) as TextChannel
    channel.send(messages[Math.floor(Math.random()*messages.length)])

    // Auto role
    const memberRole = member.guild.roles.cache.get(Config.guild.memberRoleId)
    member.roles.add(memberRole)
})