"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    Email: {
        type: String,
        unique: true,
        require: true
    },
    Name: {
        type: String,
    },
    Password: {
        type: String
    },
    Discription: {
        type: String,
    },
    Skills: [{
            type: String,
        }],
    Experience: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Exp_schema'
        }],
    Photo: {
        type: String
    },
    Project: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'project'
        }],
    access: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'hello+new_'
    },
    GithubLink: {
        type: String
    },
    Linkedin: {
        type: String
    }
});
const port_userDB = mongoose_1.default.model('hello+new_', schema);
module.exports = port_userDB;
