import { InvoiceContext } from "@/Context/InvoiceContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const EditCompany = () => {
const {state}=useLocation()

  const { navigate, backendUrl, token, role, userPermission } =
    useContext(InvoiceContext)
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Updated Company Data:", formData);
    const response=await axios.put(`${backendUrl}/editcompany`,{formData,id:state},{headers:{token}})
    if(response.data.success){
        toast.success(response.data.msg)
        navigate('/home/company')
    }
    console.log(response.data)
  };


useEffect(()=>{
    console.log(state)   
},[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Edit Company
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              📞 Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              📍 Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Company
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCompany;
