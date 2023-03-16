import { RequestHandler, Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import { LoginSchema, RegistrationSchema } from '../helpers/user.helper'
import { DecodedData, User } from '../models/user.model'
import Bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import { DatabaseHelper } from '../databaseHelpers'

const _db = new DatabaseHelper()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request {
 body: { Name: string, Email: string, Password: string, ConfirmPassword: string }
 info?: DecodedData
}

// Register user
export async function RegisterUser(req: ExtendedRequest, res: Response) {
 try {
  const id = uid()
  const { Name, Email, Password } = req.body
  const { error } = RegistrationSchema.validate(req.body)
  if (error) {
   return res.status(422).json(error.details[0].message)
  }
  const hashedPassword = await Bcrypt.hash(Password, 10)
  ///check if email exist
  await _db.exec('uspRegisterUser', { id, name: Name, email: Email, password: hashedPassword })
  return res.status(201).json({ message: 'User registered' })

 }
 catch (error) {
  res.status(500).json(error)
 }
}


// Login User

export const loginUser = async(req: ExtendedRequest, res: Response)=> {
 try {
  const { Email, Password } = req.body
  const { error } = LoginSchema.validate(req.body)
  if (error) {
   return res.status(422).json(error.details[0].message)
  }

  const user = await (await _db.exec('uspGetUserByEmail', { email: Email })).recordset
  
  if (!user[0]) {
   return res.status(404).json('User Not found')
  }
  console.log(user);
  const valid = await Bcrypt.compare(Password, user[0].password)
  if (!valid) {  
   
   return res.status(404).json('User Not found')
  }

  const payload = user.map(item => {
   const { Password, ...rest } = item
   return rest
  })
  const token = jwt.sign(payload[0], process.env.SECRETKEY as string, { expiresIn: '3600s' })
  console.log(token);
  
  return res.status(200).json({message: `${user[0].name} Loggedin!!!`, token })

 } catch (error) {
  console.log(error)
  res.status(500).json(error)
 }
}


export async function Homepage(req: ExtendedRequest, res: Response) {
 try {
  if (req.info) {
   return res.status(200).json(`Welcome ${req.info.Name}`)
  }
 } catch (error) {

 }
}