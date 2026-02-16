import mongoose, { Schema } from "mongoose";

const itemSchema=new mongoose.Schema({
    softwareName:{
        type:String
    },
    validityPeriod:{
        type:String
    },
    paymentType:{
        type:String,
        default:'ONLINE'
    },
    billingDate:{
        type:String,
    },
    des:{
        type:String,
        default:'Project Management & Software Fee, document scanning & uploading, employers commission, and other charges'
    },
    Amount:{
        type:Number
    },
    ItemType:{
    type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
   
},

{ timestamps: true } )
export const ItemModel=mongoose.model('item',itemSchema)



