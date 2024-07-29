"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Exp_schema = new mongoose_1.default.Schema({
    Position: {
        type: String
    },
    Company_Name: {
        type: String
    },
    Website_URL: {
        type: String
    },
    Discription: {
        type: String
    }
});
const project = mongoose_1.default.model('Exp_schema', Exp_schema);
module.exports = project;
