const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Vilay123:Hungryvilay@cluster0.nfg6fbr.mongodb.net/Notes");

const UserSchema = new mongoose.Schema({
    username: {type:String, required: true},
    password: {type:String, required: true},
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
})

const NotesSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId , ref: "Users", required:true},
    title: {type:String, required:true},
    content: {type:String, required:true}
})

const User = mongoose.model("Users",UserSchema);
const Notes = mongoose.model("Notes",NotesSchema);

module.exports={User,Notes}