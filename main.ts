import { ExtendedClient } from "./src/structures/Client"
import CommandStatus from "./src/utils/CommandStatus"
import Config from "./src/utils/Config"
import Database from "./src/utils/Database"

Config.loadConfig()
Database.connect()
CommandStatus.loadDisabledCommands()
export const client = new ExtendedClient()

client.start()