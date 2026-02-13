import AddCompany from "@/Component/AddCompany";
import AddCoustomer from "@/Component/AddCoustomer";
import AddItem from "@/Component/AddItem";
import AllInvoices from "@/Component/AllInvoices";
import AllUser from "@/Component/AllUser";
import ChangePassword from "@/Component/ChangePassword";
import Company from "@/Component/Company";
import Coustomer from "@/Component/Coustomer";
import CreateInvoice from "@/Component/CreateInvoice";
import Dashboard from "@/Component/Dashboard";
import EditInvoice from "@/Component/EditInvoice";
import EditItem from "@/Component/EditItem";
import InvoiceT1 from "@/Component/InvoiceT1";
import Item from "@/Component/Item";
import SideNav from "@/Component/SideNav";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { InvoiceContext } from "@/Context/InvoiceContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

export default function Layout() {
 const{backendUrl,token, navigate, role,name,userPermission}=useContext(InvoiceContext)

  useEffect(()=>{
   console.log(token, name , role )
   console.log(name)
   console.log(role)
   console.log(userPermission)
   
  },[token])

useEffect(()=>{
userBasedSales()
},[])

const userBasedSales =async()=>{
  try{
    const responce=await axios.get(`${backendUrl}/SALESTP`,{headers:{token}})
    console.log(responce)
  }
  catch(e){
    console.log(e.message)
  }
}
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">

        {/* Sidebar — fixed width */}
        <div className="sm:w-[260px] shrink-0 border-r">
          <SideNav />
        </div>

        {/* Main Content — takes remaining space */}
        <SidebarInset className="flex-1 bg-gray-50 p-4 mt-10 sm:mt-0 sm:p-6 ">
          <Routes>
            <Route  path="*" element={<Dashboard/>} />
            <Route path='createinvoice' element={<CreateInvoice/>}/>
           
            <Route path="coustomer" element={<Coustomer/>}/>
            <Route path="addcoustomer" element={<AddCoustomer/>}/>
            <Route path="item" element={<Item/>}/>
            <Route path="additem" element={<AddItem/>}/>
            <Route path="company" element={<Company/>}/>
            <Route path="addcompany" element={<AddCompany/>}/>
            <Route path="allinvoice" element={<AllInvoices/>}/>
            <Route path="invoice" element={<InvoiceT1/>}/>
            <Route path="alluser" element={<AllUser/>}/>
            <Route path="change" element={<ChangePassword/>}/>
            <Route path="edititem" element={<EditItem/>}/>
          </Routes>
        </SidebarInset>

      </div>
    </SidebarProvider>
  );
}
