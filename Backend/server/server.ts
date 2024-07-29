
import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

const app: Express = express();
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/api", require("./Routes/routes"));

const dbURI = "mongodb+srv://guddu:guddu@cluster1.ved7bni.mongodb.net/yes?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then(() => {
        const PORT = 8000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));


