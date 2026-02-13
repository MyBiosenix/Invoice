import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    userName:{
        type:'String'
    },
    userId:{
        type:String
    },
    password:{
        type:String
    },

    role:{
        type:String
    },
    userType:{
        type:String,
        default:"normal"
    },
     state:{
        type:'string'
     },
    permission:{
        type:String,
        enum:['view','edit']
    },
    companyName:{
        type:String,
        enum:[
  'octagate',
  'avioliv',
  'tech2shinelabs',
  'acewok',
  'isimple solutions',
  'tenr global solution',
  'surestep',
  'techiqlabs',
  'inquiniti technologies'
]

    },
    company:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'company'
    }],
    coustomer:[{
         type:mongoose.Schema.Types.ObjectId,
        ref:'coustomer'
    }],
    item:[{
         type:mongoose.Schema.Types.ObjectId,
        ref:'item'
    }],
    invoice:[
        {
             type:mongoose.Schema.Types.ObjectId,
            ref:'invoice'
        }
    ]
}, 
{ timestamps: true } 
)
export const UserModel=mongoose.model('user',UserSchema)