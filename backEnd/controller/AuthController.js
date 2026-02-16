import { UserModel } from "../models/UserModel.js"
 import jwt from 'jsonwebtoken'

export const register=( async(req,res)=>{
    try{
        const {userName, userId,password, companyName, permission, state}=req.body
        console.log(userName,userId,password)
        const user=await UserModel.findOne({userId})
        console.log(companyName)
        console.log(state)

        if(user)return res.json({success:false,error:"user already exist"})
        
        // const salt=await  bcrypt.genSalt(10)
        // const hash=await bcrypt.hash(password,salt)

        const newUser=await UserModel.create({
           userName,
           userId,
            password,
            companyName:companyName.toLowerCase(),
            permission, 
            state
        })

        console.log(newUser)

          const token=jwt.sign({Id:newUser.userId, role:newUser.userType},process.env.JWT_SECRATE)
        console.log(token)
        res.json({success:true,token,role:newUser.userType, name:newUser.userName, permission:newUser.permission})
    }
    catch(e){
        res.json({success:false,error:e.message})
    }

})


 // ------------------------------------- login -------------------------

export const login =async (req,res)=>{
    try{
    const{userId,password}=req.body
    console.log(userId)
    console.log(password)
    
    const user=await UserModel.findOne({userId})
   
    if(!user){
      return res.json({succes:false,msg:'user not find' })
    }
    console.log(user.password)
     
     if(user.password === password){
      const token=jwt.sign({Id:user.userId,role:user.userType},process.env.JWT_SECRATE)
      console.log(token)
      return res.json({success:true,token, role:user.userType, name:user.userName, permission:user.permission})
  
     }
     else{
      return res.json({
        success:false,
        msg:"you password is wrong "
      })
     }
    
  
  }
  catch(error){
    res.json({succes:false,msg:error.message})
  }
  }

export const alluser=async(req,res)=>{
  try{
    const user=await UserModel.find().sort({_id:-1})

    console.log(user)

    res.json({succes:true,user})
  }
  catch(e){
    res.json({success:true,error:e.message})
  }
}
  
  


//---------------------------------- chanmging password --------------------------
export const changePassword=async(req,res)=>{
  try{
    const{userId,password}=req.body

    const user=await UserModel.findOneAndUpdate({userId},{password:password})
    console.log(user)
    res.json({success:true,user})
  }
  catch(e){
    res.json({success:false, error:e.message})
  }
}

 //-------------------- delete user ----------------

 export const passwordDelete=async(req,res)=>{
  try{
    const userId=req.params.id

    const user=await UserModel.findOneAndDelete({userId:userId})
    console.log(user)
    res.json({success:true,msg:"user deleted success"})
  }
  catch(e){
    res.json({success:false, error:e.message})
  }
}