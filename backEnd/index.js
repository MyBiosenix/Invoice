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

config()
ConnectCloudinary()

ConnectDB()

defaultItems()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
}))

app.use('/api',authRouter)

app.get('/',(req,res)=>{
    res.json('landing page is here ')
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})