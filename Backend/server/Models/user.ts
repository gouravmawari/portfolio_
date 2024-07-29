
import  mongoose  from "mongoose";
const schema = new mongoose.Schema({
    Email:{
        type:String,
        unique:true,
        require:true
    },
    Name:{
        type:String,
    },
    Password:{
        type:String
    },
    Discription:{
        type:String,
    },
    Skills:[{
        type:String,
    }],
    Experience:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exp_schema'
    }],
    Photo:{
        type:String
    },
    Project:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    }],
    access:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'hello+new_'
    },
    GithubLink:{
        type:String
    },
    Linkedin:{
        type:String
    }

})
const port_userDB = mongoose.model('hello+new_',schema);
module.exports = port_userDB;