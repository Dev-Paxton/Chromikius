import { Client, ClientEvents, Collection, Intents } from "discord.js";
import { CommandType } from "../types/commandType";
import fs from "fs"
import { Event } from "./Event";
import Config from "../utils/Config";

const myIntents = new Intents()
myIntents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS
)

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection()

    constructor() {
        super({ intents: myIntents })
    }

    start() {
        this.registerModules()
        this.login(Config.bot.token)
    }

    async registerModules() {
        //Commands
        const commandFiles = []
        commandFiles.push.apply(commandFiles, fs.readdirSync(`${__dirname}/../commands`).filter(file => file.endsWith('.ts')))
        commandFiles.push.apply(commandFiles, fs.readdirSync(`${__dirname}/../commands`).filter(file => file.endsWith('.js')))

        for (const file of commandFiles) {
            const command: CommandType = (await import(`${__dirname}/../commands/${file}`)).default
            this.commands.set(command.data.name, command)
        }

        //Events
        const eventFiles = []
        eventFiles.push.apply(eventFiles, fs.readdirSync(`${__dirname}/../events`).filter(file => file.endsWith('.ts')))
        eventFiles.push.apply(eventFiles, fs.readdirSync(`${__dirname}/../events`).filter(file => file.endsWith('.js')))

        for (const file of eventFiles) {
            const event: Event<keyof ClientEvents> = (await import(`${__dirname}/../events/${file}`)).default
            this.on(event.event, event.execute)
        }
    }
}