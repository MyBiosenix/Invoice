import mongoose from "mongoose";

const companySchema=new mongoose.Schema({
    imageUrl:{
        type:String
    },
    companyName:{
        type:String
    },
    email:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    address:{
        type:String
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    state:{
        type:String 
    },

    invoice:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'invoice'
    }]
},


)


export const CompanyModel=mongoose.model('company',companySchema)