import { assets } from '@/assets/assets'
import { InvoiceContext } from '@/Context/InvoiceContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Skeleton } from "@/components/ui/skeleton"


const AddCompany = () => {
    const [image,setimage]=useState('')
    const [email,setEmail]=useState('')
    const[companyName,setCompanyName]=useState('')
    const[phoneNumber,setPhoneNumber]=useState('')
    const[address,setAddress]=useState('')
    const[loading,setLoading]=useState(false)
    const[state,setState]=useState('')

    // query ,setQuery
    const[query,setQuery]=useState('')
    //context
    const{token, backendUrl, navigate, role}=useContext(InvoiceContext)

    useEffect(()=>{
      if(role !=='admin'){
        navigate('/home/company')
      }
    },[token,role])


    //adding data info form 
    const formData =new FormData()
    formData.append("companyName",companyName)
    formData.append('email',email)
    formData.append('phoneNumber',phoneNumber)
    formData.append('address',address)
    formData.append('state',state)
    formData.append('image',image)
    // handle submit 
    
    const handleSubmit=async()=>{
        try{
          
          if(!image || !companyName || !email || !address || !phoneNumber ){
            toast.error("all field required")
          }
          setLoading(true)
            const response=await axios.post(`${backendUrl}/addcompany`,formData,{headers:{token}})
            console.log(response)
            if(response.data.success === true){
              toast.success("company added successfully ")
              navigate('/home/company')
              
            }
        }
        catch(e){
            console.log(e.message)
            toast.error(e.message)
        }
        finally{
          setLoading(false)
        }
    }

  return (
    <div>


      {/* ===================== */}
{/* Company Form Card */}
{/* ===================== */}

{
  loading ?



    <div className="flex w-full max-w-xs flex-col gap-7  place-self-center">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>

  :
  <div className="
  mt-10 w-[95%] sm:w-[55vw] mx-auto
  rounded-xl border border-gray-200
  bg-white shadow-sm
">

  {/* Header */}
  <div className="px-6 py-5 border-b border-gray-200">
    <h1 className="text-lg font-semibold text-gray-900">
      Company Information
    </h1>
    <p className="text-sm text-gray-500 mt-1">
      Enter your company details below
    </p>
  </div>

  {/* Form */}
  <div className="p-6 space-y-6">

    {/* Logo upload */}
    <div className="flex items-center gap-6">
      <div className="
        w-20 h-20 rounded-lg border border-gray-200
        flex items-center justify-center bg-gray-50
      ">
        <img
          src={ !image ? assets.imageplaceholder : URL.createObjectURL(image)}
          alt="Company Logo"
          className="object-contain w-full h-full"
        />
      </div>

      <label className="text-sm text-gray-600 cursor-pointer">
        <span className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
          Upload Logo
        </span>
        <input type="file" accept="image/*"  onChange={(e)=>{setimage(e.target.files[0])}} hidden />
      </label>
    </div>

    {/* Input fields */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

      {/* Company Name */}
      <div className="space-y-1">
        <label className="text-sm text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          required
          onChange={(e)=>{setCompanyName(e.target.value)}}
          value={companyName}
          placeholder="ABC Technologies Pvt Ltd"
          className="
            w-full px-3 py-2.5
            border border-gray-300 rounded-md
            text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-sm text-gray-700">
          Business Email
        </label>
        <input
        required
          type="email"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          placeholder="contact@company.com"
          className="
            w-full px-3 py-2.5
            border border-gray-300 rounded-md
            text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      </div>

      {/* Contact */}
      <div className="space-y-1">
        <label className="text-sm text-gray-700">
          Contact Number
        </label>
        <input
        required
          type="tel"
          value={phoneNumber}
          onChange={(e)=>{setPhoneNumber(e.target.value)}}
          placeholder="+91 98765 43210"
          className="
            w-full px-3 py-2.5
            border border-gray-300 rounded-md
            text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      </div>
          {/* state */}
       <div className="space-y-1">
        <label className="text-sm text-gray-700">
          Enter the State
        </label>
        <input
        required
          type="text"
          value={state}
          onChange={(e)=>{setState(e.target.value)}}
          placeholder="uttar pradesh"
          className="
            w-full px-3 py-2.5
            border border-gray-300 rounded-md
            text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      </div>

      {/* Address */}
      <div className="space-y-1 sm:col-span-2">
        <label className="text-sm text-gray-700">
          Company Address
        </label>
        <textarea
        required
          rows={3}
          onChange={(e)=>{setAddress(e.target.value)}}
          placeholder="Enter registered company address"
          className="
            w-full px-3 py-2.5
            border border-gray-300 rounded-md
            text-sm resize-none
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      </div>
    </div>

    {/* Actions */}
    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
     

      <button
      onClick={()=>{handleSubmit()}}
        type="submit"
        className="
          px-5 py-2 text-sm font-medium
          text-white bg-blue-600
          rounded-md
          hover:bg-blue-700
        "
      >
        {}
        Save
      </button>
    </div>

  </div>
</div>
}


    </div>
  )
}

export default AddCompany
