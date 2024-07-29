"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const project_schema = new mongoose_1.default.Schema({
    Name: {
        type: String
    },
    ProjectPhoto: {
        type: String,
    },
    Project_Discription: {
        type: String
    }
});
const project = mongoose_1.default.model('project', project_schema);
module.exports = project;
