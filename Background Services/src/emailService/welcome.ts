import ejs from 'ejs'
import { sendEmail } from '../helpers/email.helper';
import mssql from 'mssql'
import { sqlConfig } from '../config';
import { User } from '../interface/user.interface';



const sendWelcomeEmail = async () => {
 const pool = await mssql.connect(sqlConfig)
 const users: User[] = await (await pool.request().
  query("SELECT * FROM users WHERE isSent ='0'")).recordset

 for (let user of users) {
  ejs.renderFile('template/welcome.ejs', { name: user.name }, async (error, html) => {
   const message = {
    from: process.env.SMTP_USER_EMAIL,
    to: user.email,
    subject: "Welcome to Stackoverflow",
    html
   };



   try {
    await sendEmail(message)
    await pool.request().query(`UPDATE users SET isSent ='1' WHERE id  ='${user.id}'`)
   } catch (error) {
    console.log(error);

   }
  })
 }
}

export default sendWelcomeEmail