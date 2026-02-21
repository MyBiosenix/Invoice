import React, { useContext, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InvoiceContext } from '@/Context/InvoiceContext'
import { Edit, Eye, Plus, Search, Trash2 } from 'lucide-react'
import axios from 'axios'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { toast } from 'react-toastify'
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

import Item from './Item'
import { useLocation } from 'react-router-dom'
const AllInvoices = () => {
    const[query,setQuery]=useState('')
   
    const{backendUrl,token, navigate, role, userPermission, business}=useContext(InvoiceContext)

    const{state}=useLocation()
    //------------------getting invoice---------------------
    const[invoice,setInvoice]=useState([])
    const[InvoiceState,setInvoiceState]=useState('')

   
    const getInvoice=async()=>{
            try{
              if(role !=='admin' && userPermission !=='edit' ){
                console.log('hii')
              const response= await axios.get(`${backendUrl}/companyInvoice/${state}`,{headers:{token}})
                console.log(response.data)
                setInvoice(response.data.invoice) 
              }
            }
            catch(e){
                console.log(e.message)
            }
    }

    const getAllInvoice=async()=>{
      try{

            if(role ==='admin' || userPermission === 'edit'){
              console.log('hii')
           const response= await axios.get(`${backendUrl}/companyInvoice/${state}`,{headers:{token}})
                //console.log(response)
                 setInvoice(response.data.invoice) 
            }
                
                
      }
      catch(e){
        toast.error(e.message)
      }
    }


    const  stateInvoice=async()=>{
      try{
        if(InvoiceState){
          console.log("yes")
          const response=await axios.get(`${backendUrl}/allinvoicestate/${InvoiceState.toLocaleLowerCase()}`,{headers:{token}})
          console.log(response)
          setInvoice(response.data.invoice)
        }
      }
      catch(e){

      }
    }

    useEffect(()=>{
      stateInvoice()
    },[InvoiceState])

//------------getting user invoice ---------------
    useEffect(()=>{
        getInvoice()
    },[])

    //
// -----------------getting all invoice ---------- 

      useEffect(()=>{
        getAllInvoice()
      },[])

    useEffect(()=>{
        console.log(invoice)
    },[invoice])

    let filterData
     filterData=
    query == ''? invoice : invoice?.filter(i=>(i.clientName?.toLowerCase().includes(query.toLowerCase())))
    
    //  filterData=
    // query == ''? invoice : invoice?.filter(i=>(i.companyName?.toLowerCase().includes(query.toLowerCase())))
    

//---------------- deleting invoice -------------------

    const deleteInvoice=async(id)=>{
      try{
        const response=await axios.delete(`${backendUrl}/deleteinvoice/${id}`,{headers:{token}})
        console.log(response.data)
        if(response.data.success == true){
          toast.success(response.data.message)
            window.location.reload()
        }
        else{
          toast.error(response.data.error)
        }
      }
      catch(e){
        toast.error(e.message)
      }
    } 
    // useEffect(()=>{
    //     console.log(query.toLowerCase())
    //     console.log(filterData)
    // },[filterData])

    useEffect(()=>{
        console.log(query.toLowerCase())
    },[query])

    //-------------------- total paid and unpaid --------

   
    
  return (
   <div className=' flex flex-col w-full h-screen   items-center  '>
      


    
   

   <h2 className="inter text-3xl font-extrabold   
                bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 
                bg-clip-text text-transparent drop-shadow-lg 
                relative inline-block after:content-[''] after:block after:h-1 
                after:bg-gradient-to-r after:from-red-500 after:via-pink-500 after:to-purple-500 
                after:rounded-full after:w-1/2 after:mt-1 after:animate-pulse">
  All Invoices
 </h2>




      

    <Field orientation="horizontal"  className={' w-[95%] sm:w-[60vw] mt-5  '}>
       <Input type="search" placeholder="Search..." className={'rounded-3xl h-12'} value={query} onChange={(e)=>{setQuery(e.target.value)}} />
       <Button className={' h-10  w-24  sm:w-26 text-base font-bold rounded-xl'}>
         <Search />
         <p className=' hidden sm:flex'>Search</p>
       
         </Button>
         {  userPermission === 'edit' &&(
       <Button onClick={()=>{navigate('/home/createinvoice')}} className={" w-24 rounded-xl sm:w-36 h-11 flex items-center justify-center gap-2 text-base font-semiboldrounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md transition-all duration-300 hover:scale-[1.04] hover:shadow-lg active:scale-95"}>
         <Plus/>
         <p className=' hidden sm:flex' >Add</p>
         </Button>
)}
     </Field>


 
   

      <div className='w-full mt-10 px-1'>
  <div className='w-full  rounded-lg border border-gray-300 shadow-sm'>
    
    <Table className=" min-w-[800px] uppercase border-collapse text-xs overflow-x-scroll ">
      <TableCaption className="py-3 ">
        A list of your recent items.
      </TableCaption>

      <TableHeader>
        <TableRow className="bg-gray-200 border-b border-gray-300">
          <TableHead className="text-center border border-gray-300">S.NO</TableHead>
          <TableHead className="text-center border border-gray-300">NAME</TableHead>
          <TableHead className="text-center border border-gray-300">EMAIL</TableHead>
          <TableHead className="text-center border border-gray-300">ADDRESS</TableHead>
          <TableHead className="text-center border border-gray-300">STATE</TableHead>
           <TableHead className="text-center border border-gray-300">COMPANY</TableHead>
          <TableHead className="text-center border border-gray-300">ACTION</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filterData?.map((i, index) => (
          <TableRow key={i._id || index} className="hover:bg-gray-50 transition">
            
            {/* Serial Number */}
            <TableCell className="border border-gray-300 text-center py-3 font-semibold">
              {index + 1}
            </TableCell>

            <TableCell className="border border-gray-300 text-center py-3 whitespace-nowrap">
              {i.clientName}
            </TableCell>

            <TableCell className="border border-gray-300 text-center  py-3 break-words">
              {i.clientEmail}
            </TableCell>

            <TableCell className="border border-gray-300 text-center  py-3 break-words">
              {i.clientAddress}
            </TableCell>

            <TableCell className="border border-gray-300 text-center  py-3">
              {i.state}
            </TableCell>

             <TableCell className="border border-gray-300 text-center  py-3">
              {i.companyName}
            </TableCell>


            <TableCell className="border border-gray-300 px-4 py-3">
              <div className="flex  sm:flex-row items-center justify-center gap-3">
                
                <Eye
                  className="cursor-pointer text-blue-500 hover:scale-110 transition"
                  onClick={() => navigate('/home/invoice', { state: i })}
                />

                {role === 'admin' && (
                  <Trash2
                    onClick={() => deleteInvoice(i._id)}
                    className="cursor-pointer text-red-500 hover:scale-110 transition"
                  />
                )}

                {userPermission === 'edit' && (
                  <Edit
                    className="cursor-pointer text-gray-700 hover:scale-110 transition"
                    onClick={() =>
                      navigate('/editInvoice', { state: { item: i._id } })
                    }
                  />
                )}
              </div>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>

  </div>
</div>

    </div>
  )
}

export default AllInvoices
