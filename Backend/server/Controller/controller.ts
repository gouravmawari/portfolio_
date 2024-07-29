import express, { Express, Request, response, Response } from 'express';
import bcrypt from 'bcrypt';
const userDB = require("../Models/user");
const Experience = require("../Models/Exp");
const Project = require("../Models/Project");

const app: Express = express();
app.use(express.json());

interface MulterRequest extends Request {
    files: {
        userPhoto?: Express.Multer.File[];
        projectPhotos?: Express.Multer.File[];
    };
}

const Register = async (req: Request, res: Response) => {
    const { Name, Email, Password } = req.body;
    try {
        if (!Name || !Email || !Password) {
            return res.status(404).json({ message: "Please provide all credentials Name, Email, Password" });
        }
        const existingUser = await userDB.findOne({ Email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }


        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);


        const newUser = new userDB({ Email, Name, Password: hashedPassword });
        await newUser.save();
        return res.status(200).json(newUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

const findUsersByNames = async (req: Request, res: Response) => {
    const { name1 } = req.query;

    try {

        if (!name1) {
            return res.status(400).json({ message: "Please provide all three names." });
        }

        // Find users by any of the names
        const users = await userDB.find({
            Name: { $in: [name1] }
        }).populate('Experience').populate('Project');
        console.log(users);
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found with the provided names." });
        }
        const resoponse = users.map((user: { _id: any; Name: any; Photo: any; }) =>({
            id: user._id,
            name: user.Name,
            Photo: user.Photo
        }))
        console.log({"finduserAPI":resoponse});
        return res.status(200).json(resoponse);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}
 
const viewProfile = async (req:Request, res:Response) => {
    const { target_id } = req.query;
    try {
        if (!target_id) {
            return res.status(400).json({ message: 'Provide all credentials' });
        }

        const user = await userDB.findById(target_id)
            .populate('Experience')
            .populate('Project')
            .select('-Password'); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log({"viewprofileAPI": user});
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};


const addAccess = async (req: Request, res: Response) => {
    const { owner_id, target_id } = req.body;
    try {
        if (!target_id || !owner_id) {
            return res.status(400).json({ message: 'Provide all credentials' });
        }
        const user = await userDB.findById(owner_id);
        if (!user) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        user.access = target_id;
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};


  


    const CreateUserProfile = async (req: MulterRequest, res: Response) => {
    const { Email, Name, Skills, Discription, Experiences, Projects ,GithubLink,Linkedin} = req.body;
    const userPhoto = req.files?.userPhoto?.[0]?.path;
    const projectPhotos = req.files?.projectPhotos || [];

    console.log(Email, Name, Skills, Discription, Experiences, Projects ,GithubLink,Linkedin)
    try {
        if (!Email || !Name) {
            return res.status(404).json({ message: "Please provide the User_ID and Name" });
        }

        // Create Experience documents and save their IDs
        const experienceIds = await Promise.all(Experiences.map(async (exp: any) => {
            const newExperience = new Experience(exp);
            await newExperience.save();
            return newExperience._id;
        }));

   
        const projectIds = await Promise.all(Projects.map(async (proj: any, index: number) => {
            const newProject = new Project({
                ...proj,
                ProjectPhoto: projectPhotos[index]?.path || ""
            });
            await newProject.save();
            return newProject._id;
        }));


 
        const updatedUser = await userDB.findOneAndUpdate(
            { Email: Email   },
            {
                Name,
                Skills,
                Discription,
                Experience: experienceIds,
                Project: projectIds,
                Photo: userPhoto || "",
                GithubLink,
                Linkedin
            },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(updatedUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

const Login = async (req: Request, res: Response) => {
    const { Email, Password } = req.body;

    try {
        if (!Email || !Password) {
            return res.status(400).json({ message: "Please provide both Email and Password" });
        }


        const user = await userDB.findOne({ Email }).populate('Experience').populate('Project');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }


        const { Password: _, ...userWithoutPassword } = user.toObject();


        return res.status(200).json(userWithoutPassword);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = { Register,CreateUserProfile,viewProfile,Login,findUsersByNames,addAccess };





