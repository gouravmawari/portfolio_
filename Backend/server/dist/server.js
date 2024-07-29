"use strict";
// import express, { Express } from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import path from 'path';
// const app: Express = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.use("/api", require("./Routes/routes"));
// const dbURI = "mongodb+srv://guddu:guddu@cluster1.ved7bni.mongodb.net/yes?retryWrites=true&w=majority";
// mongoose.connect(dbURI)
//     .then(() => {
//         const PORT = 8000;
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch((err) => console.log(err));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api", require("./Routes/routes"));
const dbURI = "mongodb+srv://guddu:guddu@cluster1.ved7bni.mongodb.net/yes?retryWrites=true&w=majority";
mongoose_1.default.connect(dbURI)
    .then(() => {
    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => console.log(err));
// // const express = require("express");
// import express,{Express,Request,Response} from 'express';
// import mongoose, { connect } from "mongoose";
// import cors from 'cors';
// const app :Express = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/api",require("./Routes/routes"));
// const dbURI = "mongodb+srv://guddu:guddu@cluster1.ved7bni.mongodb.net/yes?retryWrites=true&w=majority";
// mongoose.connect(dbURI,)
//     .then((result) => {
//         const PORT = 8000;
//         app.listen(PORT, () => {
//             console.log("server is created")
//         })
//     })
//     .catch((err) => console.log(err))  
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
