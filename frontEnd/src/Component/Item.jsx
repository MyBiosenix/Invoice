import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Edit, Eye, FileUp, Plus, Search, Trash, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { InvoiceContext } from '@/Context/InvoiceContext'
import { toast } from 'react-toastify'

const Item = () => {
    const navigate=useNavigate()
    const{token,backendUrl}=useContext(InvoiceContext)
    const[item,setItem]=useState([])
    const[query,setQuery]=useState('')



      //geting items from backend 
      const getItem=async()=>{
        try{
          const response=await axios.get(`${backendUrl}/allitems`,{headers:{token}})
          console.log(response)
          if(response.data.success == true){
            setItem(response.data.items)
          }
        }
        catch(e){
          console.log(e.message)
        }
      }

       //deleted  items from backend
       const deleteItem=async(item)=>{
        try{
          const response=await axios.delete(`${backendUrl}/deleteitem/${item}`,{headers:{token}})
          console.log(response.data)
          if(response.data.success === true){
            toast.success('deleted success')
            window.location.reload()
          }
        }
        catch(e){
         toast.error(e.message)
        }
       } 


      //search feature 
              const filterData= !query ? item : item.filter((item)=>item.softwareName.toLowerCase().includes(query.toLocaleLowerCase()))




      useEffect(()=>{
        getItem()
      },[])
 return (
     <div className=' flex flex-col w-full h-screen   items-center  '>
      
       <h2 className="inter text-3xl font-extrabold   
                bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 
                bg-clip-text text-transparent drop-shadow-lg 
                relative inline-block after:content-[''] after:block after:h-1 
                after:bg-gradient-to-r after:from-red-500 after:via-pink-500 after:to-purple-500 
                after:rounded-full after:w-1/2 after:mt-1 after:animate-pulse">
   All Items
 </h2>
    
 
      
       
 
 <Field orientation="horizontal"  className={' w-[95%] sm:w-[60vw] mt-5  '}>
       <Input type="search" placeholder="Search..." className={'rounded-3xl h-12'} value={query} onChange={(e)=>{setQuery(e.target.value)}} />
       <Button className={' h-10  w-24  sm:w-26 text-base font-bold rounded-xl'}>
         <Search />
         <p className=' hidden sm:flex'>Search</p>
       
         </Button>
       <Button onClick={()=>{navigate('/home/additem')}} className={'className={"w-[95%] sm:w-36 h-11 flex items-center justify-center gap-2 text-base font-semiboldrounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md transition-all duration-300 hover:scale-[1.04] hover:shadow-lg active:scale-95"}'}>
         <Plus/>
         <p className=' hidden sm:flex' >Add</p>
         
         </Button>
     </Field>
 
       {/* table */}
 
       <div className="w-full mt-10">
  <div className="w-full overflow-x-auto">

    <Table className="w-full border border-gray-300 text-sm uppercase">
      
      <TableHeader>
        <TableRow className="bg-gray-200">
          <TableHead className="border p-3 text-center">S.No</TableHead>
          <TableHead className="border p-3">Software</TableHead>
          <TableHead className="border p-3 hidden sm:table-cell">Validity</TableHead>
          <TableHead className="border p-3 hidden md:table-cell">Payment</TableHead>
          <TableHead className="border p-3 hidden lg:table-cell text-center">Description</TableHead>
          <TableHead className="border p-3 text-center">Price</TableHead>
          <TableHead className="border p-3 text-center">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filterData?.map((i, index) => (
          <TableRow key={i._id || index} className="hover:bg-gray-50">
            
            <TableCell className="border p-3 text-center font-semibold">
              {index + 1}
            </TableCell>

            <TableCell className="border p-3 whitespace-nowrap">
              {i.softwareName}
            </TableCell>

            <TableCell className="border p-3 hidden sm:table-cell">
              {i.validityPeriod}
            </TableCell>

            <TableCell className="border p-3 hidden md:table-cell">
              {i.paymentType}
            </TableCell>

            <TableCell className="border p-3 hidden lg:table-cell break-words lowercase">
              {i.des}
            </TableCell>

            <TableCell className="border p-3 text-center">
              ₹ {i.Amount}
            </TableCell>

            <TableCell className="border p-3">
              <div className="flex justify-center gap-3">
                <Edit
                  onClick={() =>
                    navigate('/home/edititem', { state: i._id })
                  }
                  className="cursor-pointer text-blue-600 hover:scale-110 transition"
                />
                <Trash2
                  onClick={() => deleteItem(i._id)}
                  className="cursor-pointer text-red-500 hover:scale-110 transition"
                />
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

export default Item