import { Outlet, Route, Routes } from "react-router-dom"
import InvoiceT1 from "./Component/InvoiceT1"
import { Button } from "./components/ui/button"
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import Layout from "./Pages/Home"
import ProtectedRoute from "./Component/ProtectedRoute"
import Login from "./Pages/Login"
import ShowUserNameAurPassword from "./Component/ShowUserNameAurPassword"
import EditInvoice from "./Component/EditInvoice"



function App() {
  return (
    <div className="">
      <Routes>
       
        <Route path="/register" element={<Register/>}/>
         <Route path="/" element={<Login/>}/> 

        <Route element={<ProtectedRoute/>} >
        <Route path="/home/*" element={<Home/>}/>
        </Route>

        <Route path="/show" element={<ShowUserNameAurPassword/>}/>
        <Route path="/editinvoice" element={<EditInvoice/>}/>

      </Routes>
    </div>
  )
}

export default App