import {v2 as cloudinary} from 'cloudinary'
import { CompanyModel } from '../models/CompanyModel.js'
import { UserModel } from '../models/UserModel.js'
import { companySales } from './InvoiceController.js'

//------------------------ adding  company ----------------

export const addCompany=async(req,res)=>{
    try{
        const{companyName,email,address,phoneNumber,state}=req.body
        const {token}=req.headers

        const image=req.file.path

        console.log(image)
        const imageUrl=(await (cloudinary.uploader.upload(image))).secure_url
        console.log(imageUrl)
        console.log(token)
        console.log("what happen")
        console.log(req.userId)
        const user=await UserModel.findOne({userId:req.userId.Id})
        console.log(user)
        const company=await CompanyModel.create({
            companyName,
            email,
            address,
            phoneNumber,
            imageUrl,
            address,
            state,
            user:user._id
        })

        user.company.push(company._id)
        user.save()

        res.json({success:true, company})
    }
    catch(e){
        res.json({success:false,error:e.message})
    }
    
}

// -------------------------getting all companies ---------------

export const getCompany= async(req,res)=>{
        try{
          
            console.log('hii')
        //     const user=await UserModel.findOne({userId:req.userId.Id}).populate('company')

        //    company=user.company
        //    company.reverse()
        const company=await CompanyModel.find().sort({ _id: -1 })
        console.log(company)
        res.json({success:true,company})
        }
        catch(e){
            res.json({success:false, error:e.message})
        }
}


// ---------------- geting user specific company ------------------

export const stateSpecificCompany=async(req,res)=>{
    try{
const user=await UserModel.findOne({userId:req.userId.Id})
console.log(user.state)
const company=await CompanyModel.find({state:user.state})
console.log(company)
res.json({success:true,company})
    }
    catch(e){
        console.log(e.message)
    }
}


//------------------- edit company by id --------------------

export const editCompany=async(req,res)=>{
    try{
        const{formData,id}=req.body
        const company=await CompanyModel.findOne({_id:id})
        console.log(formData)
        if(formData.phone !==''){
            company.phoneNumber=formData.phone
        }
        if(formData.city !==''){
            company.state=formData.city
        }
        if(formData.address !==''){
            company.address=formData.address
        }
        await company.save()

        res.json({success:true,msg:"update successfully"})
    }
    catch(e){
        res.json({success:false,error:e.message})
    }
}






