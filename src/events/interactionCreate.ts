import { client } from "../main";
import { Event } from "../structures/Event"
import CommandStatus from "../utils/CommandStatus";
import checkPermissions from "../utils/permissionHandler";

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = client.commands.get(interaction.commandName)

    if (!command) return

    if (await checkPermissions(command, interaction)) return
    
    if (CommandStatus.checkStatus(command.data.name, interaction)) return

    try {
        command.execute(client, interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true})
    }
})
