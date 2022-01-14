import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import fs from "fs"
import Config from "./src/utils/Config"

Config.loadConfig()

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

  const rest = new REST({ version: '9' }).setToken(Config.bot.token);

  (async () => {
    try {
      console.log('Started refreshing application (/) commands.')

      await rest.put(
        Routes.applicationCommands(Config.bot.id),
        { body: dmCommands },
      )

      await rest.put(
        Routes.applicationGuildCommands(Config.bot.id, Config.guild.id),
        { body: allCommands },
      )

      console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
      console.error(error)
    }
  })()
}

deployCommands()