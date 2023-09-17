import { Event } from "../structures/Event"
import Database from "../utils/Database"

export default new Event("messageReactionRemove", async (reaction, user) => {
    if (!reaction.message.inGuild()) return

    if (user.bot) return
    const member = await reaction.message.guild.members.fetch(user.id)
    var selfroles = await Database.selfrole_getAllByEmoji(reaction.emoji.name)
    
    if (selfroles === undefined) {
        selfroles = await Database.selfrole_getAllByEmoji("<:" + reaction.emoji.name + ":" + reaction.emoji.id + ">")
    }

    if (selfroles != undefined) {
        for (const selfrole of selfroles) {
            if (selfrole.messageId === reaction.message.id) {
                const role = await reaction.message.guild.roles.fetch(selfrole.roleId)
                member.roles.remove(role)
            }
        }
    }
})