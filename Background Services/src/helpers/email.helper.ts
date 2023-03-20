import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
// import { CreateLog } from "./logger.util";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

let config = {
host: "smtp.gmail.com",
service: "gmail",
port: 587,
auth: {
user: process.env.SMTP_USER_EMAIL,
pass: process.env.GMAIL_PASSWORD,
},
};

function createTransporter(config: any) {
return nodemailer.createTransport(config);
}

export const sendEmail = async(messageOptions:any)=>{
let transporter =createTransporter(config)
await transporter.verify()
await transporter.sendMail(messageOptions, (err, info)=>{
console.log(info);

})
}