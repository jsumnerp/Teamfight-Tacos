import {
  type ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder,
} from 'discord.js'
import {
  getAccount, getRanks, getSummoner,
} from '../riot-api'
import {getRankColor} from '../util/get-rank-color'
import {buildRankedString} from '../util/build-ranked-string'

export const data = new SlashCommandBuilder()
  .setName('lookup')
  .setDescription('Looks up someones tft profile')
  .addStringOption(option => option.setName('displayname').setDescription('Display name in game').setRequired(true))
  .addStringOption(option => option.setName('tag').setDescription('Tag without the #').setRequired(true))
  .addStringOption(option => option.setName('region').setDescription('Account Region').addChoices({name: 'EUW', value: 'EUW1'}, {name: 'NA', value: 'NA1'}).setRequired(true))

export async function execute(interaction: ChatInputCommandInteraction) {
  const displayname = interaction.options.getString('displayname', true)
  const tag = interaction.options.getString('tag', true)
  const region = interaction.options.getString('region', true)

  const {puuid, gameName, tagLine} = await getAccount(displayname, tag, region)
  const {summonerId, profilePicture} = await getSummoner(puuid, region)

  const ranks = await getRanks(summonerId, region)

  const rankedSolo = ranks.find(rank => rank.queueType === 'RANKED_TFT')
  const rankedDoubleUp = ranks.find(rank => rank.queueType === 'RANKED_TFT_DOUBLE_UP')

  const tftEmbed = new EmbedBuilder()
    .setColor(rankedSolo ? getRankColor(rankedSolo.tier) : (rankedDoubleUp ? getRankColor(rankedDoubleUp.tier) : 0x00_00_00))
    .setTitle(`${gameName}#${tagLine}`)
    .setThumbnail(profilePicture)

  if (rankedSolo) {
    tftEmbed.addFields({name: 'Ranked Solo', value: buildRankedString(rankedSolo)})
  }

  if (rankedDoubleUp) {
    tftEmbed.addFields({name: 'Double Up', value: buildRankedString(rankedDoubleUp)})
  }

  return interaction.reply({embeds: [tftEmbed]})
}
