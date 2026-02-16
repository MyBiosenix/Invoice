import React, { useContext, useState } from "react"
import { Input } from "@/components/ui/input"
import { FolderCode, Mail } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import axios from "axios"
import { InvoiceContext } from "@/Context/InvoiceContext"
import { toast } from "react-toastify"

const AddItem = () => {
  const [date, setDate] = useState()
  const[softwareName, setSoftwareName]=useState('')
  const[validityPeriod, setValidity]=useState('')
  const[Amount,setAmount]=useState(0)
  const[des,setDes]=useState('')
const[loading,setLoading]=useState(false)

const{backendUrl,token}=useContext(InvoiceContext)
    // ----------------------- handle function ----------------------------

    const handleFunction=async()=>{
      try{
        setLoading(true)
        console.log("pracg")
        const response=await axios.post(`${backendUrl}/createitem`,{softwareName,Amount, date, des, validityPeriod},{headers:{token}} )
        console.log(response.data)
        if(response.data.success === true){
          toast.success("item  added successfully ")
        } 
      }
      catch(e){
        toast.error(e.message)
      }
      finally{
        setLoading(false)
      }
    }

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">

      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Add Item
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter software & billing details below
        </p>
      </div>

      {/* Form */}
      <div className="p-8 space-y-6">

        {/* Software Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Software Name
          </label>
          <div className="relative">
            <FolderCode className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <Input
              value={softwareName}
              onChange={(e)=>{setSoftwareName(e.target.value)}}
              placeholder="DMS REG"
              className="pl-10 h-11 rounded-lg border-gray-300 focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Validity */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Validity Period
          </label>
          <Input
           value={validityPeriod}
           onChange={(e)=>{setValidity(e.target.value)}}
            placeholder="30 days"
            className="h-11 rounded-lg border-gray-300 focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* Billing Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Billing Date
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!date}
                className="
                  w-full h-11 justify-between text-left font-normal
                  rounded-lg border-gray-300
                  hover:bg-gray-50 dark:hover:bg-gray-800
                  data-[empty=true]:text-muted-foreground
                "
              >
                {date ? format(date, "PPP") : <span>Select date</span>}
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </Button>
            </PopoverTrigger>

            <PopoverContent 
              className="w-auto p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                defaultMonth={date}
                className="rounded-lg"
              />
            </PopoverContent>
          </Popover>
        </div>

      {/* {  description} */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Description
          </label>
          <Textarea value={des} onChange={(e)=>{setDes(e.target.value)}}/>
        </div>

        {/* Amount */}

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Amount
          </label>

          <Input
            placeholder="rs"
            value={Amount}
            onChange={(e)=>{setAmount(e.target.value)}}
            className="h-11 rounded-lg border-gray-300 focus:ring-1 focus:ring-gray-400"
          />
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
          <Button variant="outline" className="px-5 h-10">
            Cancel
          </Button>
          <Button disabled={loading} className="px-6 h-10 font-medium" onClick={()=>{handleFunction()}}>
            {loading ? 'loding......' : 'save item'}
          </Button>
        </div>

      </div>
    </div>
  )
}

export default AddItem
