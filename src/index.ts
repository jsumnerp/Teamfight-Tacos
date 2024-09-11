import {Client, GatewayIntentBits} from 'discord.js'
import {commands} from './commands'
import {config} from './config'

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})

client.once('ready', async () => {
  console.log('Discord bot is ready! 🤖')
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) {
    return
  }

  const {commandName} = interaction
  if (commands[commandName as keyof typeof commands]) {
    await commands[commandName as keyof typeof commands].execute(interaction)
  }
})

void client.login(config.DISCORD_TOKEN)
