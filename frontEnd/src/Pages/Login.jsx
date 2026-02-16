import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { InvoiceContext } from '@/Context/InvoiceContext'
import { Button, Toast } from '@base-ui/react'
import axios from 'axios'
import { Eye, EyeOff, IdCard, User } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { data } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '@/assets/assets'
const Login = () => {
    
        const [loading,setLoading]=useState(false)
        const [userId, setUserId]=useState('')
        const [password, setPassword]=useState('')
        const [view, setView]=useState(true)
    
        // context data
        const {token, setToken, backendUrl , navigate, role,setRole, name, setName, userPermission,setUserPermission}=useContext(InvoiceContext)



        // token checking 

        useEffect(()=>{
            if(token){
                navigate('/home/*')
            }
        },[token])
        // from handler 


         const handleSubmit =async()=>{
        try{
            setLoading(true)
            const response= await axios.post(`${backendUrl}/login`,{userId,password})

            console.log(response)
            if(response.data.success == true){
                setToken(response.data.token)
                localStorage.setItem('token',response.data.token)
                setRole(response.data.role)
                localStorage.setItem('role',response.data.role)
                  setName(response.data.name)
                localStorage.setItem('name',response.data.name)


                setUserPermission(response.data.permission)
                localStorage.setItem('permission',response.data.permission)
                toast.success('Register successfully')
                navigate('/home/*')
            }
            else{
                console.log(response.data)
                toast.error(response.data.msg)
            }
           
        }
        catch(e){
            console.log(e.message)
        }
        finally{
            setLoading(false)
        }
      }


  return (
    <div>
       

  <div className="relative w-full h-screen overflow-hidden">

    {/* Background Image */}
    <img
      src={assets.loginBackground}
      alt="background"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Dark Overlay (for better glass visibility) */}
    <div className="absolute inset-0 bg-black/40"></div>


      {/* center heading */}
      <h2 className=' text-3xl  font-extrabold backdrop-blur-lg text-white  z-30 flex place-self-center  absolute top-20 noto-serif2' >Biosenix Invoice</h2>
    {/* Centered Glass Card */}
    <div className="relative z-10 flex items-center justify-center h-full">
      
      <div className="
        backdrop-blur-lg 
        bg-white/10 
        border border-white/20 
        shadow-2xl 
        rounded-2xl 
        px-8 py-10 
        w-[90%] sm:w-[380px]
        text-white
      ">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* User ID */}
        <div className="flex flex-col gap-2 mb-4">
          <p className="font-semibold">User Id</p>
          <InputGroup>
            <InputGroupInput
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className=" rounded-lg"
            />
            <InputGroupAddon>
              <IdCard />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 mb-6">
          <p className="font-semibold">Password</p>
          <InputGroup>
            <InputGroupInput
              type={view ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" rounded-lg"
            />
            <InputGroupAddon>
              {view ? (
                <EyeOff
                  onClick={() => setView(false)}
                  className="cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setView(true)}
                  className="cursor-pointer"
                />
              )}
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Button */}
        <Button
          onClick={handleSubmit}
          className="w-full h-10 bg-white text-black font-bold rounded-lg hover:scale-105 transition duration-200"
        >
          {loading ? "Loading..." : "Login"}
        </Button>

      </div>
    </div>

  </div>


  
  
    </div>
  )
}

export default Login
