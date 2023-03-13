"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const db_1 = require("./db");
const ready_1 = require("./events/ready");
const interactionCreate_1 = require("./events/interactionCreate");
const servers_1 = require("./commands/text/servers");
const Wikipath = new discord_js_1.Client({ intents: 131071 });
Wikipath.on('ready', () => {
    (0, ready_1.readyEvent)(Wikipath);
});
Wikipath.on('messageCreate', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (msg.author.bot)
        return;
    if (!msg.content.startsWith(db_1.botDb.prefix))
        return;
    const args = msg.content.slice(db_1.botDb.prefix.length).trim().split(/ +/g);
    const command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (command == 'servers')
        (0, servers_1.serversCommand)(msg, Wikipath);
}));
Wikipath.on('interactionCreate', (interaction) => {
    (0, interactionCreate_1.interactionCreateEvent)(interaction, Wikipath);
});
//! Errors events
Wikipath.on("shardError", (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(err);
}));
process.on("unhandledRejection", (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(err);
}));
Wikipath.login(config_1.tokenBot);
