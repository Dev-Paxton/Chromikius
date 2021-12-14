import { Event } from "../structures/Event";
import { client } from "../../main";

export default new Event("ready", () => {
    console.log(`The client has been successfully logged in as user ${client.user.username}`)
})