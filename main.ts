import { ExtendedClient } from "./src/structures/Client"
import { Database } from "./src/structures/Database"

export const db = new Database
export const client = new ExtendedClient()

client.start()