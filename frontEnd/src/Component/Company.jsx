import { assets } from '@/assets/assets'
import { InvoiceContext } from '@/Context/InvoiceContext'
import axios from 'axios'
import { Castle, Edit, EllipsisVertical, EllipsisVerticalIcon, Eye, Plus, Search, Trash, Trash2, View } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Field } from '@/components/ui/field'

import { Button } from '@/components/button-1'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"
import { Icon } from '@radix-ui/react-select'
import { Input } from '@base-ui/react'

const Company = () => {
  const { navigate, backendUrl, token, role, userPermission } =
    useContext(InvoiceContext)

  const [company, setCompany] = useState([])
  const [query, setQuery] = useState('')

  const getCompany = async () => {
    try {
      if (role === 'admin' || userPermission === 'edit') {
        const response = await axios.get(`${backendUrl}/getcompany`, {
          headers: { token },
        })
        if (response.data.success) setCompany(response.data.company)
      } else {
        const response = await axios.get(`${backendUrl}/statecompany`, {
          headers: { token },
        })
        if (response.data.success) setCompany(response.data.company)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getCompany()
  }, [])

  const filterData =
    query === ''
      ? company
      : company?.filter((i) =>
          i.companyName?.toLowerCase().includes(query.toLowerCase())
        )

  return (
    <div className="w-full flex flex-col items-center pb-10 px-4">

      {/* Title */}
      <h2
        className="inter text-3xl font-extrabold bg-gradient-to-r 
        from-red-500 via-pink-500 to-purple-500 
        bg-clip-text text-transparent drop-shadow-lg 
        relative inline-block after:content-[''] after:block after:h-1 
        after:bg-gradient-to-r after:from-red-500 after:via-pink-500 after:to-purple-500 
        after:rounded-full after:w-1/2 after:mt-1 after:animate-pulse">
        All Companies
      </h2>

  <Field orientation="horizontal"  className={' w-[95%] sm:w-[60vw] mt-5  '}>
        <Input type="search" placeholder="Search..." className={'rounded-3xl h-12 w-full'} value={query} onChange={(e)=>{setQuery(e.target.value)}} />
        <Button className={' h-10  w-24  sm:w-26 text-base font-bold rounded-xl'}>
          <Search />
          <p className=' hidden sm:flex'>Search</p>
        
          </Button>
          {  userPermission === 'edit' &&(
        <Button onClick={()=>{navigate('/home/addcompany')}} className={" h-10 w-24 rounded-xl  font-bold sm:w-36  flex items-center justify-center gap-2 text-base font-semiboldrounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md transition-all duration-300 hover:scale-[1.04] hover:shadow-lg active:scale-95"}>
          <Plus/>
          <p className=' hidden sm:flex' >Add</p>
          </Button>
 )}
      </Field>

      {/* Grid View */}
      {filterData.length > 0 ? (
        <div className="w-full sm:w-[90%] mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filterData.map((item, id) => (
            <CompanyCard key={id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-10">No companies found</p>
      )}
    </div>
  )
}

export default Company



// Info Row Component
const InfoItem = ({ icon, text, isMultiLine = false, gradient }) => (
  <div className={`flex items-${isMultiLine ? 'start' : 'center'} gap-3`}>
    <div
      className={`h-8 w-8 rounded-lg flex items-center justify-center
      bg-gradient-to-br ${gradient} shrink-0 text-xs`}>
      {icon}
    </div>
    <p className="text-xs sm:text-sm text-gray-300 break-words">
      {text}
    </p>
  </div>
)



// Company Card Component
const CompanyCard = ({ item }) => {
  const { setBusiness } = useContext(InvoiceContext)
const{navigate}=useContext(InvoiceContext)
  return (
    <div 
   
    className="relative w-full h-full flex flex-col justify-between 
      rounded-2xl overflow-hidden bg-[#0B0F1A] 
      shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer">

      {/* Watermark Logo */}
      <img
        src={item.imageUrl || assets.Untitled}
        alt="Company watermark"
        className="absolute inset-0 w-[70%] h-[70%] m-auto object-contain
        opacity-5 pointer-events-none select-none"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br 
        from-indigo-200/5 via-fuchsia-200/10 to-cyan-200/10" />

      {/* Content */}
      <div className="relative z-10 p-4 flex flex-col gap-3">

        {/* Company Name */}
        <div className=' flex flex-row justify-between px-2'>
        <input value={item.companyName}
          className=" w-[50%] text-sm uppercase flex  place-self-center sm:text-lg font-bold tracking-tight
          bg-gradient-to-r from-white via-indigo-200 to-cyan-200
          bg-clip-text text-transparent">
         
        </input>
         <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <EllipsisVerticalIcon size={24} color='white'/>
        
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={()=>{navigate('/home/editcompany',{state:item._id})}}>
            <Edit   className=' cursor-pointer'/>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
      setBusiness(JSON.stringify(item))
      localStorage.setItem('company', JSON.stringify(item))
      toast.success('Company added successfully')
      navigate('/home/allinvoice',{state:item.companyName})
    }} className=' cursor-pointer'>
            <Eye/>
            View
          </DropdownMenuItem>

         
        </DropdownMenuGroup>
       
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
        {/* Details */}
        <div className="space-y-2">
          <InfoItem
            icon="📧"
            text={item.email}
            gradient="from-indigo-500/30 to-indigo-500/10"
          />
          <InfoItem
            icon="📞"
            text={item.phoneNumber}
            gradient="from-fuchsia-500/30 to-fuchsia-500/10"
          />
          <InfoItem
            icon="📍"
            text={item.address}
            isMultiLine
            gradient="from-cyan-500/30 to-cyan-500/10"
          />
          <InfoItem
            icon={<Castle size={14} color="white" />}
            text={item.state}
            gradient="from-cyan-500/30 to-cyan-50/10"
          />
        </div>

       
       

 
   


      
      </div>
    </div>
  )
}
