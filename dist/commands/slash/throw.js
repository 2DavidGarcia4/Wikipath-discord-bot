"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwSlashCommand = exports.throwScb = void 0;
const discord_js_1 = require("discord.js");
exports.throwScb = new discord_js_1.SlashCommandBuilder()
    .setName('throw')
    .setNameLocalization('es-ES', 'tirar')
    .setDescription('🎲 Throw dice.')
    .setDescriptionLocalization('es-ES', '🎲 Tirar dado.').toJSON();
const throwSlashCommand = (int) => {
    const nameFiles = [
        'black-reno',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six'
    ];
    const diceFace = new discord_js_1.AttachmentBuilder(`images/${nameFiles[Math.floor(Math.random() * nameFiles.length)]}.png`, { name: 'diceFace.png' });
    int.reply({ files: [diceFace] });
};
exports.throwSlashCommand = throwSlashCommand;
