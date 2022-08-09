import { Command } from "../structures/Command";
import Config from "../utils/Config";
import delay from "../utils/delay";

export default new Command({
    data: {
        name: "mute",
        description: "Muted einen User für die angegebenen Minuten",
        options: [
            {
                type: 6,
                name: "member",
                description: "Member der gemuted werden soll",
                required: true,
            },
            {
                type: 4,
                name: "minuten",
                description: "Nach wie vielen Minuten das Mitglied endmuted werden soll",
            }
        ]
    },
    userPermissions: ["ManageRoles"],
    botPermissions: ["ManageRoles"],
    allowDm: false,
    execute: async ({ interaction }) => {
        const member = await interaction.guild.members.fetch(interaction.options.get("member").user.id)
        const minutes = interaction.options.get("minuten")
        const muteRole = await interaction.guild.roles.fetch(Config.guild.muteRoleId)

        member.roles.add(muteRole)

        if (minutes) {
            var minutesInteger = minutes.value as number
            var minutesString = ` für ${minutesInteger}. min.`
        } else {
            var minutesString = ""
        }

        interaction.reply(member.user.toString() + ` wurde${minutesString} gemuted`)

        if (minutesInteger) {
            await delay(minutesInteger * 60 * 1000)
            member.roles.remove(muteRole)
        }
    }
})