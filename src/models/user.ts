import mongoose from "mongoose";
import {IUser} from "../@type/user";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
    },
    
    password:{
        type:String,
    },
});

export default mongoose.model<IUser&mongoose.Document>("User",UserSchema);