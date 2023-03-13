import { CacheType, ChatInputCommandInteraction, Client, Collection, Interaction, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

import { serversSlashCommand, serversScb } from "../commands/slash/servers";

export const commands = new Collection<string, {struct: RESTPostAPIApplicationCommandsJSONBody, run: (int: ChatInputCommandInteraction<CacheType>, Client: Client)=> void}>()
commands.set(serversScb.name, {struct: serversScb, run: serversSlashCommand})

export const interactionCreateEvent = async (int: Interaction<CacheType>, Client: Client) => {
  
  if(int.isChatInputCommand()){
    const { guild, user, commandName } = int

    const command = commands.get(commandName)
    if(command) command.run(int, Client)
  }
}