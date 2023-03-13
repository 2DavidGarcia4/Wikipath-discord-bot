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
exports.getServersData = exports.selectiveSlashMenu = exports.selectiveTextMenu = exports.sendMessageText = exports.sendMessageSlash = void 0;
const discord_js_1 = require("discord.js");
const sendMessageSlash = (int, optionsMessage) => {
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield int.editReply(optionsMessage);
    }), 3000);
};
exports.sendMessageSlash = sendMessageSlash;
const sendMessageText = (msg, optionsMessage) => {
    setTimeout(() => {
        msg.reply(optionsMessage);
    }, 3000);
};
exports.sendMessageText = sendMessageText;
const selectiveTextMenu = (msg, config) => __awaiter(void 0, void 0, void 0, function* () {
    const { SelectiveEb, lsitElements } = config;
    const SelectiveMenu = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.StringSelectMenuBuilder()
        .setCustomId('server-list')
        .setPlaceholder(`👉 Selecciona un servidor.`)
        .setOptions(lsitElements.map((e, i) => ({
        emoji: e.emoji,
        label: e.title,
        value: e.title.toLowerCase(),
        default: i == 0 ? true : false
    })))).toJSON();
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        const serversMessage = yield msg.reply({ allowedMentions: { repliedUser: false }, embeds: [SelectiveEb], components: [SelectiveMenu] });
        const serversCollection = serversMessage.createMessageComponentCollector({ time: lsitElements.length * 60000 });
        serversCollection.on('collect', (menu) => __awaiter(void 0, void 0, void 0, function* () {
            if (menu.isStringSelectMenu()) {
                const { values } = menu;
                const element = lsitElements.find(({ title }) => title.toLowerCase() == values[0]);
                if (element) {
                    SelectiveEb.setTitle(element.title)
                        .setDescription(element.description);
                    SelectiveMenu.components[0].options.forEach(o => {
                        if (o.value == element.title.toLowerCase())
                            o.default = true;
                        else if (typeof o.default != 'undefined')
                            o.default = undefined;
                    });
                    yield menu.update({ embeds: [SelectiveEb], components: [SelectiveMenu] });
                }
            }
        }));
        serversCollection.on('end', () => {
            serversMessage.edit({ embeds: [SelectiveEb], components: [] });
        });
    }), 3000);
});
exports.selectiveTextMenu = selectiveTextMenu;
const selectiveSlashMenu = (int, config) => __awaiter(void 0, void 0, void 0, function* () {
    const { SelectiveEb, lsitElements } = config;
    const SelectiveMenu = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.StringSelectMenuBuilder()
        .setCustomId('server-list')
        .setPlaceholder(`👉 Selecciona un servidor.`)
        .setOptions(lsitElements.map((e, i) => ({
        emoji: e.emoji,
        label: e.title,
        value: e.title.toLowerCase(),
        default: i == 0 ? true : false
    })))).toJSON();
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        const serversMessage = yield int.editReply({ allowedMentions: { repliedUser: false }, embeds: [SelectiveEb], components: [SelectiveMenu] });
        const serversCollection = serversMessage.createMessageComponentCollector({ time: lsitElements.length * 60000 });
        serversCollection.on('collect', (menu) => __awaiter(void 0, void 0, void 0, function* () {
            if (menu.isStringSelectMenu()) {
                const { values } = menu;
                const element = lsitElements.find(({ title }) => title.toLowerCase() == values[0]);
                if (element) {
                    SelectiveEb.setTitle(element.title)
                        .setDescription(element.description);
                    SelectiveMenu.components[0].options.forEach(o => {
                        if (o.value == element.title.toLowerCase())
                            o.default = true;
                        else if (typeof o.default != 'undefined')
                            o.default = undefined;
                    });
                    yield menu.update({ embeds: [SelectiveEb], components: [SelectiveMenu] });
                }
            }
        }));
        serversCollection.on('end', () => {
            serversMessage.edit({ embeds: [SelectiveEb], components: [] });
        });
    }), 3000);
});
exports.selectiveSlashMenu = selectiveSlashMenu;
const serversChannelId = '1084904045409468517';
const getServersData = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = client.channels.cache.get(serversChannelId);
    if ((channel === null || channel === void 0 ? void 0 : channel.type) == discord_js_1.ChannelType.GuildText) {
        const messages = (yield channel.messages.fetch({ limit: 90 })).filter(({ content }) => content.split('|').length >= 4).map(({ content }) => {
            const texts = content.split('|');
            return {
                lenguage: 'es',
                emoji: texts[0].replace(/\n/g, '').trim(),
                color: texts[1].replace(/\n/g, '').trim(),
                title: texts[2].replace(/\n/g, '').trim(),
                description: texts[3]
            };
        });
        return messages.reverse();
    }
});
exports.getServersData = getServersData;
