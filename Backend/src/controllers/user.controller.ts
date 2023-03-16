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
 body: { id:string, Name: string, Email: string, Password: string, ConfirmPassword: string },
 params:{id:string}
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

// Get user profile

export const getUserProfile = async (req: ExtendedRequest, res: Response) => {

 try {
  const userId = req.params.id
  const user = await _db.exec("uspGetUserProfile", {id:userId});

  if (user.recordset.length > 0) {
   const { id, name, email, isAdmin } = user.recordset[0];

   return res.status(200).json({ id, name, email, isAdmin });
  } else {
   return res.status(404).json({ message: "User not found" });
  }
 } catch (error: any) {
  res.status(500).json(error.message);
 }
};

// get User by ID
export const getUserById = async (req: ExtendedRequest, res: Response) => {

 try {
  const userId = req.params.id
  const user = await _db.exec("uspGetUserById", { id: userId });

  if (user.recordset.length > 0) {
   const { id, name, email, isAdmin } = user.recordset[0];

   return res.status(200).json({ id, name, email, isAdmin });
  } else {
   return res.status(404).json({ message: "User not found" });
  }
 } catch (error: any) {
  res.status(500).json(error.message);
 }
};

// Update User

export const updateUserProfile = async (
 req: ExtendedRequest,
 res: Response
) => {

 const userId = req.params.id
 const { Name, Email, Password } = req.body;

 try {
  // If user tries to update email that already exists in the database
  // i.e another user exists with the same email that's not the current user
  const otherUser = await _db.exec("uspGetUserByEmail", { Email });

  // check if otherUser is not the current user
  if (otherUser.recordset.length > 0) {
   if (otherUser.recordset[0].id !== userId) {
    return res.status(400).json({
     message:
      "Another user with a similar email already exists, please try another email",
    });
   }
  }

  const user = await _db.exec("uspGetUserById", { id: userId });

  if (user.recordset.length > 0) {
   const passwordHash = await Bcrypt.hash(Password, 10);

   const updatedUser = await _db.exec("uspUpdateUser", {
    id: userId,
    Name,
    Email,
    Password: passwordHash,
   });

   if (updatedUser.recordset.length > 0) {
    const { id, Name, Email, isAdmin } = updatedUser.recordset[0];

    return res.status(200).json({ id, Name, Email, isAdmin });
   } else {
    return res.status(400).json({ message: "User profile update failed" });
   }
  } else {
   return res.status(404).json({ message: "User not found" });
  }
 } catch (error: any) {
  res.status(500).json(error.message);
 }
};

// Homepage

// export async function Homepage(req: ExtendedRequest, res: Response) {
//  try {
//   if (req.info) {
//    return res.status(200).json(`Welcome ${req.info.Name}`)
//   }
//  } catch (error) {

//  }
// }