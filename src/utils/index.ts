import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, ChannelType, ChatInputCommandInteraction, Client, ColorResolvable, Embed, EmbedBuilder, Message, MessageContextMenuCommandInteraction, MessagePayload, MessageReplyOptions, StringSelectMenuBuilder, UserContextMenuCommandInteraction } from "discord.js"
import { Server } from "../types"

export const sendMessageSlash = (int: ChatInputCommandInteraction<CacheType> | UserContextMenuCommandInteraction<CacheType> | MessageContextMenuCommandInteraction<CacheType>, optionsMessage: string | MessagePayload | MessageReplyOptions) => {
  setTimeout(async () => {
    await int.editReply(optionsMessage)
  }, 3000)
}

export const sendMessageText = (msg: Message, optionsMessage: string | MessagePayload | MessageReplyOptions) => {
  setTimeout(()=> {
    msg.reply(optionsMessage)
  }, 3000)
}


export const selectiveTextMenu = async (msg: Message<boolean>, config: {
  SelectiveEb: EmbedBuilder
  lsitElements: {
    emoji?: string
    color?: ColorResolvable
    title: string
    description: string
  }[]
}) => {
  const { SelectiveEb, lsitElements } = config

  const SelectiveMenu = new ActionRowBuilder<StringSelectMenuBuilder>()
  .addComponents(
    new StringSelectMenuBuilder()
    .setCustomId('server-list')
    .setPlaceholder(`👉 Selecciona un servidor.`)
    .setOptions(lsitElements.map((e, i)=> ({
      emoji: e.emoji,
      label: e.title,
      value: e.title.toLowerCase(),
      default: i==0 ? true : false
    })))
  ).toJSON()

  setTimeout(async ()=> {
    const serversMessage = await msg.reply({allowedMentions: {repliedUser: false}, embeds: [SelectiveEb], components: [SelectiveMenu]})
    const serversCollection = serversMessage.createMessageComponentCollector({time: lsitElements.length*60000})

    serversCollection.on('collect', async (menu)=> {
      if(menu.isStringSelectMenu()){
        const { values } = menu
        
        const element = lsitElements.find(({title})=> title.toLowerCase() == values[0])

        if(element){
          SelectiveEb.setTitle(element.title)
          .setDescription(element.description)

          SelectiveMenu.components[0].options.forEach(o=> {
            if(o.value == element.title.toLowerCase()) o.default = true
            else if(typeof o.default != 'undefined') o.default = undefined
          })

          await menu.update({embeds: [SelectiveEb], components: [SelectiveMenu]})
        }
      }
    })

    serversCollection.on('end', () => {
      serversMessage.edit({embeds: [SelectiveEb], components: []})
    })
  }, 3000)
}

export const selectiveSlashMenu = async (int: ChatInputCommandInteraction<CacheType>, config: {
  SelectiveEb: EmbedBuilder
  lsitElements: {
    emoji?: string
    color?: ColorResolvable
    title: string
    description: string
  }[]
}) => {
  const { SelectiveEb, lsitElements } = config

  const SelectiveMenu = new ActionRowBuilder<StringSelectMenuBuilder>()
  .addComponents(
    new StringSelectMenuBuilder()
    .setCustomId('server-list')
    .setPlaceholder(`👉 Selecciona un servidor.`)
    .setOptions(lsitElements.map((e, i)=> ({
      emoji: e.emoji,
      label: e.title,
      value: e.title.toLowerCase(),
      default: i==0 ? true : false
    })))
  ).toJSON()

  setTimeout(async ()=> {
    const serversMessage = await int.editReply({allowedMentions: {repliedUser: false}, embeds: [SelectiveEb], components: [SelectiveMenu]})
    const serversCollection = serversMessage.createMessageComponentCollector({time: lsitElements.length*60000})

    serversCollection.on('collect', async (menu)=> {
      if(menu.isStringSelectMenu()){
        const { values } = menu
        
        const element = lsitElements.find(({title})=> title.toLowerCase() == values[0])

        if(element){
          SelectiveEb.setTitle(element.title)
          .setDescription(element.description)

          SelectiveMenu.components[0].options.forEach(o=> {
            if(o.value == element.title.toLowerCase()) o.default = true
            else if(typeof o.default != 'undefined') o.default = undefined
          })

          await menu.update({embeds: [SelectiveEb], components: [SelectiveMenu]})
        }
      }
    })

    serversCollection.on('end', () => {
      serversMessage.edit({embeds: [SelectiveEb], components: []})
    })
  }, 3000)
}

const serversChannelId = '1084904045409468517'
export const getServersData = async (client: Client) => {
  const channel = client.channels.cache.get(serversChannelId)
  if(channel?.type == ChannelType.GuildText) {
    const messages: Server[] = (await channel.messages.fetch({limit: 90})).filter(({content})=> content.split('|').length >= 4).map(({content})=> {
      const texts = content.split('|')

      return {
        lenguage: 'es',
        emoji: texts[0].replace(/\n/g, '').trim(),
        color: texts[1].replace(/\n/g, '').trim(),
        title: texts[2].replace(/\n/g, '').trim(),
        description: texts[3]
      }
    })
    return messages.reverse()
  }
}