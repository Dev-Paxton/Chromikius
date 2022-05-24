import { CommandInteraction, MessageEmbed } from "discord.js"
import Config from "./Config"
import Database from "./Database"

export default class CommandStatus {
    private static disabledCommands: Array<string> = []

    static async loadDisabledCommands() {
        if (Config.database.required) {
            const disabledCommands = await Database.getDisabledCommands()

            if (disabledCommands != undefined) {
                this.disabledCommands = disabledCommands
            }
        }
    }

    static addToCache(commandName: string) {
        this.disabledCommands.push(commandName)
    }

    static removeFromCache(commandName: string) {
        this.disabledCommands = this.disabledCommands.filter(e => e != commandName)
    }

    static checkStatus(commandName: string, interaction: CommandInteraction) {
        if (this.disabledCommands.includes(commandName)) {
            const embed = new MessageEmbed()
                .setColor("#fc030b")
                .setTitle("Der Command `" + commandName + "` ist deaktiviert")
            interaction.reply({ embeds: [embed], ephemeral: true })

            return true
        } else {
            return false
        }
    }
}