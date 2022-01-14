import { ExtendedClient } from "./src/structures/Client"
import Config from "./src/utils/Config"
import Database from "./src/utils/Database"

Config.loadConfig()
Database.connect()
export const client = new ExtendedClient()

client.start()