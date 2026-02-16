import { InvoiceContext } from '@/Context/InvoiceContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import Graph from './Graph'
import PeiChart from './PeiChart'


//------------------- c hart import and register 


const Dashboard = () => {
    
        const{backendUrl,token, navigate, role, userPermission}=useContext(InvoiceContext)
        const[amountR,setAmountR]=useState(0)
        const[amountBalance, setAmountBalance]=useState(0)
    
  useEffect(()=>{
    console.log(userPermission)
  },[userPermission])


    //------------------getting invoice---------------------
    const[invoice,setInvoice]=useState([])
    const getInvoice=async()=>{
            try{
                if(role !=='admin' && role !=='edit'){
                  console.log('hii')
                const response= await axios.get(`${backendUrl}/getinvoice`,{headers:{token}})
                console.log(response.data)
                    setInvoice(response.data.invoice) 
                }
                
            } 
            catch(e){
                console.log(e.message)
            }
    }


    // ------------------ getting all invoice --------------------

    const getAllInvoice=async()=>{
      try{
            if(role ==='admin' || userPermission ==='edit'){
              
           const response= await axios.get(`${backendUrl}/allinvoice`,{headers:{token}})
                console.log(response.data)
                 setInvoice(response.data.invoice) 
            }
                
                
      }
      catch(e){
        toast.error(e.message)
      }
    }

    useEffect(()=>{
      getAllInvoice()
    },[])

    useEffect(()=>{
        getInvoice()
    },[])



     useEffect(()=>{
      let AmountReceived=0
      let AmountDue=0
      invoice?.map((i)=>{
        AmountReceived=AmountReceived+i?.amountReceive
        AmountDue=AmountDue+ i?.totalAmount-i.amountReceive
        setAmountBalance(AmountDue)
        setAmountR(AmountReceived)
      })
    },[invoice])

  return (
    <>
  <div className=' flex flex-col w-full h-screen   items-center  '>
      


       <h2 className="inter text-3xl font-extrabold   
                bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 
                bg-clip-text text-transparent drop-shadow-lg 
                relative inline-block after:content-[''] after:block after:h-1 
                after:bg-gradient-to-r after:from-red-500 after:via-pink-500 after:to-purple-500 
                after:rounded-full after:w-1/2 after:mt-1 after:animate-pulse">
  Dashboard
 </h2>


 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 mt-10">

  {/* Total Invoices */}
  <div className="bg-white border border-gray-200 rounded-lg p-5 flex gap-4 hover:border-gray-300 transition  w-[90vw] sm:w-[20vw]">
    <div className="w-1 rounded-full bg-gray-400"></div>
    <div className="flex-1">
      <p className="text-sm text-gray-500">Total Invoices</p>
      <p className="mt-1 text-3xl font-semibold text-gray-900">
        {invoice?.length}
      </p>
    </div>
  </div>

  {/* Paid Amount */}
  <div className="bg-white border border-gray-200 rounded-lg p-5 flex gap-4 hover:border-green-400 transition w-[90vw] sm:w-[20vw]">
    <div className="w-1 rounded-full bg-green-500"></div>
    <div className="flex-1">
      <p className="text-sm text-gray-500">Paid Amount</p>
      <p className="mt-1 text-3xl font-semibold text-gray-900">
   ₹{amountR}


      </p>
      <p className="text-xs text-gray-400 mt-1">
        Received
      </p>
    </div>
  </div>

  {/* Pending Amount */}
  <div className="bg-white border border-gray-200 rounded-lg p-5 flex gap-4 hover:border-red-400 transition w-[90vw] sm:w-[20vw]">
    <div className="w-1 rounded-full bg-red-500"></div>
    <div className="flex-1">
      <p className="text-sm text-gray-500">Pending Amount</p>
      <p className="mt-1 text-3xl font-semibold text-gray-900">
        ₹{amountBalance}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Pending collection
      </p>
    </div>
  </div>

</div>



    {<Graph/>}

    { role ==='admin' &&(
      <PeiChart/>
    )
      }
    </div>

  
    </>
  )
}

export default Dashboard
