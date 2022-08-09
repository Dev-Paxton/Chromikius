import { Command } from "../structures/Command";

export default new Command({
    data: {
        name: "ban",
        description: "Bannt einen User",
        options: [
            {
                type: 6,
                name: "member",
                description: "Member der gebannt werden soll",
                required: true
            }
        ],
    },
    userPermissions: ["BanMembers"],
    botPermissions: ["BanMembers"],
    allowDm: false,
    execute: async ({ interaction }) => {
        const member = await interaction.guild.members.fetch(interaction.options.get("member").user.id)

        await member.ban()
        interaction.reply(member.user.username + "#" + member.user.discriminator + " wurde gebannt")
    }
})