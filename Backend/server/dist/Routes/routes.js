"use strict";
// import express from 'express';
// import multer from 'multer';
// const { Register, CreateUserProfile, Login, findUsersByNames, viewProfile, addAccess } = require("../Controller/controller");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Set the destination folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Set the file name
//     }
// });
// const upload = multer({
//     dest: 'uploads/', // Destination folder for uploaded files
//     limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
// });
// // Register the existing routes
// router.post("/register", (req, res) => Register(req, res));
// router.get("/find", (req, res) => findUsersByNames(req, res));
// router.get("/showprofile", (req, res) => viewProfile(req, res));
// router.post("/addaccess", (req, res) => addAccess(req, res));
// router.post('/create-user-profile', upload.fields([
//     { name: 'userPhoto', maxCount: 1 },
//     { name: 'projectPhotos', maxCount: 10 }
// ]), (req, res) => CreateUserProfile(req as any, res)); // Cast to `any` for multer request handling
// router.post("/login", (req, res) => Login(req, res));
// // Serve static files from the uploads directory
// router.use('/uploads', express.static('uploads'));
// // New route to fetch photos by filename
// router.get('/photo/:filename', (req, res) => {
//     const { filename } = req.params;
//     const options = {
//         root: path.join(__dirname, '../uploads')
//     };
//     res.sendFile(filename, options, (err) => {
//         if (err) {
//             console.error(err);
//             res.status(404).json({ message: 'File not found' });
//         }
//     });
// });
// module.exports = router;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path")); // Import the path module
const { Register, CreateUserProfile, Login, findUsersByNames, viewProfile, addAccess } = require("../Controller/controller");
const router = express_1.default.Router();
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Set the destination folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Set the file name
//     }
// });
// const upload = multer({
//     dest: 'uploads/', // Destination folder for uploaded files
//     limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
// });
// // Register the existing routes
// router.post("/register", (req, res) => Register(req, res));
// router.get("/find", (req, res) => findUsersByNames(req, res));
// router.get("/showprofile", (req, res) => viewProfile(req, res));
// router.post("/addaccess", (req, res) => addAccess(req, res));
// router.post('/create-user-profile', upload.fields([
//     { name: 'userPhoto', maxCount: 1 },
//     { name: 'projectPhotos', maxCount: 10 }
// ]), (req, res) => CreateUserProfile(req as any, res)); // Cast to `any` for multer request handling
// router.post("/login", (req, res) => Login(req, res));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/register', Register);
router.get('/find', findUsersByNames);
router.get('/showprofile', viewProfile);
router.post('/addaccess', addAccess);
router.post('/create-user-profile', upload.fields([
    { name: 'userPhoto', maxCount: 1 },
    { name: 'projectPhotos', maxCount: 10 }
]), CreateUserProfile);
router.post('/login', Login);
// Serve static files from the uploads directory
// router.use('/uploads', express.static('uploads'));
// New route to fetch photos by filename
// router.get('/photo/:filename', (req, res) => {
//     const { filename } = req.params;
//     console.log(filename);
//     const options = {
//         root: path.join(__dirname, '.../uploads')
//     };
//     res.sendFile(filename, options, (err) => {
//         if (err) {
//             console.error(err);
//             res.status(404).json({ message: 'File not found' });
//         }
//     });
// });
router.get('/photo/:filename', (req, res) => {
    const { filename } = req.params;
    console.log(filename);
    const options = {
        root: path_1.default.join(__dirname, '../../uploads')
    };
    res.sendFile(filename, options, (err) => {
        if (err) {
            console.error(err);
            res.status(404).json({ message: 'File not found' });
        }
    });
});
module.exports = router;
// import express from 'express';
// import multer from 'multer';
// const { Register, CreateUserProfile, Login ,findUsersByNames,viewProfile,addAccess} = require("../Controller/controller");
// const router = express.Router();
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Set the destination folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Set the file name
//     }
// });
// // const upload = multer({ storage: storage });
// const upload = multer({
//     dest: 'uploads/', // Destination folder for uploaded files
//     limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
// });
// router.post("/register", (req, res) => Register(req, res));
// router.get("/find", (req, res) => findUsersByNames(req, res));
// router.get("/showprofile", (req, res) => viewProfile(req, res));
// router.post("/addaccess", (req, res) => addAccess(req, res));
// router.post('/create-user-profile', upload.fields([
//     { name: 'userPhoto', maxCount: 1 },
//     { name: 'projectPhotos', maxCount: 10 }
// ]), (req, res) => CreateUserProfile(req as any, res)); // Cast to `any` for multer request handling
// router.post("/login", (req, res) => Login(req, res));
// router.get('/photo/:filename', (req, res) => {
//     const { filename } = req.params;
//     const options = {
//         root: path.join(__dirname, '../uploads')
//     };
//     res.sendFile(filename, options, (err) => {
//         if (err) {
//             console.error(err);
//             res.status(404).json({ message: 'File not found' });
//         }
//     });
// });
// module.exports = router;
// import express from 'express';
// import multer from 'multer';
// const { Register, CreateUserProfile, Login, findUsersByNames, viewProfile, addAccess } =require('../Controller/controller');
// const router = express.Router();
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     },
// });
// const upload = multer({ storage: storage });
// router.post('/register', Register);
// router.get('/find', findUsersByNames);
// router.get('/showprofile', viewProfile);
// router.post('/addaccess', addAccess);
// router.post('/create-user-profile', upload.fields([
//     { name: 'userPhoto', maxCount: 1 },
//     { name: 'projectPhotos', maxCount: 10 }
// ]), CreateUserProfile);
// router.post('/login', Login);
// export default router;
