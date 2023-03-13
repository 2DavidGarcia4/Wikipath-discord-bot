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
exports.readyEvent = void 0;
const interactionCreate_1 = require("./interactionCreate");
const readyEvent = (client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(((_a = client.user) === null || _a === void 0 ? void 0 : _a.username) + ': estoy listo');
    interactionCreate_1.commands.forEach(({ struct }) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c, _d;
        if (!((_c = (yield ((_b = client.application) === null || _b === void 0 ? void 0 : _b.commands.fetch()))) === null || _c === void 0 ? void 0 : _c.some(s => s.name == struct.name))) {
            (_d = client.application) === null || _d === void 0 ? void 0 : _d.commands.create(struct).then(c => console.log(`Comando ${c.name} creado`));
        }
    }));
});
exports.readyEvent = readyEvent;
