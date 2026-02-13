import { InvoiceContext } from '@/Context/InvoiceContext'

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'


const EditInvoice = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientAddress:'',
    amountReceive:''
  })
  const[loading,setLoading]=useState(false)

  const{backendUrl,role,token,userPermission, navigate}=useContext(InvoiceContext)
  const {state}=useLocation()
  useEffect(()=>{
    console.log(state)
  },[])

  const handleChange = async(e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    
  }

  useEffect(()=>{
    if(userPermission !== 'edit'){
      navigate('/home/allinvoice')
    }
  },[userPermission])


  const handleSubmit = async(e) => {
    e.preventDefault()
try{
  setLoading(true)
    const response=await axios.put(`${backendUrl}/updateinvoice`,{formData, id:state.item},{headers:{token}})
    console.log(response)
    console.log('Updated Invoice:', formData)
    if(response.data.success ===true){
      toast.success(response.data.msg)
    }
}
catch(e){
  console.log(e.message)
}

finally{
  setLoading(false)
}
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            Edit Invoice
          </h2>
          <p className="text-slate-300 text-sm">
            Update customer and payment details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg bg-gray-100 px-4 py-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-800"
                placeholder="Customer name"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Contact</label>
              <input
                type="text"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg bg-gray-100 px-4 py-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-800"
                placeholder="Phone number"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg bg-gray-100 px-4 py-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-800"
              placeholder="Email address"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Address</label>
            <textarea
              name="clientAddress"
              value={formData.clientAddress}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full rounded-lg bg-gray-100 px-4 py-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-800"
              placeholder="Customer address"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Amount Received</label>
            <input
              type="number"
              name="amountReceive"
              value={formData.amountReceive}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg bg-gray-100 px-4 py-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-800"
              placeholder="Enter amount"
            />
          </div>

          <div className="flex justify-end">
            
            <button
              type="submit" 
              className="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-slate-800 to-slate-600 hover:opacity-90 transition"
            >
              {loading ?'loading......':'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditInvoice
