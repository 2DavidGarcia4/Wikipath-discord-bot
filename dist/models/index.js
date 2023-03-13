"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupModel = void 0;
const mongoose_1 = require("mongoose");
exports.backupModel = (0, mongoose_1.model)('backup', new mongoose_1.Schema({
    _id: { type: String, required: true },
    messages: { type: Array, required: true }
}));
