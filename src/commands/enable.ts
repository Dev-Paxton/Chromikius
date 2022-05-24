import { MessageEmbed } from "discord.js";
import { Command } from "../structures/Command";
import { commandExists } from "../utils/checkCommand";
import CommandStatus from "../utils/CommandStatus";
import Database from "../utils/Database";

export default new Command({
    data: {
        name: "enable",
        description: "Aktiviert einen Command",
        options: [
            {
                type: 3,
                name: "command",
                description: "Der Command der aktiviert werden soll",
                required: true
            }
        ]
    },
    userPermissions: ["ADMINISTRATOR"],
    allowDm: false,
    execute: async ({ interaction }) => {
        const command = interaction.options.get("command").value as string

        if (commandExists(command)) {
            if (await Database.enableCommand(command)) {
                CommandStatus.removeFromCache(command)

                const embed = new MessageEmbed()
                    .setColor("#03ff46")
                    .setTitle("`" + command + "` wurde aktiviert")
                interaction.reply({ embeds: [embed] })
            } else {
                const embed = new MessageEmbed()
                    .setColor("#fc030b")
                    .setTitle("`" + command + "` ist bereits aktiviert")
                interaction.reply({ embeds: [embed] })
            }
        } else {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Der Command `" + command + "` existiert nicht")
            interaction.reply({ embeds: [embed], ephemeral: true })
        }
    }
})