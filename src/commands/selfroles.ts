import { Command } from "../structures/Command"
import { create } from "../utils/selfrolesEmbedCreator"

export default new Command({
    data: {
        name: "selfroles",
        description: "Listet alle Selfroles auf",
    },
    allowDm: false,
    execute: async ({ interaction }) => {
        interaction.reply({ embeds: [await create(interaction, "")] })
    }
})