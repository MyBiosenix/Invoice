import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const InvoiceContext=createContext()

export const InvoiceContextProvider=(prop)=>{
    const navigate=useNavigate()
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    // token 
    const [token,setToken]=useState(localStorage.getItem('token')? localStorage.getItem('token'):'')
    const [role,setRole]=useState(localStorage.getItem('role')? localStorage.getItem('role'):'')
    const [name,setName]=useState(localStorage.getItem('name')? localStorage.getItem('name'):'')
    const [userPermission,setUserPermission]=useState(localStorage.getItem('permission')? localStorage.getItem('permission'):'')
   const savedCompany = localStorage.getItem('company');
const [business, setBusiness] = useState(savedCompany ? JSON.parse(savedCompany) : '');

    const value={navigate, token,setToken , backendUrl, business, setBusiness, role, setRole, name, setName, userPermission, setUserPermission}
    return(
        <InvoiceContext.Provider value={value}>
            {prop.children}
        </InvoiceContext.Provider>
    )
}