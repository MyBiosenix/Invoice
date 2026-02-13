import { InvoiceContext } from '@/Context/InvoiceContext'
import { Input } from '@base-ui/react'
import { Label } from '@radix-ui/react-label'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const {  backendUrl, token, navigate } = useContext(InvoiceContext)
 const{state}=useLocation()
  // changing password function 

  const change=async()=>{
    try{
        const response =await axios.put(`${backendUrl}/changepassword`,{password,userId:state.userId}, {headers:{token}})
        console.log(response)
        if(response.data.success == true){
            toast.success('password change successfully ')
            navigate('/home/alluser')
        }
        else{
            toast.error(response.data.error)
        }
    }
    catch(e){
        toast.error(e.message)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-24 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col gap-6">
      {/* Title */}
      <Label className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
        Change Password
      </Label>

      {/* Password Field */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          New Password
        </p>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-150"
        />
      </div>

      

      {/* Submit Button */}
      <button
      onClick={()=>{change()}}
        
        className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white font-semibold rounded-xl shadow-md transition-all duration-150 mt-4"
      >
        Update Password
      </button>
    </div>
  )
}

export default ChangePassword
