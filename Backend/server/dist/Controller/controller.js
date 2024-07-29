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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDB = require("../Models/user");
const Experience = require("../Models/Exp");
const Project = require("../Models/Project");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, Email, Password } = req.body;
    try {
        if (!Name || !Email || !Password) {
            return res.status(404).json({ message: "Please provide all credentials Name, Email, Password" });
        }
        // Check if the email already exists
        const existingUser = yield userDB.findOne({ Email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(Password, saltRounds);
        // Create a new user with the hashed password
        const newUser = new userDB({ Email, Name, Password: hashedPassword });
        yield newUser.save();
        return res.status(200).json(newUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
});
const findUsersByNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name1 } = req.query;
    try {
        // Validate the input
        if (!name1) {
            return res.status(400).json({ message: "Please provide all three names." });
        }
        // Find users by any of the names
        const users = yield userDB.find({
            Name: { $in: [name1] }
        }).populate('Experience').populate('Project');
        console.log(users);
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found with the provided names." });
        }
        const resoponse = users.map((user) => ({
            id: user._id,
            name: user.Name,
            Photo: user.Photo
        }));
        console.log({ "finduserAPI": resoponse });
        return res.status(200).json(resoponse);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});
const viewProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { target_id } = req.query;
    try {
        if (!target_id) {
            return res.status(400).json({ message: 'Provide all credentials' });
        }
        const user = yield userDB.findById(target_id)
            .populate('Experience')
            .populate('Project')
            .select('-Password'); // Exclude Password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log({ "viewprofileAPI": user });
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
const addAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { owner_id, target_id } = req.body;
    try {
        if (!target_id || !owner_id) {
            return res.status(400).json({ message: 'Provide all credentials' });
        }
        const user = yield userDB.findById(owner_id);
        if (!user) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        user.access = target_id;
        yield user.save();
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
// const CreateUserProfile = async (req: MulterRequest, res: Response) => {
//     const { Email, Name, Skills, Discription, Experiences, Projects, GithubLink, Linkedin } = req.body;
//     const userPhoto = req.files?.userPhoto?.[0]?.path;
//     // const userPhoto = req.files?.userPhoto?.[0]?.path.replace('uploads/', '');
//     // const userPhoto = req.files?.userPhoto?.[0]?.path.replace(/\\/g, '/'); 
//     const projectPhotos = req.files?.projectPhotos || [];
//     // const projectPhotos = req.files?.projectPhotos?.map((file: any) => file.path.replace('uploads/', '')) || [];
//     // const projectPhotos = req.files?.projectPhotos?.map((file: any) => file.path.replace(/\\/g, '/')) || [];
//     console.log(Email, Name, Skills, Discription, Experiences, Projects, GithubLink, Linkedin);
//     try {
//         if (!Email || !Name) {
//             return res.status(404).json({ message: "Please provide the Email and Name" });
//         }
//         // Create Experience documents and save their IDs
//         const experienceIds = await Promise.all(Experiences.map(async (exp: any) => {
//             const newExperience = new Experience(exp);
//             await newExperience.save();
//             return newExperience._id;
//         }));
//         // Create Project documents and save their IDs
//         const projectIds = await Promise.all(Projects.map(async (proj: any, index: number) => {
//             const newProject = new Project({
//                 ...proj,
//                 // ProjectPhoto: projectPhotos[index]?.path || ""
//                 ProjectPhoto: projectPhotos[index] || ""  // Ensure proper indexing
//             });
//             await newProject.save();
//             return newProject._id;
//         }));
//         // Update user profile with new experience and project IDs
//         const updatedUser = await userDB.findOneAndUpdate(
//             { Email: Email },
//             {
//                 Name,
//                 Skills,
//                 Discription,
//                 Experience: experienceIds,
//                 Project: projectIds,
//                 Photo: userPhoto || "",
//                 GithubLink,
//                 Linkedin
//             },
//             { new: true } // Return the updated document
//         );
//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         return res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error });
//     }
// }
const CreateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { Email, Name, Skills, Discription, Experiences, Projects, GithubLink, Linkedin } = req.body;
    const userPhoto = (_c = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.userPhoto) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.path;
    const projectPhotos = ((_d = req.files) === null || _d === void 0 ? void 0 : _d.projectPhotos) || [];
    console.log(Email, Name, Skills, Discription, Experiences, Projects, GithubLink, Linkedin);
    try {
        if (!Email || !Name) {
            return res.status(404).json({ message: "Please provide the User_ID and Name" });
        }
        // Create Experience documents and save their IDs
        const experienceIds = yield Promise.all(Experiences.map((exp) => __awaiter(void 0, void 0, void 0, function* () {
            const newExperience = new Experience(exp);
            yield newExperience.save();
            return newExperience._id;
        })));
        // Create Project documents and save their IDs
        const projectIds = yield Promise.all(Projects.map((proj, index) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const newProject = new Project(Object.assign(Object.assign({}, proj), { ProjectPhoto: ((_a = projectPhotos[index]) === null || _a === void 0 ? void 0 : _a.path) || "" }));
            yield newProject.save();
            return newProject._id;
        })));
        // Update user profile with new experience and project IDs
        const updatedUser = yield userDB.findOneAndUpdate({ Email: Email }, {
            Name,
            Skills,
            Discription,
            Experience: experienceIds,
            Project: projectIds,
            Photo: userPhoto || "",
            GithubLink,
            Linkedin
        }, { new: true } // Return the updated document
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
});
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Email, Password } = req.body;
    try {
        if (!Email || !Password) {
            return res.status(400).json({ message: "Please provide both Email and Password" });
        }
        // Find user by email
        const user = yield userDB.findOne({ Email }).populate('Experience').populate('Project');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Compare the provided password with the hashed password in the database
        const isMatch = yield bcrypt_1.default.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        // Exclude the password from the response
        const _a = user.toObject(), { Password: _ } = _a, userWithoutPassword = __rest(_a, ["Password"]);
        // Return the user information without the password
        return res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});
module.exports = { Register, CreateUserProfile, viewProfile, Login, findUsersByNames, addAccess };
