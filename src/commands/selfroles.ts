import { Message, MessageEmbed, TextChannel } from "discord.js"
import { Command } from "../structures/Command"
import Database from "../utils/Database"
import delay from "../utils/delay"
import { create } from "../utils/selfrolesEmbedCreator"

export default new Command({
    data: {
        name: "selfroles",
        description: "Listet alle Selfroles auf",
    },
    execute: async ({ interaction }) => {
        interaction.reply({ embeds: [await create(interaction, "")] })
    }
})