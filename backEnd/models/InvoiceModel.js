import mongoose from "mongoose";

const invoiceSchema=new mongoose.Schema({

    InvoiceNumber:{
        type:String
    },
    clientName:{
        type:String
    },
    clientEmail:{
        type:String
    },
    clientPhone:{
        type:String
    },
    clientAddress:{
        type:String
    },
    state:{
        type:String
    },

    companyName:{
        type:String
    },

    companyEmail:{
        type:String
    },

    companyPhone:{
        type:String 
    },
    companyAddress:{
        type:String 
    },

    imageUrl:{
        type:String
    },

    totalAmount:{
        type:Number
    },
    amountReceive:{
        type:Number
    },

    item:[
        {
            softwareName:{type:String},
            validityPeriod:{type:String},
            paymentType:{type:String},
            des:{type:String},
            Amount:{type:Number}
        }
    ],

    date:{
        type:Date
    },
    dueDate:{
        type:String
    },
    transectionId:{
        type:String
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

    company:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'company'
    }]

},
{ timestamps: true } 
)

export const InvoiceModel=mongoose.model('invoice',invoiceSchema)