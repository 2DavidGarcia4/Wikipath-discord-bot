import { Client, ColorResolvable, EmbedBuilder, Message,  } from "discord.js";
import { getServersData, sendMessageText, selectiveTextMenu } from "../../utils";

export const serversCommand = async (msg: Message<boolean>, client: Client) => {
  const servers = await getServersData(client)
  await msg.channel.sendTyping()
  
  const ServersEb = new EmbedBuilder()
  if(servers){
    const firtsServer = servers[0]
    const embedColor = firtsServer.color == 'null' ? undefined : firtsServer.color as ColorResolvable

    ServersEb
    .setTitle(firtsServer.title)
    .setDescription(firtsServer.description)
    .setColor(embedColor || '#7e634e')

    if(servers.length <= 1){
      sendMessageText(msg, {embeds: [ServersEb]})

    }else{
      const lsitElements = servers.map(({emoji, color, title, description})=> ({
        emoji: emoji == 'null' ? undefined : emoji,
        color: color == 'null' ? undefined : color as ColorResolvable,
        title,
        description
      }))

      selectiveTextMenu(msg, {
        SelectiveEb: ServersEb,
        lsitElements
      })
    }  

  }else{
    ServersEb
    .setTitle('Error')
    .setDescription('No hay datos de servidores o ha ocurido un error al obtenerlos.')
    .setColor('DarkRed')
    sendMessageText(msg, {embeds: [ServersEb]})
  }
}