"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwCommand = void 0;
const discord_js_1 = require("discord.js");
const throwCommand = (msg) => {
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
    msg.reply({ files: [diceFace] });
};
exports.throwCommand = throwCommand;
