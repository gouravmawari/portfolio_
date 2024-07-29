import express from 'express';
import multer from 'multer';
import path from 'path'; 

const { Register, CreateUserProfile, Login, findUsersByNames, viewProfile, addAccess } = require("../Controller/controller");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post('/register', Register);
router.get('/find', findUsersByNames);
router.get('/showprofile', viewProfile);
router.post('/addaccess', addAccess);
router.post('/create-user-profile', upload.fields([
    { name: 'userPhoto', maxCount: 1 },
    { name: 'projectPhotos', maxCount: 10 }
]), CreateUserProfile);
router.post('/login', Login);

router.get('/photo/:filename', (req, res) => {
    const { filename } = req.params;
    console.log(filename);
    const options = {
        root: path.join(__dirname, '../../uploads')
    };

    res.sendFile(filename, options, (err) => {
        if (err) {
            console.error(err);
            res.status(404).json({ message: 'File not found' });
        }
    });
});

module.exports = router;






