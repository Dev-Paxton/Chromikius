import { EmbedBuilder } from "discord.js";
import { Command } from "../structures/Command";
import { commandExists } from "../utils/checkCommand";
import CommandStatus from "../utils/CommandStatus";
import Database from "../utils/Database";

export default new Command({
    data: {
        name: "disable",
        description: "Deaktiviert einen Command",
        options: [
            {
                type: 3,
                name: "command",
                description: "Der Command der deaktiviert werden soll",
                required: true
            }
        ]
    },
    userPermissions: ["Administrator"],
    allowDm: false,
    execute: async ({ interaction }) => {
        const command = interaction.options.get("command").value as string

        if (commandExists(command)) {
            if (await Database.disableCommand(command)) {
                CommandStatus.addToCache(command)

                const embed = new EmbedBuilder()
                    .setColor("#03ff46")
                    .setTitle("`" + command + "` wurde deaktiviert")
                interaction.reply({ embeds: [embed] })
            } else {
                const embed = new EmbedBuilder()
                    .setColor("#fc030b")
                    .setTitle("`" + command + "` ist bereits deaktiviert")
                interaction.reply({ embeds: [embed] })
            }
        } else {
            const embed = new EmbedBuilder()
                .setColor("#fc030b")
                .setTitle("Der Command `" + command + "` existiert nicht")
            interaction.reply({ embeds: [embed], ephemeral: true })
        }
    }
})