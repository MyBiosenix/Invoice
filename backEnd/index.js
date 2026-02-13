import express from  'express'
// import {ConnectCloudinary} from './config/cloudinary.js'
import {config} from 'dotenv'
import cors from 'cors'
import { ConnectDB } from './config/mongoDB.js'
import { AuthUser } from './middlewere/Auth.js'
import { authRouter } from './routes/authRoute.js'
import { defaultItems } from './middlewere/FixedItem.js'
import {ConnectCloudinary} from './config/claudinary.js'









const app=express()

//connection  function
config()
ConnectCloudinary()

ConnectDB()

defaultItems()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// routes
app.use('/api',authRouter)







// creating the connection 

console.log(process.env.MONGO_URL)
app.get('/',(req,res)=>{
    res.json('landing page is here ')
})

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})