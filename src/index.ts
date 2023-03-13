import { ChannelType, Client } from "discord.js";
import { tokenBot } from "./config";
import { botDb } from './db'

import { readyEvent } from "./events/ready";
import { interactionCreateEvent } from "./events/interactionCreate";

import { serversCommand } from "./commands/text/servers";

const Wikipath = new Client({intents: 131071})

Wikipath.on('ready', () => {
  readyEvent(Wikipath)
})

Wikipath.on('messageCreate', async msg => {
  if(msg.author.bot) return

  if(!msg.content.startsWith(botDb.prefix)) return
  const args = msg.content.slice(botDb.prefix.length).trim().split(/ +/g)
  const command = args.shift()?.toLowerCase()

  
  if(command == 'servers') serversCommand(msg, Wikipath)
})

Wikipath.on('interactionCreate', (interaction) => {
  interactionCreateEvent(interaction, Wikipath)
})

//! Errors events
Wikipath.on("shardError", async err => {
  console.log(err)
})

process.on("unhandledRejection", async err => {
  console.log(err)
})

Wikipath.login(tokenBot)