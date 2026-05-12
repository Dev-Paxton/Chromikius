import { ExtendedClient } from "./structures/Client"
import CommandStatus from "./utils/CommandStatus"
import Database from "./utils/Database"

Database.connect()
CommandStatus.loadDisabledCommands()
export const client = new ExtendedClient()

client.start()
