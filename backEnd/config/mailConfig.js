import nodemailer from 'nodemailer'
import { config } from 'dotenv';
config()

export const trans=(email,password)=>{ 
  console.log("abdul")
  console.log(email)
  console.log(password)
  return nodemailer.createTransport({      
    host: "smtp.gmail.com",
    service:"gmail",
    auth: {
      type: "login", // default
      user: email, 
      pass: password
    }
  });
}

