import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

if (process.env.enviroment === "dev") {
  console.log("DEV")
  var botToken: string = process.env.DEV_BOT_TOKEN
  var botId: string = process.env.DEV_BOT_ID
  var guildId: string = process.env.DEV_GUILD_ID
} else {
  var botToken: string = process.env.BOT_TOKEN
  var botId: string = process.env.BOT_ID
  var guildId: string = process.env.GUILD_ID
}

async function deployCommands() {
  const allCommands = []
  const dmCommands = []

  const commandFiles = []
  commandFiles.push.apply(commandFiles, fs.readdirSync(`${__dirname}/src/commands`).filter(file => file.endsWith('.ts')))
  commandFiles.push.apply(commandFiles, fs.readdirSync(`${__dirname}/src/commands`).filter(file => file.endsWith('.js')))

  for (const file of commandFiles) {
    const command = await import(`${__dirname}/src/commands/${file}`)
	  allCommands.push(command.default.data)
  }

  for (const file of commandFiles) {
    const command = await import(`${__dirname}/src/commands/${file}`)
    if (command.default.allowDm === true || command.default.allowDm === undefined) {
      dmCommands.push(command.default.data)
    }
  }

  const rest = new REST({ version: '9' }).setToken(botToken);

  (async () => {
    try {
      console.log('Started refreshing application (/) commands.')

      await rest.put(
        Routes.applicationCommands(botId),
        { body: dmCommands },
      )

      await rest.put(
        Routes.applicationGuildCommands(botId, guildId),
        { body: allCommands },
      )

      console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
      console.error(error)
    }
  })()
}

deployCommands()