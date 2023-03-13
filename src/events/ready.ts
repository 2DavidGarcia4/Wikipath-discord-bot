import { Client, ChannelType } from "discord.js"
import { commands } from "./interactionCreate"

export const readyEvent = async (client: Client) => {
  console.log(client.user?.username+': estoy listo')


  commands.forEach(async ({struct})=> {
    if(!(await client.application?.commands.fetch())?.some(s=> s.name == struct.name)){
      client.application?.commands.create(struct).then(c=> console.log(`Comando ${c.name} creado`))
    }
  })
} 