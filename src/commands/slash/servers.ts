import { CacheType, ChatInputCommandInteraction, Client, ColorResolvable, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { getServersData, selectiveSlashMenu, sendMessageSlash } from "../../utils";

export const serversScb = new SlashCommandBuilder()
.setName('servers')
.setNameLocalization('es-ES', 'servidores')
.setDescription('📗 MC servers wiki.')
.setDescriptionLocalization('es-ES', '📗 Wiki de servidores MC.')
.toJSON()

export const serversSlashCommand = async (int: ChatInputCommandInteraction<CacheType>, Client: Client) => {
  const servers = await getServersData(Client)
  await int.deferReply()
  
  const ServersEb = new EmbedBuilder()
  if(servers){
    const firtsServer = servers[0]
    const embedColor = firtsServer.color == 'null' ? undefined : firtsServer.color as ColorResolvable

    ServersEb
    .setTitle(firtsServer.title)
    .setDescription(firtsServer.description)
    .setColor(embedColor || '#7e634e')

    if(servers.length <= 1){
      sendMessageSlash(int, {embeds: [ServersEb]})

    }else{
      const lsitElements = servers.map(({emoji, color, title, description})=> ({
        emoji: emoji == 'null' ? undefined : emoji,
        color: color == 'null' ? undefined : color as ColorResolvable,
        title,
        description
      }))

      selectiveSlashMenu(int, {
        SelectiveEb: ServersEb,
        lsitElements
      })
    }  

  }else{
    ServersEb
    .setTitle('Error')
    .setDescription('No hay datos de servidores o ha ocurido un error al obtenerlos.')
    .setColor('DarkRed')
    sendMessageSlash(int, {embeds: [ServersEb]})
  }
}