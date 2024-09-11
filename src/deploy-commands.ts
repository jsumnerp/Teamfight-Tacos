import {REST, Routes} from 'discord.js'
import {config} from './config'
import {commands} from './commands'

const commandsData = Object.values(commands).map(command => command.data.toJSON())

const rest = new REST().setToken(config.DISCORD_TOKEN)

export async function deployCommands() {
  try {
    console.log('Started refreshing application (/) commands.')

    // Await rest.put(Routes.applicationCommands(config.DISCORD_CLIENT_ID), {body: []})

    // Await rest.put(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, '1107054527296843819'), {body: []})
    // await rest.put(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, '1107054527296843819'), {body: commandsData})
    await rest.put(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, '1065718358986723470'), {body: commandsData})

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}

void deployCommands() // eslint-disable-line unicorn/prefer-top-level-await
