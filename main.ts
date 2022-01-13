import { ExtendedClient } from "./src/structures/Client"
import { Database } from "./src/structures/Database"

Database.connect()
export const client = new ExtendedClient()

client.start()