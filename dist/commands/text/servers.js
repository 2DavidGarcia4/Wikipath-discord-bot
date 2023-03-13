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
exports.serversCommand = void 0;
const discord_js_1 = require("discord.js");
const utils_1 = require("../../utils");
const serversCommand = (msg, client) => __awaiter(void 0, void 0, void 0, function* () {
    const servers = yield (0, utils_1.getServersData)(client);
    yield msg.channel.sendTyping();
    const ServersEb = new discord_js_1.EmbedBuilder();
    if (servers) {
        const firtsServer = servers[0];
        const embedColor = firtsServer.color == 'null' ? undefined : firtsServer.color;
        ServersEb
            .setTitle(firtsServer.title)
            .setDescription(firtsServer.description)
            .setColor(embedColor || '#7e634e');
        if (servers.length <= 1) {
            (0, utils_1.sendMessageText)(msg, { embeds: [ServersEb] });
        }
        else {
            const lsitElements = servers.map(({ emoji, color, title, description }) => ({
                emoji: emoji == 'null' ? undefined : emoji,
                color: color == 'null' ? undefined : color,
                title,
                description
            }));
            (0, utils_1.selectiveTextMenu)(msg, {
                SelectiveEb: ServersEb,
                lsitElements
            });
        }
    }
    else {
        ServersEb
            .setTitle('Error')
            .setDescription('No hay datos de servidores o ha ocurido un error al obtenerlos.')
            .setColor('DarkRed');
        (0, utils_1.sendMessageText)(msg, { embeds: [ServersEb] });
    }
});
exports.serversCommand = serversCommand;
