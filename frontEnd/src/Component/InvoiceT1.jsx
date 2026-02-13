import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table";
import html2pdf from "html2pdf.js";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { InvoiceContext } from '@/Context/InvoiceContext';
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from 'react-toastify';
const InvoiceT1 = () => {
  const printRef = useRef();
  const {backendUrl,token, business}=useContext(InvoiceContext)
  const [loading,setLoading]=useState(false)

//--------------------- business -----------------

useEffect(()=>{
    console.log(business)
},[])

  const{state}=useLocation()

  const handleDownload = () => {

    if (!printRef.current) return;
    
    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css"] },
      })
      .from(printRef.current)
      .save();
  }


  // ------------------- handle submit ----------------

    const handleSubmit = async () => {
      try{
        setLoading(true)
  if (!printRef.current) return;

  const pdf = html2pdf()
    .set({
      margin: [10, 10, 10, 10],
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css"] },
    })
    .from(printRef.current);

  // 👇 get PDF as blob
  const blob = await pdf.outputPdf("blob");

  const formData=new FormData()
  formData.append('invoice',blob,"invoice.pdf")
  formData.append('companyName',business.companyName)
  formData.append('email',state.clientEmail)
  console.log(state.clientEmail)
  formData.append('name',state.clientName)

  const response=await axios.post(`${backendUrl}/sendmail`,formData,{headers:{token}})
  console.log(response)
    if(response.data.success === true){
      toast.success("mail send successfully")
    }
    else{
      toast.error(response.data.error)
    }

  // // send to backend
  // sendPdfToBackend(blob);
  }
  catch(e){
    console.log(e.message)
  }

  finally{
    setLoading(false)
  }
    
};

  




  useEffect(()=>{
    console.log(state)
  },[])

  return (
    <>
    {

      

      loading?
    <div className="flex w-full mt-10 flex-col gap-2 items-center justify-center">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-3/4" />
    </div>
  



    :<div className="w-full flex flex-col items-center py-8 bg-gray-100">
      <div className=' w-full flex flex-col sm:flex-row items-center justify-center gap-5'>
         <button
        onClick={handleDownload}
        className="mb-6 px-6 py-2 ring-1 rounded-xl  bg-slate-950 text-white   hover:ring-orange-800 transition text-xl font-bold"
      >
        Download Invoice
      </button>

       <button
        onClick={()=>{handleSubmit()}}
        className="mb-6 px-6 py-2 ring-1 rounded-xl  bg-slate-950 text-white   hover:ring-orange-800 transition text-xl font-bold"
      >
        Send Mail
      </button>
      </div>
     

      <div
        ref={printRef}
        className="bg-white p-6 shadow-lg rounded-lg flex flex-col space-y-4 font-sans text-gray-800"
        style={{ maxWidth: 800, width: "100%" }}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center border-b-2 border-blue-100 pb-3 mb-3">
            <div className='  flex flex-row items-center gap-3'>
                <img src={state?.imageUrl} alt="" className=' w-10 h-10' />
            <h3 className="text-xl font-bold text-gray-700">{state?.companyName}</h3>
            </div>
          
          <h1 className="text-3xl font-extrabold text-blue-600">INVOICE</h1>
        </div>

        {/* INVOICE INFO */}
        <div className="flex justify-between text-sm">
          <div className="space-y-1">
            <p><span className="font-semibold">Invoice No:</span> {state?.InvoiceNumber}</p>
            <p><span className="font-semibold">Date:</span> {new Date(`${state?.date}`).toLocaleDateString("en-GB")}</p>
          </div>
          <div className="text-right space-y-1 max-w-xs">
            <p>{state?.companyAddress}</p>
            <p><span className="font-semibold">Country:</span> India</p>
          </div>
        </div>

        {/* BILL TO */}
        <div>
          <h2 className="text-lg font-bold mt-2 mb-1">Bill To</h2>
          <div className="flex justify-between w-full max-w-md bg-gray-50  rounded-md shadow-sm gap-3">
            <div className="space-y-1 font-semibold">
              <p>Name:</p>
              <p>Email:</p>
              <p>Contact:</p>
             
              <p>Address:</p>
            </div>
            <div className=" space-y-1 font-medium  text-balance">
              <p>{state?.clientName}</p>
                 <p>{state?.clientEmail}</p>
              <p>{state?.clientPhone}</p>
           
              <p>{state?.clientAddress}</p>
            </div>
          </div>
        </div>

        {/* TABLE 1 */}
        {state?.item?.map((i,id)=>(
        <div key={id}>
        <div className="mt-4">
          <Table className="min-w-full border border-gray-200 shadow-sm text-sm">
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead className="border px-2 py-2 text-left font-medium">SOFTWARE NAME</TableHead>
                <TableHead className="border px-2 py-2 text-left font-medium">LINK VALIDITY </TableHead>
                <TableHead className="border px-2 py-2 text-left font-medium">PAYMENT MODE</TableHead>
                <TableHead className="border px-2 py-2 text-left font-medium">BILL DATE</TableHead>
              </TableRow>
            </TableHeader>
            

         
            <TableBody>
              <TableRow className="bg-white hover:bg-blue-50">
                <TableCell className="border px-2 py-2">{i.softwareName}</TableCell>
                <TableCell className="border px-2 py-2">{i.validityPeriod}</TableCell>
                <TableCell className="border px-2 py-2">{i.paymentType}</TableCell>
                <TableCell className="border px-2 py-2">{new Date(`${state?.date}`).toLocaleDateString("en-GB")}</TableCell>
              </TableRow>
            </TableBody>
           </Table>
        </div>

        {/* TABLE 2 */}
        <div className="mt-2">
          <Table className="min-w-full border border-gray-200 shadow-sm text-sm">
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead className="border px-2 py-2 text-left font-medium">DESCRIPTION</TableHead>
                <TableHead className="border px-2 py-2 text-right font-medium">UNIT PRICE</TableHead>
                <TableHead className="border px-2 py-2 text-right font-medium">DISCOUNT</TableHead>
                <TableHead className="border px-2 py-2 text-right font-medium">TOTAL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-white hover:bg-blue-50">
                <TableCell className="border px-2 py-2 text-balance">
                  {i.des}
                </TableCell>
                <TableCell className="border px-2 py-2 text-right">{i.Amount}</TableCell>
                <TableCell className="border px-2 py-2 text-right">₹0.00</TableCell>
                <TableCell className="border px-2 py-2 text-right font-semibold">{i.Amount}</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow className="bg-gray-50">
                <TableCell colSpan={3} className="border px-2 py-2 text-right font-medium">Sub Total</TableCell>
                <TableCell className="border px-2 py-2 text-right font-medium">{i.Amount}</TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell colSpan={3} className="border px-2 py-2 text-right font-medium">Amount Paid</TableCell>
                <TableCell className="border px-2 py-2 text-right font-medium">{state?.amountReceive}</TableCell>
              </TableRow>


             <TableRow className="bg-gray-50">
  <TableCell colSpan={6} className="p-0">
    <div className="flex justify-between px-3 w-full">

      {/* LEFT SIDE */}
      <div className="flex">
        <div className="border px-2 py-2 text-right font-semibold">
          Due Date
        </div>
        <div className="border px-2 py-2 text-right font-bold">
         {new Date(`${state?.dueDate}`).toLocaleDateString("en-GB")}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex">
        <div className="border px-2 py-2 text-right font-semibold">
          Balance Due
        </div>
        <div className="border px-2 py-2 text-right font-bold">
          {parseInt(state?.totalAmount - state?.amountReceive)}
        </div>
      </div>

    </div>
  </TableCell>
</TableRow>

            </TableFooter>
          </Table>
        </div>
        </div>
                   ))
}
   

        {/* PAYMENT DETAILS */}
        <div className="mt-4 text-sm space-y-1 bg-blue-50 p-3 rounded-md shadow-sm">
          <h3 className="font-bold text-blue-700">Payment Details</h3>
          <p><span className="font-semibold">Payment Type:</span> Online</p>
          <p><span className="font-semibold">Transaction ID:</span> {state?.transectionId}</p>
        </div>

        {/* FOOTER */}
        <div className="mt-4 text-center text-sm text-gray-700 space-y-1">
          <p>For any doubts & queries, WhatsApp us at {state?.companyPhone}</p>
          <p className="text-blue-600 font-semibold">Your License Key: {`${Math.floor(Math.random()*1e5)}-${Math.floor(Math.random()*1e7)}-${Math.floor(Math.random()*1e11)}`
}</p>
        </div>
      </div>
    </div>
}
    </>
  );
};

export default InvoiceT1;
