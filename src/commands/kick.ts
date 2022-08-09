import { Command } from "../structures/Command";

export default new Command({
    data: {
        name: "kick",
        description: "Kickt einen User",
        options: [
            {
                type: 6,
                name: "member",
                description: "Member der gekickt werden soll",
                required: true
            }
        ]
    },
    userPermissions: ["KickMembers"],
    botPermissions: ["KickMembers"],
    allowDm: false,
    execute: async ({ interaction }) => {
        const member = await interaction.guild.members.fetch(interaction.options.get("member").user.id)
        await member.kick()
        interaction.reply(member.user.username + "#" + member.user.discriminator + " wurde gekickt")
    }
})