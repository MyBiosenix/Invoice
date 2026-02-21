import e from "cors"
import { InvoiceModel } from "../models/InvoiceModel.js"
import { UserModel } from "../models/UserModel.js"
import { trans } from "../config/mailConfig.js"
import nodemailer from 'nodemailer'
import { CompanyModel } from "../models/CompanyModel.js"

export const createInvoice=async(req,res)=>{
    try{
        const{invoiceNumber,clientName, clientEmail,clientPhone, clientAddress,companyName,companyEmail,companyPhone, companyAddress,imageUrl,totalAmount,amountReceive,sItem, date,dueDate,transectionId,state}=req.body
        // console.log(clientName)
        const user=await UserModel.findOne({userId:req.userId.Id})
        const company=await CompanyModel.findOne({companyName:companyName})
     
        console.log(company)
        const invoice=await InvoiceModel.create({
            InvoiceNumber:invoiceNumber,
            clientName,
            clientEmail,
            clientPhone,
            clientAddress,
            companyName,
            companyEmail,
            companyPhone,
            companyAddress,
            imageUrl,
            totalAmount,
            amountReceive,
            user:user._id,
            company:company._id,
            item:sItem,
            date,
            state,
            dueDate,
            transectionId
        })
        
        user.invoice.push(invoice._id)
        await user.save()

        company.invoice.push(invoice._id)
        await company.save()
        // console.log(invoice)
        res.json({success:true,invoice})
    }
    catch(e){
        res.json({success:false,error:e.message})
    }
}


