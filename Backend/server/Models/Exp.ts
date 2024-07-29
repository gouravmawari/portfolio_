import  mongoose  from "mongoose";
const Exp_schema = new mongoose.Schema({
    Position:{
        type:String
    },
    Company_Name:{
        type:String
    },
    Website_URL:{
        type:String
    },
    Discription:{
        type:String
    }
})
const project = mongoose.model('Exp_schema',Exp_schema);
module.exports = project;