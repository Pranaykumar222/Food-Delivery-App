import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    category : String,
    price:{
        type : Number,
        required : true
    },
    availability:{
        type : Boolean,
        default : true
    }
})

const Menu = mongoose.model("Menu",menuSchema);

export default Menu;