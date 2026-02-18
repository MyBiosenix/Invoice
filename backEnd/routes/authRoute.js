import express from "express";
import { alluser, changePassword, login, passwordDelete, register } from "../controller/AuthController.js";
import { AuthUser } from "../middlewere/Auth.js";
import {  createItem, deleteItem, EditItem, getAllItem } from "../controller/ItemController.js";
import { upload } from "../middlewere/multer.js";
import { addCompany, editCompany, getCompany, stateSpecificCompany } from "../controller/CompanyController.js";
import { allInvoice, allUserSales, companySales, createInvoice, deleteInvoice, EditInvoice, getAllDailySales, getDailySales, getinvoice, invoiceByCompanyName, sendMail } from "../controller/InvoiceController.js";
import { AuthAdmin } from "../middlewere/Admin.js";

export const authRouter=express.Router()

authRouter.post('/register',register)

authRouter.post('/login',login)

authRouter.get('/allitems',AuthUser,getAllItem)
authRouter.post('/createitem',AuthUser,createItem)
authRouter.post('/addcompany',AuthUser,upload.single('image'), addCompany)
authRouter.get('/getCompany',AuthUser,getCompany)
authRouter.post('/createinvoice',AuthUser,createInvoice)
authRouter.get('/getinvoice',AuthUser,getinvoice)
authRouter.post('/sendmail',AuthUser,upload.single('invoice'), sendMail)


// ------------------- getting single sales ------------
authRouter.get('/sales', AuthUser, getDailySales)


// ----------------------- get all sales -------------------
authRouter.get('/Allsales', AuthAdmin,getAllDailySales)


authRouter.get('/alluser',AuthAdmin,alluser)
//-------------- changing password -----------------
authRouter.put('/changepassword',AuthAdmin,changePassword)


//---------------- deleting user ------------------
authRouter.delete('/delete/:id',AuthAdmin,passwordDelete)

// ----------------- all invoice
authRouter.get('/allinvoice/:state',AuthUser,allInvoice)

// ----------------- delete invoice
authRouter.delete('/deleteinvoice/:id',AuthAdmin,deleteInvoice)


// --------------- edit invoice --------------

authRouter.put('/updateinvoice',AuthUser,EditInvoice)


// ------------------ state specific invoice-----------------

authRouter.get('/statecompany',AuthUser,stateSpecificCompany)

// ------------------- state specific invoice -----------------
authRouter.get('/SALESTP',AuthUser,companySales)

// ------------------------ deleting item ------------------
authRouter.delete('/deleteitem/:id', AuthUser, deleteItem)

// ----------------------- edit item ---------------
authRouter.put('/updateitem',AuthUser,EditItem)


// ---------------------- multi sales api ----------------
authRouter.get('/multisales/:id',AuthAdmin,allUserSales)


// ---------------------- getting invoice based on company name ---------
authRouter.get('/companyInvoice/:companyName',AuthUser,invoiceByCompanyName)

//------------------------- edit company ----------------

authRouter.put('/editcompany',AuthUser,editCompany)