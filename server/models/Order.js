import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    items:[
        {
        menuItem : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Menu"
        },
        quantity : Number
    }
    ],
    totalAmount : Number,
    status: { 
        type: String, 
        enum: ['Pending', 'Preparing', 'Out for delivery', 'Delivered'], 
        default: 'Pending' 
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
})

const Order = mongoose.model("Order",orderSchema);

export default Order;