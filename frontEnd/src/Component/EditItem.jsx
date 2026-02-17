
import { Button } from '@/components/button-1'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { InvoiceContext } from '@/Context/InvoiceContext'
import axios from 'axios'

import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditItem = () => {
    const[softwareName,setSoftwareName]=useState('')
    const[validityPeriod,setValidityPeriod]=useState('')
    const[paymentMode,setPaymentMode]=useState('')
    const[des,setDes]=useState('')
    const[Amount,setAmount]=useState(0)

    //context
    const{token,backendUrl,role,userPermission,navigate}=useContext(InvoiceContext)
    const{state}=useLocation()

    useEffect(()=>{
        console.log(state)
    },[])

    const handleEdit=async()=>{
        try{
            const response=await axios.put(`${backendUrl}/updateitem`,{id:state,softwareName,validityPeriod,paymentMode,des,Amount}, {headers:{token}})
            console.log(response.data.success)
            if(response.data.success === true){
                toast.success(response.data.msg)
                navigate('home/item')
            }
        }
        catch(e){
            toast.error(e.message)
        }
    }
  return (
    <div className=' w-full flex items-center  justify-center  h-screen '>
            <div className=' w-[96vw] sm:w-[30vw] h-[75vh] sm:h-[95vh] rounded-2xl bg-slate-100 ring-1 ring-green-200  shadow-green-300 shadow-2xl  '>
                <h2 className=' text-2xl font-extrabold  text-slate-900  text-center mt-4 noto-serif'>Edit Item</h2>
            <hr className=' w-[20vw] flex place-self-center mt-1 bg-gray-400 h-1'/>
                    {/* software name  */}
            <div className=' w-full flex flex-col items-start px-4  gap-2 mt-5 '>
                <p className=' text-base  font-medium gap-3 inter capitalize   '>software name</p>
              <Input
              onChange={(e)=>{setSoftwareName(e.target.value)}}
  className="w-[85%] bg-transparent focus:bg-transparent ring-0 hover:ring-1 hover:ring-blue-500"
  placeholder="enter software name"
/>

            </div>

                {/* validity */}
<div className=' w-full flex flex-col items-start px-4  gap-2 mt-5 '>
                <p className=' text-base font-medium gap-3 inter capitalize   '>validity</p>
              <Input
              onChange={(e)=>{setValidityPeriod(e.target.value)}}
  className="w-[85%] bg-transparent focus:bg-transparent ring-0 hover:ring-1 hover:ring-blue-500"
  placeholder="30 days "
/>

            </div>


                          {/* payment mode  */}
<div className=' w-full flex flex-col items-start px-4  gap-2 mt-5 '>
                <p className=' text-base font-medium gap-3 inter capitalize   '>payment mode</p>
              <Input
              onChange={(e)=>{paymentMode(e.target.value)}}
  className="w-[85%] bg-transparent focus:bg-transparent ring-0 hover:ring-1 hover:ring-blue-500"
  placeholder="online"
/>

            </div>



                                 {/* description   */}
<div className=' w-full flex flex-col items-start px-4  gap-2 mt-5 '>
                <p className=' text-base font-medium gap-3 inter capitalize   '>description</p>
              <Textarea
              onChange={(e)=>{setDes(e.target.value)}}
  className="w-[85%] bg-transparent focus:bg-transparent ring-0 hover:ring-1 hover:ring-blue-500"
  placeholder=""
/>

            </div>


                                             {/* amount   */}
<div className=' w-full flex flex-col items-start px-4  gap-2 mt-5 '>
                <p className=' text-base font-medium gap-3 inter capitalize   '>amount</p>
              <Input
              onChange={(e)=>{setAmount(e.target.value)}}
  className="w-[85%] bg-transparent focus:bg-transparent ring-0 hover:ring-1 hover:ring-blue-500"
  placeholder="299"
/>

            </div>

           
            <Button onClick={()=>{handleEdit()}}  className={` rounded-full text-xl font-medium hover:shadow-green-300 hover:shadow-md mt-5 w-[90%] sm:w-[10vw] h-10 flex place-self-center `}>Edit</Button>
              </div>
    </div>
  )
}

export default EditItem
