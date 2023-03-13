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
exports.interactionCreateEvent = exports.commands = void 0;
const discord_js_1 = require("discord.js");
const servers_1 = require("../commands/slash/servers");
exports.commands = new discord_js_1.Collection();
exports.commands.set(servers_1.serversScb.name, { struct: servers_1.serversScb, run: servers_1.serversSlashCommand });
const interactionCreateEvent = (int, Client) => __awaiter(void 0, void 0, void 0, function* () {
    if (int.isChatInputCommand()) {
        const { guild, user, commandName } = int;
        const command = exports.commands.get(commandName);
        if (command)
            command.run(int, Client);
    }
});
exports.interactionCreateEvent = interactionCreateEvent;
