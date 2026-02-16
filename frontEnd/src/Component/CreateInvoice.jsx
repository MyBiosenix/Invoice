import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { AtSign, Download, MapPinHouse, Smartphone, User } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
  } from "@/components/ui/combobox"
  import { format } from "date-fns"
  import { ChevronDownIcon } from "lucide-react"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { InvoiceContext } from '@/Context/InvoiceContext'
import { toast } from 'react-toastify'
const CreateInvoice = () => {
    const[invoiceNumber,setInvoiceNumber]=useState('')

      const [date, setDate] = useState('')
      const [dueDate, setDueDate]=useState()
      const [clientName,setClientName]=useState('')
      const [clientEmail, setClientEmail]=useState('')
      const [clientPhone, setClientphone]=useState('')
      const [clientAddress, setClientAddress]=useState('')
      const[totalAmount,setTotalAmount]=useState()
      const[amountReceive, setAmountReceive]=useState(0)
      const[transectionId,setTransectionId]=useState('')
      
      const {backendUrl,token, business, navigate}=useContext(InvoiceContext)

    function generateNumber() {
        const arr = new Uint32Array(1);
        crypto.getRandomValues(arr);
       setInvoiceNumber(100000 + (arr[0] % 1000));
      }

     

      useEffect(()=>{
            generateNumber()
      },[])


      // getting coustomer data
      const {state}=useLocation()


      // -----------------------  checking adit invoice --------------------
      
   



      //----------------------------------- all item related code ---------------------------------
      const[allItem,setItem]=useState([])
      const [sItem,setSitem]=useState([])


      //geting items from backend 
      const getItem=async()=>{
        try{
          const response=await axios.get(`${backendUrl}/allitems`,{headers:{token}})
          console.log(response.data.items)
          if(response.data.success == true){
            setItem(response.data.items)
          }
        }
        catch(e){
          console.log(e.message)
        }
      }

      // +++++++++++++++++++++++++ get all items +++++++++++++++++++++
      useEffect(()=>{
        getItem()
      },[])

      // ++++++++++++++++++++++++++= set Software items +++++++++++++++++++++ 
      useEffect(()=>{
       setSitem(allItem?.filter((item) => item?.ItemType?.includes(state?.ProjectSelection?.substring(1,4))) )
       console.log(sItem)
      },[allItem])




      // ----------------------------------- getting data from state --------------

      useEffect(()=>{
        console.log(state)
      },[])

   
    


      // ----------------------------------- setting client details --------------------------

      useEffect(()=>{
        console.log(state)
        console.log(date)
     
          setClientName(state? state.CandidateName : clientName)
          
          setClientEmail(state? state.EmailID : clientEmail )
          setClientphone(state? state.MobileNumber:clientPhone )
          setClientAddress(state? state.Location : clientAddress)
          setAmountReceive(state? state.PaidAmount: amountReceive)
          setTransectionId(state? state?.transectionId: transectionId)
        if (sItem?.length > 0) {
  const total = sItem.reduce(
    (sum, i) => sum + Number(i.Amount),
    0
  );
  setTotalAmount(total);
}

      },[state,sItem])

     // ------------------------------------ handle submit  -------------------------


    const handleSubmit=async()=>{
      try{
        console.log(sItem)

        if( !date || !clientName || !clientEmail || !clientAddress || !clientPhone || !totalAmount || !amountReceive || !transectionId  ){
          return toast.error('all field required')
        }
const response = await axios.post(
  `${backendUrl}/createinvoice`,
  { invoiceNumber,
    date,
    clientName,
    clientEmail,
    clientAddress,
    clientPhone,
    totalAmount,
    amountReceive,
    transectionId,
    sItem,
    companyName: business.companyName,
    companyAddress: business.address,
    companyEmail: business.email,
    imageUrl: business.imageUrl,
    companyPhone: business.phoneNumber,
    state:business.state,
    dueDate
  },
  {
    headers: {
      token,
    },
  }
);


console.log(response)
if(response.data.success === true){
  toast.success('Invoice added successfully')
 

}
      }
      catch(e){
        console.log(e.message)
      }
    }

  return (
    <div className=' w-full  h-screen  flex flex-col  px-6'>
        <Label className={` text-2xl font-bold text-gray-900 mt-5`}>Create Invoice</Label>
        <div className=' w-full flex-col flex sm:flex-row gap-5 items-center justify-between px-6'>
                {/* invoice */}
        <div className=' flex flex-col sm:flex-row gap-5 items-center mt-5 px-3'>
            <Label className={` text-lg font-medium text-red-500 `}>#invoice</Label>
            {/* <input type="text" disabled /> */}
            <Input className={` w-[80vw] text-lg h-10 sm:w-[20vw] rounded-md`}  value={invoiceNumber} disabled />
        </div>

        {/* date */}

       

        </div>

        <hr  className=' mt-5 w-[90%]   h-[2px] bg-slate-200 rounded-full'/>
                    {/* ------------------------------------Bill to part-------------------------------- */}
        <div className=' w-full  h-auto flex flex-col mt-5 gap-3'>
            <Label className={' text-lg font-medium text-slate-700'}>BILL TO</Label>

          {/* first div  */}
         <div className=' flex flex-col sm:flex-row gap-3'>
            {/* name  */}
        <div className=' flex  flex-col gap-3 px-3'>
          <Label className=' text-base font-medium text-left'>Name</Label>
          <Input  type="text" placeholder='mishra ' value={clientName}  onChange={(e)=>{setClientName(e.target.value)}} className={` w-[90%] sm:w-[30vw] rounded-lg ${!clientName ? 'ring-1 ring-red-500':''}`}/>
        </div>

          {/* email */}
           <div className=' flex  flex-col gap-3 px-3'>
          <Label className=' text-base font-medium'>Email</Label>
          <Input  type="text" placeholder='user@gmail.com ' value={clientEmail} onChange={(e)=>{setClientEmail(e.target.value)}} className={` w-[90%] sm:w-[30vw] rounded-lg ${!clientEmail ?'ring-1 ring-red-500':''}`}/>
        </div>
         </div>
         

          {/* second div     */}

           <div className=' flex flex-col sm:flex-row gap-3'>
            {/* contact  */}
        <div className=' flex  flex-col gap-3 px-3'>
          <Label className=' text-base font-medium text-left'>Contact </Label>
          <Input  type="text" placeholder='+912345678901 ' value={clientPhone} onChange={(e)=>{setClientphone(e.target.value)}} className={` w-[90%] sm:w-[30vw] rounded-lg ${!clientPhone ? 'ring-1 ring-red-700':''}`}/>
        </div>

          {/* address */}
           <div className=' flex  flex-col gap-3 px-3'>
          <Label className=' text-base font-medium'>Address</Label>
          <Textarea  type="text" placeholder=' ' className={` w-[90%] sm:w-[30vw] rounded-lg ${!clientAddress ? 'ring-1 ring-red-600': ''}`}  value={clientAddress} onChange={(e)=>{setClientAddress(e.target.value)}}/>
        </div>
         </div>

</div>

<hr  className=' mt-5 w-[90%]   h-[2px] bg-slate-200 rounded-full'/>
                    {/* items part */}
<div className=' w-full h-auto mt-5'>
<Label className={' text-lg font-medium text-slate-700'}>Item Table</Label>

    <div className=' w-full overflow-x-auto mt-10'>
           <Table className={`uppercase`}>
       <TableCaption>A list of your recent items.</TableCaption>
       <TableHeader>
         <TableRow className={`bg-gray-200 border-t-2  items-center`}>
           <TableHead className="w-[100px]">SOFTWARE</TableHead>
           <TableHead>VALIDITY</TableHead>
           <TableHead>PAYMENT</TableHead>
           <TableHead className="text-center">BILL DATE</TableHead>
           <TableHead className="text-center">DESCRIPTION</TableHead>
           <TableHead className="text-centert">PRICE</TableHead>
         </TableRow>
       </TableHeader>
       {
        sItem?.map((item,id)=>(
       <TableBody key={id}>
         <TableRow>
           <TableCell className="font-medium px-6"  >{item.softwareName} </TableCell>
           <TableCell className='px-6'>{item.validityPeriod}</TableCell>
           <TableCell className=' px-6'>{item.paymentType}</TableCell>
           <TableCell className="text-right px-6">
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
</TableCell>

           <TableCell className=" text-balance lowercase   px-20">{item.des}</TableCell>
           <TableCell>{item.Amount}</TableCell>
         </TableRow>
       </TableBody>
       ))
}
     </Table>
           </div>



            {/* ++++++++++++++++++++++++++++++++++ item  selection +++++++++++++++++++++++++++++++++ */}


           <div  className='   w-full items-center justify-center mt-10' >
            <Label className=' text-lg font-bold'>Select Items</Label>
            <Combobox items={allItem}  className="relative w-full">
  <ComboboxInput placeholder="Select software items" className="w-full" />

  <ComboboxContent className="w-full">
    <ComboboxEmpty>No item Found</ComboboxEmpty>

    <ComboboxList>
      {(it) => (
        <ComboboxItem
          key={it._id || it.softwareName}
          value={it.softwareName}
          onClick={() => setSitem([it])}
        >
          {it.softwareName}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>

    </div>




</div>

<hr  className=' mt-5 w-[90%]   h-[2px] bg-slate-200 rounded-full'/>

<div className=' mt-10 w-full flex flex-col sm:flex-row gap-8 '>
    <div className=' flex flex-col'>
        <Label>Total Amount</Label>
        <Input className={` w-[90%] sm:w-[20vw] h-10 rounded-lg ${!totalAmount ?'ring-1 ring-red-600':''}`} placeholder='₹' value={totalAmount} onChange={(e) => {
   
    setTotalAmount(Number(e.target.value));

}}

/>
    </div>
   
    <div className=' flex flex-col'>
        <Label> Amount Received</Label>
        <Input className={` w-[90%] sm:w-[20vw] h-10 rounded-lg ${!amountReceive ? 'ring-1 ring-red-600':''}`} placeholder='₹' value={amountReceive} onChange={(e)=>{setAmountReceive(e.target.value)}}/>
    </div>


     {/* --------------------Amount pending ------------------------  */}
     <div className=' flex flex-col'>
        <Label> Pending Amount</Label>
        <Input className={` w-[90%] sm:w-[20vw] h-10 rounded-lg`} placeholder='₹' value={ amountReceive == '' ? 0 :(totalAmount-amountReceive)} readOnly />
    </div>
</div>

<div className=' w-[90%] sm:w-[40vw] mt-5'>
          <Label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
           Pending  Due Date
          </Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!dueDate}
                className="
                  w-full h-11 justify-between text-left font-normal
                  rounded-lg border-gray-300
                  hover:bg-gray-50 dark:hover:bg-gray-800
                  data-[empty=true]:text-muted-foreground
                "
              >
                {dueDate ? format(dueDate, "PPP") : <span>Select date</span>}
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </Button>
            </PopoverTrigger>

            <PopoverContent 
              className="w-auto p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                defaultMonth={dueDate}
                className="rounded-lg"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className='  flex flex-col gap-5'>
        <Label> Transection id</Label>
        <Input className={` w-[90%] sm:w-[20vw] h-10 rounded-lg`} placeholder='Enter Transection id' value={transectionId} onChange={(e)=>{setTransectionId(e.target.value)}}/>
            </div>
<div className='  mb-10'>
<Button className={` w-[95%] h-10  text-xl font-bold mt-10 mb-10`} onClick={()=>{handleSubmit()}}>
    Save</Button>
</div>

    </div>
  )
}

export default CreateInvoice