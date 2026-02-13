import mongoose from "mongoose";

const coustomerSchema=new mongoose.Schema({
    fullName:{
        type:String
    },

    Email:{
        type:String
    },
    Contact:{
        type:String
    },
    Address:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
},
{ timestamps: true } 
)

export const CoustomerModel=mongoose.model('coustomer',coustomerSchema)