export const sendMail=async(req,res)=>{
    try{
        const invoice=req.file.path
        const{companyName, email, name}=req.body

        console.log(companyName,email)
        // console.log(invoice)
        // console.log(companyName)


        if(companyName === 'acewok'){
          const trap=nodemailer.createTransport({      
            host: "smtp.gmail.com",
            service:"gmail",
            auth: {
              type: "login", // default
              user: process.env.BILLS, 
              pass: process.env.BILLS_PASSWORD
            }
          });


          await trap.sendMail({
            from: process.env.BILLS,
            to: `${email}`,
            subject: "📄 Your  invoice",
            html: `
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      <style>
        @media only screen and (max-width: 600px) {
          .wrapper {
            padding: 16px !important;
          }
          .container {
            border-radius: 0 !important;
          }
          h2 {
            font-size: 18px !important;
          }
          p {
            font-size: 14px !important;
          }
          .accept-box {
            font-size: 14px !important;
            padding: 14px !important;
          }
        }
      </style>
      </head>
      
      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
      
      <div class="wrapper" style="padding:30px;">
        <div class="container" style="
          width:100%;
          max-width:600px;
          margin:0 auto;
          background:#ffffff;
          border-radius:8px;
          overflow:hidden;
          box-shadow:0 4px 12px rgba(0,0,0,0.08);
        ">
      
          <!-- Header -->
          <div style="background-color:#0f172a; color:#ffffff; padding:20px 24px;">
            <h2 style="margin:0; font-size:22px; line-height:1.3;">
              Welcome to ${companyName}
            </h2>
          </div>
      
          <!-- Body -->
          <div style="padding:24px; color:#333333; line-height:1.6; font-size:15px;">
            <p style="margin:0 0 16px 0;">Dear Valued Client,</p>
      
            <p style="margin:0 0 16px 0;">
              Warm greetings and a heartfelt welcome to the <strong>${companyName}</strong>.
            </p>
      
            <p style="margin:0 0 16px 0;">
              Please find your <strong>invoice attached</strong> with this email for your reference and records.
            </p>
      
            <p style="margin:0 0 16px 0;">
              We kindly request you to review the invoice and share a formal acceptance by replying with the statement below:
            </p>
      
            <div class="accept-box" style="
              background-color:#f1f5f9;
              border-left:4px solid #2563eb;
              padding:15px;
              margin:20px 0;
              font-weight:bold;
              color:#1e3a8a;
              font-size:15px;
              line-height:1.5;
            ">
              “I ACCEPT FOLLOWING TERMS & CONDITIONS”
            </div>
      
            <p style="margin:0 0 16px 0;">
              Your confirmation will help us proceed further with the agreement and service activation.
            </p>
      
            <p style="margin:0 0 16px 0;">
              Should you have any questions or require clarification, please feel free to reach out to us.
            </p>
      
            <p style="margin:24px 0 0 0;">
              Thank you for choosing <strong>${companyName}</strong>.
            </p>
      
            <p style="margin:16px 0 0 0;">
              Best Regards,<br />
              <strong>${companyName}</strong><br />
              <span style="color:#555;">Support & Billing Team</span>
            </p>
          </div>
      
          <!-- Footer -->
          <div style="
            background-color:#f8fafc;
            text-align:center;
            padding:14px;
            font-size:12px;
            color:#777;
          ">
            © 2026 ${companyName}. All rights reserved.
          </div>
      
        </div>
      </div>
      
      </body>
      </html>
      `
      ,
            attachments:[
              {
                  filename:'invoice.pdf',
                  path:invoice
              }
            ]
          });


          console.log(process.env.INQUINITI_EMAIL)
          console.log(process.env.INQUINITI_PASSWORD)
  return res.json({success:true,msg:"invoice send successfully"})


        }

        if(companyName === 'inquiniti'){
           

            const trap=nodemailer.createTransport({      
                host: "smtp.gmail.com",
                service:"gmail",
                auth: {
                  type: "login", // default
                  user: process.env.INQUINITI_EMAIL, 
                  pass: process.env.INQUINITI_PASSWORD
                }
              });
                    await trap.sendMail({
      from: process.env.INQUINITI_EMAIL,
      to: `${email}`,
      subject: "📄 Your  invoice",
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<style>
  @media only screen and (max-width: 600px) {
    .wrapper {
      padding: 16px !important;
    }
    .container {
      border-radius: 0 !important;
    }
    h2 {
      font-size: 18px !important;
    }
    p {
      font-size: 14px !important;
    }
    .accept-box {
      font-size: 14px !important;
      padding: 14px !important;
    }
  }
</style>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

<div class="wrapper" style="padding:30px;">
  <div class="container" style="
    width:100%;
    max-width:600px;
    margin:0 auto;
    background:#ffffff;
    border-radius:8px;
    overflow:hidden;
    box-shadow:0 4px 12px rgba(0,0,0,0.08);
  ">

    <!-- Header -->
    <div style="background-color:#0f172a; color:#ffffff; padding:20px 24px;">
      <h2 style="margin:0; font-size:22px; line-height:1.3;">
        Welcome to ${companyName}
      </h2>
    </div>

    <!-- Body -->
    <div style="padding:24px; color:#333333; line-height:1.6; font-size:15px;">
      <p style="margin:0 0 16px 0;">Dear Valued Client,</p>

      <p style="margin:0 0 16px 0;">
        Warm greetings and a heartfelt welcome to the <strong>${companyName}</strong>.
      </p>

      <p style="margin:0 0 16px 0;">
        Please find your <strong>invoice attached</strong> with this email for your reference and records.
      </p>

      <p style="margin:0 0 16px 0;">
        We kindly request you to review the invoice and share a formal acceptance by replying with the statement below:
      </p>

      <div class="accept-box" style="
        background-color:#f1f5f9;
        border-left:4px solid #2563eb;
        padding:15px;
        margin:20px 0;
        font-weight:bold;
        color:#1e3a8a;
        font-size:15px;
        line-height:1.5;
      ">
        “I ACCEPT FOLLOWING TERMS & CONDITIONS”
      </div>

      <p style="margin:0 0 16px 0;">
        Your confirmation will help us proceed further with the agreement and service activation.
      </p>

      <p style="margin:0 0 16px 0;">
        Should you have any questions or require clarification, please feel free to reach out to us.
      </p>

      <p style="margin:24px 0 0 0;">
        Thank you for choosing <strong>${companyName}</strong>.
      </p>

      <p style="margin:16px 0 0 0;">
        Best Regards,<br />
        <strong>${companyName}</strong><br />
        <span style="color:#555;">Support & Billing Team</span>
      </p>
    </div>

    <!-- Footer -->
    <div style="
      background-color:#f8fafc;
      text-align:center;
      padding:14px;
      font-size:12px;
      color:#777;
    ">
      © 2026 ${companyName}. All rights reserved.
    </div>

  </div>
</div>

</body>
</html>
`
,
      attachments:[
        {
            filename:'invoice.pdf',
            path:invoice
        }
      ]
    });
     console.log(process.env.INQUINITI_EMAIL)
            console.log(process.env.INQUINITI_PASSWORD)
    return res.json({success:true,msg:"invoice send successfully"})

       
        }

        //------------------- mail to --------------

        else if(companyName === 'tenr global'){
              const trap=nodemailer.createTransport({      
                host: "smtp.gmail.com",
                service:"gmail",
                auth: {
                  type: "login", // default
                  user: process.env.TENRGLOBALSOLUTION_EMAIL, 
                  pass: process.env.TENRGLOBALSOLUTION_PASSWORD
                }
              });
                    await trap.sendMail({
      from: process.env.TENRGLOBALSOLUTION_EMAIL,
      to: `${email}`,
      subject: "📄 Your  invoice",
       html: `


           <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <div style="background-color: #0f172a; color: #ffffff; padding: 20px 30px;">
      <h2 style="margin: 0; font-size: 22px;">Welcome to ${companyName}</h2>
    </div>

    <!-- Body -->
    <div style="padding: 30px; color: #333333; line-height: 1.6;">
      <p style="font-size: 15px;">Dear Valued Client,</p>

      <p style="font-size: 15px;">
        Warm greetings and a heartfelt welcome to the <strong>${companyName} Family</strong>.
      </p>

      <p style="font-size: 15px;">
        Please find your <strong>invoice attached</strong> with this email for your reference and records.
      </p>

      <p style="font-size: 15px;">
        We kindly request you to review the invoice and share a formal acceptance by replying with the statement below:
      </p>

      <div style="background-color: #f1f5f9; border-left: 4px solid #2563eb; padding: 12px 15px; margin: 20px 0; font-weight: bold; color: #1e3a8a;">
        “I ACCEPT FOLLOWING TERMS & CONDITIONS”
      </div>

      <p style="font-size: 15px;">
        Your confirmation will help us proceed further with the agreement and service activation.
      </p>

      <p style="font-size: 15px;">
        Should you have any questions or require clarification, please feel free to reach out to us.
      </p>

      <p style="margin-top: 30px; font-size: 15px;">
        Thank you for choosing <strong>${companyName} </strong>.
      </p>

      <p style="margin-top: 20px; font-size: 15px;">
        Best Regards,<br />
        <strong>${companyName}</strong><br />
        <span style="color: #555;">Support & Billing Team</span>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; text-align: center; padding: 15px; font-size: 12px; color: #777;">
      © 2026 ${companyName}. All rights reserved.
    </div>

  </div>
</div>

      `,
      attachments:[
        {
            filename:'invoice.pdf',
            path:invoice
        }
      ]
    });


            console.log(process.env.TENRGLOBALSOLUTION_EMAIL)
            console.log(process.env.TENRGLOBALSOLUTION_PASSWORD)
            return res.json({success:true, msg:"email send successfully"})
        }

        else if(companyName === 'sure step'){
            console.log(process.env.SURESTEPSOLUTIONS_EMAIL)
            console.log(process.env.SURESTEPSOLUTIONS_PASSWORD)



              const trap=nodemailer.createTransport({      
                host: "smtp.gmail.com",
                service:"gmail",
                auth: {
                  type: "login", // default
                  user: process.env.SURESTEPSOLUTIONS_EMAIL, 
                  pass: process.env.SURESTEPSOLUTIONS_PASSWORD
                }
              });
                    await trap.sendMail({
      from: process.env.SURESTEPSOLUTIONS_EMAI,
      to: `${email}`,
      subject: "📄 Your  invoice",
      html: `


           <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <div style="background-color: #0f172a; color: #ffffff; padding: 20px 30px;">
      <h2 style="margin: 0; font-size: 22px;">Welcome to ${companyName}</h2>
    </div>

    <!-- Body -->
    <div style="padding: 30px; color: #333333; line-height: 1.6;">
      <p style="font-size: 15px;">Dear Valued Client,</p>

      <p style="font-size: 15px;">
        Warm greetings and a heartfelt welcome to the <strong>${companyName} Family</strong>.
      </p>

      <p style="font-size: 15px;">
        Please find your <strong>invoice attached</strong> with this email for your reference and records.
      </p>

      <p style="font-size: 15px;">
        We kindly request you to review the invoice and share a formal acceptance by replying with the statement below:
      </p>

      <div style="background-color: #f1f5f9; border-left: 4px solid #2563eb; padding: 12px 15px; margin: 20px 0; font-weight: bold; color: #1e3a8a;">
        “I ACCEPT FOLLOWING TERMS & CONDITIONS”
      </div>

      <p style="font-size: 15px;">
        Your confirmation will help us proceed further with the agreement and service activation.
      </p>

      <p style="font-size: 15px;">
        Should you have any questions or require clarification, please feel free to reach out to us.
      </p>

      <p style="margin-top: 30px; font-size: 15px;">
        Thank you for choosing <strong>${companyName} </strong>.
      </p>

      <p style="margin-top: 20px; font-size: 15px;">
        Best Regards,<br />
        <strong>${companyName}</strong><br />
        <span style="color: #555;">Support & Billing Team</span>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; text-align: center; padding: 15px; font-size: 12px; color: #777;">
      © 2026 ${companyName}. All rights reserved.
    </div>

  </div>
</div>

      `,
      attachments:[
        {
            filename:'invoice.pdf',
            path:invoice
        }
      ]
    });

    return res.json({success:true, msg:"email send successfully"})
        }

        else if(companyName === 'isimple'){
            console.log(process.env.ISIMPLESOLUTIONS_EMAIL)
            console.log(process.env.ISIMPLESOLUTIONS_PASSWORD)

              const trap=nodemailer.createTransport({      
                host: "smtp.gmail.com",
                service:"gmail",
                auth: {
                  type: "login", // default
                  user: process.env.ISIMPLESOLUTIONS_EMAIL, 
                  pass: process.env.ISIMPLESOLUTIONS_PASSWORD
                }
              });
                    await trap.sendMail({
      from: process.env.ISIMPLESOLUTIONS_EMAIL,
      to: `${email}`,
      subject: "📄 Your  invoice",
        html: `


           <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <div style="background-color: #0f172a; color: #ffffff; padding: 20px 30px;">
      <h2 style="margin: 0; font-size: 22px;">Welcome to ${companyName}</h2>
    </div>

    <!-- Body -->
    <div style="padding: 30px; color: #333333; line-height: 1.6;">
      <p style="font-size: 15px;">Dear Valued Client,</p>

      <p style="font-size: 15px;">
        Warm greetings and a heartfelt welcome to the <strong>${companyName} Family</strong>.
      </p>

      <p style="font-size: 15px;">
        Please find your <strong>invoice attached</strong> with this email for your reference and records.
      </p>

      <p style="font-size: 15px;">
        We kindly request you to review the invoice and share a formal acceptance by replying with the statement below:
      </p>

      <div style="background-color: #f1f5f9; border-left: 4px solid #2563eb; padding: 12px 15px; margin: 20px 0; font-weight: bold; color: #1e3a8a;">
        “I ACCEPT FOLLOWING TERMS & CONDITIONS”
      </div>

      <p style="font-size: 15px;">
        Your confirmation will help us proceed further with the agreement and service activation.
      </p>

      <p style="font-size: 15px;">
        Should you have any questions or require clarification, please feel free to reach out to us.
      </p>

      <p style="margin-top: 30px; font-size: 15px;">
        Thank you for choosing <strong>${companyName} </strong>.
      </p>

      <p style="margin-top: 20px; font-size: 15px;">
        Best Regards,<br />
        <strong>${companyName}</strong><br />
        <span style="color: #555;">Support & Billing Team</span>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; text-align: center; padding: 15px; font-size: 12px; color: #777;">
      © 2026 ${companyName}. All rights reserved.
    </div>

  </div>
</div>

      `,
      attachments:[
        {
            filename:'invoice.pdf',
            path:invoice
        }
      ]
    });

    return res.json({success:true,msg:"email send successfully"})
        }

        else if(companyName === 'avioliv'){
            console.log(process.env.AVIOLIVTECHNOLOGIES_EMAIL)
            console.log(process.env.AVIOLIVTECHNOLOGIES_PASSWORD)


              const trap=nodemailer.createTransport({      
                host: "smtp.gmail.com",
                service:"gmail",
                auth: {
                  type: "login", // default
                  user: process.env.AVIOLIVTECHNOLOGIES_EMAIL, 
                  pass: process.env.AVIOLIVTECHNOLOGIES_PASSWORD
                }
              });
                    await trap.sendMail({
      from: process.env.AVIOLIVTECHNOLOGIES_EMAIL,
      to: `${email}`,
      subject: "📄 Your  invoice",
     html: `


           <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <div style="background-color: #0f172a; color: #ffffff; padding: 20px 30px;">
      <h2 style="margin: 0; font-size: 22px;">Welcome to ${companyName}</h2>
    </div>

    <!-- Body -->
    <div style="padding: 30px; color: #333333; line-height: 1.6;">
      <p style="font-size: 15px;">Dear Valued Client,</p>

      <p style="font-size: 15px;">
        Warm greetings and a heartfelt welcome to the <strong>${companyName} Family</strong>.
      </p>

      <p style="font-size: 15px;">
        Please find your <strong>invoice attached</strong> with this email for your reference and records.
      </p>

      <p style="font-size: 15px;">
        We kindly request you to review the invoice and share a formal acceptance by replying with the statement below:
      </p>

      <div style="background-color: #f1f5f9; border-left: 4px solid #2563eb; padding: 12px 15px; margin: 20px 0; font-weight: bold; color: #1e3a8a;">
        “I ACCEPT FOLLOWING TERMS & CONDITIONS”
      </div>

      <p style="font-size: 15px;">
        Your confirmation will help us proceed further with the agreement and service activation.
      </p>

      <p style="font-size: 15px;">
        Should you have any questions or require clarification, please feel free to reach out to us.
      </p>

      <p style="margin-top: 30px; font-size: 15px;">
        Thank you for choosing <strong>${companyName} </strong>.
      </p>

      <p style="margin-top: 20px; font-size: 15px;">
        Best Regards,<br />
        <strong>${companyName}</strong><br />
        <span style="color: #555;">Support & Billing Team</span>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; text-align: center; padding: 15px; font-size: 12px; color: #777;">
      © 2026 ${companyName}. All rights reserved.
    </div>

  </div>
</div>

      `,
      attachments:[
        {
            filename:'invoice.pdf',
            path:invoice
        }
      ]
    });
    return res.json({success:true,msg:"email send "})
        }

        else if(companyName === 'tech2shine'){
            console.log(process.env.TECH2SHINELABS_EMAIL)
            console.log(process.env.TECH2SHINELABS_PASSWORD)

              const trap=nodemailer.createTransport({      
                host: "smtp.gmail.com",
                service:"gmail",
                auth: {
                  type: "login", // default
                  user: process.env.TECH2SHINELABS_EMAIL, 
                  pass: process.env.TECH2SHINELABS_PASSWORD
                }
              });
                    await trap.sendMail({
      from: process.env.TECH2SHINELABS_EMAIL,
      to: `${email}`,
      subject: "📄 Your  invoice",
        html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<style>
  @media only screen and (max-width: 600px) {
    .wrapper {
      padding: 16px !important;
    }
    .container {
      border-radius: 0 !important;
    }
    h2 {
      font-size: 18px !important;
    }
    p {
      font-size: 14px !important;
    }
    .accept-box {
      font-size: 14px !important;
      padding: 14px !important;
    }
  }
</style>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

<div class="wrapper" style="padding:30px;">
  <div class="container" style="
    width:100%;
    max-width:600px;
    margin:0 auto;
    background:#ffffff;
    border-radius:8px;
    overflow:hidden;
    box-shadow:0 4px 12px rgba(0,0,0,0.08);
  ">

    <!-- Header -->
    <div style="background-color:#0f172a; color:#ffffff; padding:20px 24px;">
      <h2 style="margin:0; font-size:22px; line-height:1.3;">
        Welcome to ${companyName}
      </h2>
    </div>

    <!-- Body -->
    <div style="padding:24px; color:#333333; line-height:1.6; font-size:15px;">
      <p style="margin:0 0 16px 0;">Dear Valued Client,</p>

      <p style="margin:0 0 16px 0;">
        Warm greetings and a heartfelt welcome to the <strong>${companyName}</strong>.
      </p>

      <p style="margin:0 0 16px 0;">
        Please find your <strong>invoice attached</strong> with this email for your reference and records.
      </p>

      <p style="margin:0 0 16px 0;">
        We kindly request you to review the invoice and share a formal acceptance by replying with the statement below:
      </p>

      <div class="accept-box" style="
        background-color:#f1f5f9;
        border-left:4px solid #2563eb;
        padding:15px;
        margin:20px 0;
        font-weight:bold;
        color:#1e3a8a;
        font-size:15px;
        line-height:1.5;
      ">
        “I ACCEPT FOLLOWING TERMS & CONDITIONS”
      </div>

      <p style="margin:0 0 16px 0;">
        Your confirmation will help us proceed further with the agreement and service activation.
      </p>

      <p style="margin:0 0 16px 0;">
        Should you have any questions or require clarification, please feel free to reach out to us.
      </p>

      <p style="margin:24px 0 0 0;">
        Thank you for choosing <strong>${companyName}</strong>.
      </p>

      <p style="margin:16px 0 0 0;">
        Best Regards,<br />
        <strong>${companyName}</strong><br />
        <span style="color:#555;">Support & Billing Team</span>
      </p>
    </div>

    <!-- Footer -->
    <div style="
      background-color:#f8fafc;
      text-align:center;
      padding:14px;
      font-size:12px;
      color:#777;
    ">
      © 2026 ${companyName}. All rights reserved.
    </div>

  </div>
</div>

</body>
</html>
`,
      attachments:[
        {
            filename:'invoice.pdf',
            path:invoice
        }
      ]
    });

    res.json({success:true,msg:"email send "})
        }

        else if(companyName === 'octagate'){
            console.log(process.env.OCTAGATE_EMAIL)
            console.log(process.env.OCTAGATE_PASSWORD)

              const trap=nodemailer.createTransport({      
                host: "smtp.gmail.com",
                service:"gmail",
                auth: {
                  type: "login", // default
                  user: process.env.OCTAGATE_EMAIL, 
                  pass: process.env.OCTAGATE_PASSWORD
                }
              });
                    await trap.sendMail({
      from: process.env.OCTAGATE_EMAIL,
      to: `${email}`,
      subject: "📄 Your  invoice",
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<style>
  @media only screen and (max-width: 600px) {
    .wrapper {
      padding: 16px !important;
    }
    .container {
      border-radius: 0 !important;
    }
    h2 {
      font-size: 18px !important;
    }
    p {
      font-size: 14px !important;
    }
    .accept-box {
      font-size: 14px !important;
      padding: 14px !important;
    }
  }
</style>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

<div class="wrapper" style="padding:30px;">
  <div class="container" style="
    width:100%;
    max-width:600px;
    margin:0 auto;
    background:#ffffff;
    border-radius:8px;
    overflow:hidden;
    box-shadow:0 4px 12px rgba(0,0,0,0.08);
  ">

    <!-- Header -->
    <div style="background-color:#0f172a; color:#ffffff; padding:20px 24px;">
      <h2 style="margin:0; font-size:22px; line-height:1.3;">
        Welcome to ${companyName}
      </h2>
    </div>

    <!-- Body -->
    <div style="padding:24px; color:#333333; line-height:1.6; font-size:15px;">
      <p style="margin:0 0 16px 0;">Dear Valued Client,</p>

      <p style="margin:0 0 16px 0;">
        Warm greetings and a heartfelt welcome to the <strong>${companyName}</strong>.
      </p>

      <p style="margin:0 0 16px 0;">
        Please find your <strong>invoice attached</strong> with this email for your reference and records.
      </p>

      <p style="margin:0 0 16px 0;">
        We kindly request you to review the invoice and share a formal acceptance by replying with the statement below:
      </p>

      <div class="accept-box" style="
        background-color:#f1f5f9;
        border-left:4px solid #2563eb;
        padding:15px;
        margin:20px 0;
        font-weight:bold;
        color:#1e3a8a;
        font-size:15px;
        line-height:1.5;
      ">
        “I ACCEPT FOLLOWING TERMS & CONDITIONS”
      </div>

      <p style="margin:0 0 16px 0;">
        Your confirmation will help us proceed further with the agreement and service activation.
      </p>

      <p style="margin:0 0 16px 0;">
        Should you have any questions or require clarification, please feel free to reach out to us.
      </p>

      <p style="margin:24px 0 0 0;">
        Thank you for choosing <strong>${companyName}</strong>.
      </p>

      <p style="margin:16px 0 0 0;">
        Best Regards,<br />
        <strong>${companyName}</strong><br />
        <span style="color:#555;">Support & Billing Team</span>
      </p>
    </div>

    <!-- Footer -->
    <div style="
      background-color:#f8fafc;
      text-align:center;
      padding:14px;
      font-size:12px;
      color:#777;
    ">
      © 2026 ${companyName}. All rights reserved.
    </div>

  </div>
</div>

</body>
</html>
`,
      attachments:[
        {
            filename:'invoice.pdf',
            path:invoice
        }
      ]
    });
    
    return res.json({success:true, msg:"email send "})
        }

        else if(companyName === 'techiq'){
            console.log('techiqlabs')
          const trap=nodemailer.createTransport({      
            host: "smtp.gmail.com",
            service:"gmail",
            auth: {
              type: "login", // default
              user: process.env.TECHIQLABS_EMAIL, 
              pass: process.env.TECHIQLABS_PASSWORD
            }
          });

          await trap.sendMail({
            from: process.env.TECHIQLABS_EMAIL,
            to: `${email}`,
            subject: "📄 Your  invoice",
            html: `
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      <style>
        @media only screen and (max-width: 600px) {
          .wrapper {
            padding: 16px !important;
          }
          .container {
            border-radius: 0 !important;
          }
          h2 {
            font-size: 18px !important;
          }
          p {
            font-size: 14px !important;
          }
          .accept-box {
            font-size: 14px !important;
            padding: 14px !important;
          }
        }
      </style>
      </head>
      
      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
      
      <div class="wrapper" style="padding:30px;">
        <div class="container" style="
          width:100%;
          max-width:600px;
          margin:0 auto;
          background:#ffffff;
          border-radius:8px;
          overflow:hidden;
          box-shadow:0 4px 12px rgba(0,0,0,0.08);
        ">
      
          <!-- Header -->
          <div style="background-color:#0f172a; color:#ffffff; padding:20px 24px;">
            <h2 style="margin:0; font-size:22px; line-height:1.3;">
              Welcome to ${companyName}
            </h2>
          </div>
      
          <!-- Body -->
          <div style="padding:24px; color:#333333; line-height:1.6; font-size:15px;">
            <p style="margin:0 0 16px 0;">Dear Valued Client,</p>
      
            <p style="margin:0 0 16px 0;">
              Warm greetings and a heartfelt welcome to the <strong>${companyName}</strong>.
            </p>
      
            <p style="margin:0 0 16px 0;">
              Please find your <strong>invoice attached</strong> with this email for your reference and records.
            </p>
      
            <p style="margin:0 0 16px 0;">
              We kindly request you to review the invoice and share a formal acceptance by replying with the statement below:
            </p>
      
            <div class="accept-box" style="
              background-color:#f1f5f9;
              border-left:4px solid #2563eb;
              padding:15px;
              margin:20px 0;
              font-weight:bold;
              color:#1e3a8a;
              font-size:15px;
              line-height:1.5;
            ">
              “I ACCEPT FOLLOWING TERMS & CONDITIONS”
            </div>
      
            <p style="margin:0 0 16px 0;">
              Your confirmation will help us proceed further with the agreement and service activation.
            </p>
      
            <p style="margin:0 0 16px 0;">
              Should you have any questions or require clarification, please feel free to reach out to us.
            </p>
      
            <p style="margin:24px 0 0 0;">
              Thank you for choosing <strong>${companyName}</strong>.
            </p>
      
            <p style="margin:16px 0 0 0;">
              Best Regards,<br />
              <strong>${companyName}</strong><br />
              <span style="color:#555;">Support & Billing Team</span>
            </p>
          </div>
      
          <!-- Footer -->
          <div style="
            background-color:#f8fafc;
            text-align:center;
            padding:14px;
            font-size:12px;
            color:#777;
          ">
            © 2026 ${companyName}. All rights reserved.
          </div>
      
        </div>
      </div>
      
      </body>
      </html>
      `,
            attachments:[
              {
                  filename:'invoice.pdf',
                  path:invoice
              }
            ]
          });
          
          return res.json({success:true, msg:"email send "})
        }
        else{
            console.log("no email found ")
            res.json({success:false,error:'no company email found '})
        }


    }
    catch(e){
        res.json({success:false, error:e.message})
    }
}

export const getinvoice=async(req,res)=>{
    try{
        const user=await UserModel.findOne({userId:req.userId.Id}).populate('company')
        console.log(user.state, `"${user.state}"`); // check for extra spaces

       
        const invoice= await InvoiceModel.find({state:user.state}).sort({_id:-1})
        console.log(invoice)
        res.json({success:true, invoice})
    }
    catch(e){
      console.log(e)
        res.json({success:false, error:e.message})
    }
}


// get all invoice 
export const allInvoiceState=async(req,res)=>{
  try{
    const state=req.params.state
    console.log(state)
      const invoice=await InvoiceModel.find({state:state}).sort({_id:-1})
      // console.log(invoice)
      res.json({success:true,invoice})
  }
  catch(e){
    res.json({success:false,error:e.message})
  }
}

export const allInvoice=async(req,res)=>{
  try{
    
  
      const invoice=await InvoiceModel.find().sort({_id:-1})
      // console.log(invoice)
      res.json({success:true,invoice})
  }
  catch(e){
    res.json({success:false,error:e.message})
  }
}



//get invoice my company name 
export const invoiceByCompanyName=async(req,res)=>{
  try{
    const companyName=req.params.companyName
    console.log(companyName)
    const invoice =await InvoiceModel.find({companyName:companyName}).sort({_id:-1})
    console.log(invoice)
    res.json({success:true,invoice})
    console.log(invoice)
  }
  catch(e){
res.json({success:true,error:e.message})
  }
}

// delete all invoice 

export const deleteInvoice=async(req,res)=>{
  try{
    const id=req.params.id
    console.log(id)

    const invoice=await InvoiceModel.findByIdAndDelete({_id:id})
    res.json({success:true,msg:"invoice deleted success "})
  }
  catch(e){
    res.json({success:false,error:e.message})
  }
}



export const getDailySales = async (req, res) => {
 try {
  const user=await UserModel.findOne({userId:req.userId.Id})
 const sales = await InvoiceModel.find({state:user.state.trim()}, { totalAmount: 1, date: 1, _id: 0 }).sort({ date: 1 });
  console.log("hii")
  console.log(user.companyName.trim())
    res.json(sales);
  } catch (err) {
    res.status(500).json(err);
  }
};



// -------------------- get all sales data ------------------

export const getAllDailySales = async (req, res) => {
 try {
  
 const sales = await InvoiceModel.find({}, { totalAmount: 1, date: 1, _id: 0 }).sort({ date: 1 });

    res.json(sales);
  } catch (err) {
    res.status(500).json(err);
  }
};



// ---------------------- edit invoice -------------------------

export const EditInvoice=async(req, res)=>{
  try{
    const{id,formData}=req.body

    console.log(formData)
    console.log(id)
    const invoice=await InvoiceModel.findOne({_id:id})

    if(formData.clientName !==''){
      invoice.clientName=formData.clientName
    }
    if(formData.clientEmail !==''){
      invoice.clientEmail=formData.clientEmail
    }
    if(formData.clientPhone !==''){
      invoice.clientPhone=formData.clientPhone
    }
    if(formData.clientAddress !==''){
      invoice.clientAddress=formData.clientAddress
    }
    if(formData.amountReceive !==''){
      invoice.amountReceive=formData.amountReceive
    }

    if(formData.phone !==''){
      invoice.companyPhone=formData.phone
    }
 
    await invoice.save()
    console.log(invoice)
    res.json({success:true, msg:"updated successfully"})
  }
  catch(e){
    console.log(e.message)
    res.json({success:true, error:e.message})
  }
}



export const allUserSales = async (req, res) => {
  try {
    const type = req.params.id; // Day | Week | Month | Quarter | Year

    if (!type) {
      return res.status(400).json({ message: "Type is required" });
    }

    let groupId;

    switch (type) {

      case "Day":
        groupId = {
          $dateToString: { format: "%Y-%m-%d", date: "$date" }
        };
        break;

      case "Week":
        groupId = {
          year: { $isoWeekYear: "$date" },
          week: { $isoWeek: "$date" }
        };
        break;

      case "Month":
        groupId = {
          year: { $year: "$date" },
          month: { $month: "$date" }
        };
        break;

      case "quarter":
        groupId = {
          year: { $year: "$date" },
          quarter: { $ceil: { $divide: [{ $month: "$date" }, 3] } }
        };
        break;

      case "Year":
        groupId = {
          year: { $year: "$date" }
        };
        break;

      default:
        return res.status(400).json({ message: "Invalid type" });
    }

    const data = await InvoiceModel.aggregate([
      {
        $group: {
          _id: groupId,
          totalSales: { $sum: "$amountReceive" }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    res.json({ type, data });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};




export const companySales=async(req,res)=>{
  try{
    const data = await InvoiceModel.aggregate([
  {
    $group: {
      _id: "$companyName",
      totalSales: { $sum: "$amountReceive" }
    }
  },
  {
    $group: {
      _id: null,
      companies: { $push: { company: "$_id", totalSales: "$totalSales" } },
      totalSalesOverall: { $sum: "$totalSales" }
    }
  },
  {
    $unwind: "$companies"
  },
  {
    $project: {
      _id: 0,
      companyName: "$companies.company",
      totalSales: "$companies.totalSales",
      percentage: { $multiply: [{ $divide: ["$companies.totalSales", "$totalSalesOverall"] }, 100] }
    }
  }
]);

res.json({
  success:true,
  data
})


  }
  catch(e){
    res.json({success:true,error:e.message })
  }
}