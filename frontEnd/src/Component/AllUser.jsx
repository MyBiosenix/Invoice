import { InvoiceContext } from '@/Context/InvoiceContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Delete, Edit, Plus, Recycle, Search, Trash, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Field } from '@/components/ui/field';


const AllUser = () => {
    const[user,setUser]=useState([])
    const[query,setQuery]=useState('')
     const{token, backendUrl, navigate, role, userPermission}=useContext(InvoiceContext)
     
     useEffect(()=>{
        if(role !=='admin'){
            navigate('/home/*')
        }
     },[role])

     const getUser=async()=>{
      try{
        const response=await axios.get(`${backendUrl}/alluser`,{headers:{token}})
        console.log(response.data)
        console.log(response.data.succes)
        if(response.data.succes){
          console.log('pra')
          setUser(response.data.user)
        }
      }
      catch(e){
        toast.error(e.message)
      }
     }

     const deleteUser=async(id)=>{
      try{
        const response=await axios.delete(`${backendUrl}/delete/${id}`,{headers:{token}})
        console.log(response)
        if(response.data.success){
          toast.success(response.data.msg)
          window.location.reload()
        }
      }
      catch(e){
        toast.error(e.message)
      }
     }

     useEffect(()=>{
      getUser()
     },[])

     // -------------- getting user =----------

      const filterData=
    query == ''? user : user?.filter(i=>(i.userName?.toLowerCase().includes(query.toLowerCase())))
    


     useEffect(()=>{
        console.log(user)
     },[user])
  return (
     <div className="flex flex-col w-full h-screen items-center">
      <div className="w-full sm:w-[30vw] flex flex-col sm:flex-row-reverse gap-8 sm:gap-4 items-center justify-center mt-5">
        <h2
          className="inter text-3xl font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 
          bg-clip-text text-transparent drop-shadow-lg relative inline-block after:content-[''] after:block after:h-1 
          after:bg-gradient-to-r after:from-red-500 after:via-pink-500 after:to-purple-500 after:rounded-full 
          after:w-1/2 after:mt-1 after:animate-pulse"
        >
          All Users
        </h2>
      
    </div>


      <Field orientation="horizontal"  className={' w-[95%] sm:w-[60vw] mt-5  '}>
                   <Input type="search" placeholder="Search..." className={'rounded-3xl h-12'} value={query} onChange={(e)=>{setQuery(e.target.value)}} />
                   <Button className={' h-10  w-24  sm:w-26 text-base font-bold rounded-xl'}>
                     <Search/>
                     <p className=' hidden sm:flex'>Search</p>
                   
                     </Button>
                     {  role === 'admin' &&(
                   <Button onClick={() => navigate('/register')} className={"w-[95%] sm:w-36 h-11 flex items-center justify-center gap-2 text-base font-semiboldrounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md transition-all duration-300 hover:scale-[1.04] hover:shadow-lg active:scale-95"}>
                     <Plus/>
                     <p className=' hidden sm:flex' >Add</p>
                     </Button>
            )}
                 </Field>

    {/*  ------------------------- adding add user button ----------------------- */}
    

    {/*--------------------------------------- users table --------------------------- */}

    <div className="w-full mt-10">
  <div className="w-full overflow-x-auto">

    <Table className="w-full border border-gray-300 text-sm">
      
      <TableHeader>
        <TableRow className="bg-gray-200">
          <TableHead className="border p-3 text-center">S.No</TableHead>
          <TableHead className="border p-3">User Name</TableHead>
          <TableHead className="border p-3">User Id</TableHead>
          <TableHead className="border p-3 hidden sm:table-cell">Password</TableHead>
          <TableHead className="border p-3 hidden md:table-cell">Permission</TableHead>
          <TableHead className="border p-3 hidden md:table-cell">Company</TableHead>
          <TableHead className="border p-3 hidden lg:table-cell">State</TableHead>
          <TableHead className="border p-3 text-center">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filterData?.map((item, index) => (
          <TableRow key={item.userId || index} className="hover:bg-gray-50">
            
            <TableCell className="border p-3 text-center">
              {index + 1}
            </TableCell>

            <TableCell className="border p-3">
              {item.userName}
            </TableCell>

            <TableCell className="border p-3">
              {item.userId}
            </TableCell>

            <TableCell className="border p-3 hidden sm:table-cell">
              ********
            </TableCell>

            <TableCell className="border p-3 hidden md:table-cell">
              {item.permission}
            </TableCell>

            <TableCell className="border p-3 hidden md:table-cell">
              {item.companyName}
            </TableCell>

            <TableCell className="border p-3 hidden lg:table-cell">
              {item.state}
            </TableCell>

            <TableCell className="border p-3">
              <div className="flex justify-center gap-3">
                <Edit
                  className="cursor-pointer text-blue-600 hover:scale-110 transition"
                  onClick={() =>
                    navigate('home/change', {
                      state: { userId: item.userId },
                    })
                  }
                />
                <Trash2
                  className="cursor-pointer text-red-500 hover:scale-110 transition"
                  onClick={() => deleteUser(item.userId)}
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

export default AllUser
