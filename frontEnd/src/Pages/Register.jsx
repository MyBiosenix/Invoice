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

const Register = () => {
    const [loading,setLoading]=useState(false)
    const [userName,setUserName]=useState('')
    const [userId, setUserId]=useState('')
    const [password, setPassword]=useState('')
    const [view, setView]=useState(true)
    const [companyName,setCompanyName]=useState("")
    const [permission,setPermission]=useState('')
    const [state,setState]=useState('')

    // context data
    const {token, setToken, setName,name,setRole, role , backendUrl , navigate, userPermission, setUserPermission}=useContext(InvoiceContext)

    //-------------------- checking admin -----------------

    useEffect(()=>{
      if(role !=='admin'){
        navigate('/login')
      }
    },[role])


    // function generateUsername() {
    //     const arr = new Uint32Array(2)
    //     crypto.getRandomValues(arr)
      
    //      setUserId(`user_${arr[0].toString(36)}${arr[1].toString(36)}`)
    //   }

      // from submit handler

      const handleSubmit =async()=>{
        try{
            setLoading(true)
            const response= await axios.post(`${backendUrl}/register`,{userName,userId,password,permission,companyName, state})

            console.log(response.data.token)
            if(response.data.success == true){
                // setToken(response.data.token)
                // localStorage.setItem('token',response.data.token)

                // setRole(response.data.role)
                
                // localStorage.setItem('role',response.data.role)

                // setName(response.data.name)
                // localStorage.setItem('name',response.data.name)

                // setPermission(response.data.permission)
                // localStorage.setItem('permission',response.data.permission)
                // toast.success('Register successfully')
                navigate('/show',{state:{userId:userId,password:password}})
            }
            else{
                toast.error(response.data.error)
            }
           
        }
        catch(e){
            console.log(e.message)
        }
        finally{
            setLoading(false)
        }
      }


      // useEffect(()=>{
      //       generateUsername()
      //       console.log(companyName)
      // },[companyName])
  return (
    <div className=' w-full h-screen flex items-center justify-center'>
    <div className=' inter flex flex-col items-center justify-center h-[90vh] sm:h-auto rounded-lg w-[90%] sm:w-[30vw] bg-slate-100  shadow-slate-400 shadow-lg '>
        <h2 className='  font-bold text-lg '>Register</h2>

        {/* userName */}
        <div className=' flex  flex-col gap-2 mt-10'>
        <p  className=' text-base font-semibold'>user name</p>
        <InputGroup>
        <InputGroupInput type='text' onChange={(e)=>{setUserName(e.target.value)}} value={userName} placeholder='user namme'/>
        <InputGroupAddon>
        <User/>
        </InputGroupAddon>
        </InputGroup>
        </div>
{/* 
        -------------- state------------- */}

        {/* state */}
        <div className=' flex  flex-col gap-2 mt-10'>
        <p  className=' text-base font-semibold'>State name</p>
        <InputGroup>
        <InputGroupInput type='text' onChange={(e)=>{setState(e.target.value)}} value={state} placeholder='state name'/>
        <InputGroupAddon>
        <User/>
        </InputGroupAddon>
        </InputGroup>
        </div>


          {/* -------------------- company selection ------------------- */}
        <div className=' flex  w-[70%] flex-col gap-2 mt-5'>
        <p  className=' text-base font-semibold'>Select Company Name</p>
        <Select value={companyName}  onValueChange={(value)=>{setCompanyName(value)}} >
      <SelectTrigger className="w-full ">
        <SelectValue placeholder="Select a Company name" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Companies</SelectLabel>
          <SelectItem value="Octagate">Octagate</SelectItem>
          <SelectItem value="Avioliv">Avioliv</SelectItem>
          <SelectItem value="Tech2ShineLabs">Tech2ShineLabs</SelectItem>
          <SelectItem value="ACEWOK'">ACEWOK</SelectItem>
          <SelectItem value="Isimple solutions">Isimple solutions</SelectItem>
          <SelectItem value="Tenr Global solution">Tenr Global solution</SelectItem>

            <SelectItem value="SURESTEP">SURESTEP</SelectItem>
            <SelectItem value="TECHIQLABS">TECHIQLABS</SelectItem>
            <SelectItem value="Inquiniti Technologies">Inquiniti Technologies</SelectItem>                                    
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>


       {/* -------------------- permission  selection ------------------- */}
     <div className=' flex  w-[70%] flex-col gap-2 mt-5'>
        <p  className=' text-base font-semibold'>Select Permission</p>
        <Select value={permission}  onValueChange={(value)=>{setPermission(value)}} >
      <SelectTrigger className="w-full ">
        <SelectValue placeholder="Select a  permission" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Permission</SelectLabel>
          <SelectItem value="edit">Edit</SelectItem>
          <SelectItem value="view">view</SelectItem>
                                   
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>


        {/* userId */}
        <div className=' flex  flex-col gap-2 mt-3'>
        <p  className=' text-base font-semibold'>user Id</p>
        <InputGroup>
        <InputGroupInput type='text' value={userId}  onChange={(e)=>{setUserId(e.target.value)}} placeholder=''/>
        <InputGroupAddon>
        <IdCard/>
        </InputGroupAddon>
        </InputGroup>
        </div>

        {/* password */}
        <div className=' flex  flex-col gap-2 mt-3'>
        <p  className=' text-base font-semibold'>Password</p>
        <InputGroup>
        <InputGroupInput type={`${ view ? 'password' :'text'}`} onChange={(e)=>{setPassword(e.target.value)}} value={password} placeholder='passowrd'/>
        <InputGroupAddon>
        {
            view ?<EyeOff onClick={()=>{setView(!view)}} className=' cursor-pointer'/>: <Eye onClick={()=>{setView(!view)}} className=' cursor-pointer'/>
}
        </InputGroupAddon>
        </InputGroup>
        </div>

        <Button className={' h-10 w-28 font-bold text-lg bg-black rounded-md text-white mt-5'} onClick={()=>{handleSubmit()}}>{ loading ? 'loading.....' : 'Register'}</Button>
       
       
    </div>
    </div>
  
  )
}

export default Register