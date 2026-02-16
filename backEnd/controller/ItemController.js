import { ItemModel } from "../models/ItemModel.js"
import { UserModel } from "../models/UserModel.js"

export const getAllItem=async(req,res)=>{
    try{

        const items= await ItemModel.find().sort({ _id: -1 })
        console.log(items)

        res.json({success:true,items})
        
    }
    catch(e){
        console.log(e.message)
        res.json({success:false,items})
    }
}
 // ---------------- creating the item ----------------------
export const createItem=async(req,res)=>{
    try{
        const{softwareName, validityPeriod,  date, Amount, des,}=req.body
        console.log("Ab")
        const user=await UserModel.findOne({userId:req.userId.Id})
        console.log(user)
        const item= await ItemModel.create({
            softwareName,
            validityPeriod,
            billingDate:date,
            Amount,
            des,
            user:user._id
        });
        user.item.push(item._id)
        await user.save()

        
        res.json({success:true, item})
    }
    catch(e){
        res.json({success:false, error:e.message})
    }
}


 // ---------------- delete item ----------------------

 export const  deleteItem=async(req,res)=>{
    try{
        const id=req.params.id
        const  item=await ItemModel.findOneAndDelete({_id:id})
        console.log(item)
        res.json({success:true,msg:'item deleted success'})
    }
    catch(e){
        res.json({success:true,error:e.message})
    }
 }


 // ----------------- edit item -------------------

 export const EditItem=async(req, res)=>{
   try{
     const{id,validityPeriod,softwareName,Amount,des}=req.body
 
     
     console.log(id)
     const item=await ItemModel.findOne({_id:id})
     console.log(item)
 
     if(validityPeriod !==''){
       item.validityPeriod=validityPeriod
     }
     if(softwareName !==''){
       item.softwareName=softwareName
     }
     if(Amount !==''){
       item.Amount=Amount
     }
     if(des !==''){
       item.des=des
     }
  
     await item.save()
     console.log(item)
     res.json({success:true, msg:"updated successfully"})
   }
   catch(e){
     console.log(e.message)
     res.json({success:true, error:e.message})
   }
 }
 