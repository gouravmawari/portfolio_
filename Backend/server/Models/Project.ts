import  mongoose  from "mongoose";
const project_schema = new mongoose.Schema({
    Name:{
        type:String
    },
    ProjectPhoto:{
        type:String,
    },
    Project_Discription:{
        type:String
    }
})
const project = mongoose.model('project',project_schema);
module.exports = project;