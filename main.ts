import { ExtendedClient } from "./src/structures/Client"
import CommandStatus from "./src/utils/CommandStatus"
import Database from "./src/utils/Database"

Database.connect()
CommandStatus.loadDisabledCommands()
export const client = new ExtendedClient()

client.start()