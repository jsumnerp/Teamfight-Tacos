import {
  type ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder,
} from 'discord.js'
import {
  getAccount, getRanks, getSummoner,
} from '../riot-api'
import {buildRankedString} from '../util/build-ranked-string'
import {compareRanks} from '../util/compare-ranks'

export const data = new SlashCommandBuilder()
  .setName('rankings')
  .setDescription('Looks up rankings for discord server')

type Player = {
  displayName: string;
  tag: string;
}

const players: Player[] = [{
  displayName: 'Jsum',
  tag: '000',
},
{
  displayName: 'goonin',
  tag: 'glaze',
},
{displayName: 'Send', tag: 'EUW'},
{displayName: 'awg', tag: 'QAQ'},
{displayName: 'heaven interlude', tag: '777'},
{displayName: 'thai', tag: 'gzru'},
{displayName: 'Lupical', tag: 'meow'},
{displayName: 'tammers', tag: 'tam'}]

async function getSoloRank(displayName: string, tag: string) {
  const {puuid, gameName, tagLine} = await getAccount(displayName, tag, 'EUW1')
  const {summonerId} = await getSummoner(puuid, 'EUW1')
  const ranks = await getRanks(summonerId, 'EUW1')

  return {rank: ranks.find(rank => rank.queueType === 'RANKED_TFT'), gameName, tagLine}
}

export async function execute(interaction: ChatInputCommandInteraction) {
  console.log('abc')
  const results = []
  for (const {displayName, tag} of players) {
    results.push(getSoloRank(displayName, tag))
  }

  const ranks = await Promise.all(results)

  const filteredRanks = ranks.filter(({rank}) => Boolean(rank))

  filteredRanks.sort(({rank: a}, {rank: b}) => compareRanks(a!, b!))

  const tftEmbed = new EmbedBuilder()
    .setColor(0x00_E0_FA)
    .setTitle('fat ark power rankings')

  for (const rank of filteredRanks) {
    tftEmbed.addFields({name: `${rank.gameName}#${rank.tagLine}`, value: buildRankedString(rank.rank!)})
  }

  return interaction.reply({embeds: [tftEmbed]})
}

