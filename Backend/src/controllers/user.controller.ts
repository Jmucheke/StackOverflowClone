import { UpdateSchema } from './../helpers/user.helper';
import { RequestHandler, Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import { LoginSchema, RegistrationSchema } from '../helpers/user.helper'
import { DecodedData, User } from '../models/index'
import Bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import { DatabaseHelper } from '../databaseHelpers'

const _db = new DatabaseHelper()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request {
 body: { name: string, email: string, password: string, confirmPassword: string },
 params:{id:string}
 info?: DecodedData
}

// Register user
export async function RegisterUser(req: ExtendedRequest, res: Response) {
 try {
  const id = uid()
  const { name, email, password } = req.body
  const { error } = RegistrationSchema.validate(req.body)
  if (error) {
   return res.status(422).json(error.details[0].message)
  }
  const hashedPassword = await Bcrypt.hash(password, 10)
  ///check if email exist
  await _db.exec('uspRegisterUser', { id, name: name, email: email, password: hashedPassword })
  return res.status(201).json({ message: 'User registered' })

 }
 catch (error:any) {
  res.status(500).json(error.message)
 }
}


// Login User

export const loginUser = async(req: ExtendedRequest, res: Response)=> {
 try {
  const { email, password } = req.body
  const { error } = LoginSchema.validate(req.body)
  if (error) {
   return res.status(422).json(error.details[0].message)
  }

  const user = await (await _db.exec('uspGetUserByEmail', { email: email })).recordset
  
  if (!user[0]) {
   return res.status(404).json('User Not found')
  }

  const valid = await Bcrypt.compare(password, user[0].password)
  if (!valid) {  
   
   return res.status(404).json('User Not found')
  }

  const payload = user.map(item => {
   const { Password, ...rest } = item
   return rest
  })
  const token = jwt.sign(payload[0], process.env.SECRETKEY as string, { expiresIn: '3600s' })
  console.log(token);
  
   return res.status(200).json({ name: `${user[0].name}`, email: `${user[0].email}`, token, expiresIn: '3600' })

 } catch (error) {
  console.log(error)
  res.status(500).json(error)
 }
}

// Get user profile

export const getUserProfile = async (req: ExtendedRequest, res: Response) => {

 try {
   const userId = req.info!.id
   const user = await _db.exec("uspGetUserById", {id:userId});

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
  const id = req.info!.id
  const user = await _db.exec("uspGetUserById", { id: id });

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

 

 try {
   const id = req.params.id
   const { name, email, password } = req.body;
   const { error } = UpdateSchema.validate(req.body)
   
   
   if (error) {
     return res.status(422).json(error.details[0].message)
   }
   const otherUser = await _db.exec("uspGetUserByEmail", { email });
   

  // check if otherUser is not the current user
  if (otherUser.recordset.length > 0) {
   if (otherUser.recordset[0].id !== id) {
    return res.status(400).json({
     message:
      "Another user with a similar email already exists, please try another email",
    });
   }
  }

  const user = await _db.exec("uspGetUserById", { id});
  //  const { Name, Email, Password } = req.body;
  
  

  if (user.recordset.length > 0) {
    
   const hashedPassword = await Bcrypt.hash(password, 10);

   const updatedUser = await _db.exec("uspUpdateUser", {
    id: id,
    name,
    email,
    password: hashedPassword,
   });

   if (updatedUser.recordset.length > 0) {
    const { id, name, email, isAdmin } = updatedUser.recordset[0];

    return res.status(200).json({ id, name, email, isAdmin });
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

// Delete user
export const deleteUser = async (req: ExtendedRequest, res: Response) => {

  const id = req.params.id;
  try {
    const Question = await (
      await _db.exec('uspGetUserById', { id })
    ).recordset[0]
    if (Question) {
      await _db.exec('uspDeleteUser', { id })
      return res.status(200).json({ message: 'Deleted successfully' })
    }
    return res.status(404).json({ error: 'User Not Found' })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

// Get all users

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await _db.exec("uspGetAllUsers");

    // returns the users else if ther's none yet an empty array is returned
    return res.status(200).json(users.recordset);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// // Forgot password

// export const forgotPassword = async (req: Request, res: Response) => {
//   const { error } = UserForgotPasswordDto.validate(req.body);

//   if (error) {
//     return res.status(422).json(error.details[0].message);
//   }

//   const userEmail = req.body.email;

//   try {
//     const user = await dbUtils.exec("usp_FindUserByEmail", {
//       email: userEmail,
//     });

//     if (user.recordset.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "User with provided email does not exist" });
//     }

//     const { id, name, email, isAdmin } = user.recordset[0];

//     const JWT = generateJWT({ id, name, email, isAdmin } as IJWTPayload, "1h");

//     const resetUrl = `${process.env.CLIENT_URL}/reset-password/?resetToken=${JWT}`;

//     const passwordResetMsg = `
//       <h1>You requested a password reset</h1>
//       <p>Please go to this link to reset your password</p>
//       <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
//       <p>If you did not request this, please ignore this email</p>
//     `;

//     try {
//       await sendEmail("Password Reset Request", email, passwordResetMsg);

//       return res.status(200).json({
//         message: "We have sent a link to reset your password to your email",
//         resetUrl,
//       });
//     } catch (error: any) {
//       CreateLog.error(error);
//       return res.status(500).json({ message: "Email could not be sent" });
//     }
//   } catch (error: any) {
//     res.status(500).json(error.message);
//     CreateLog.error(error);
//   }
// };


//   //  Reset password

// export const resetPassword = async (req: IRequestWithUser, res: Response) => {
//   const { error } = UserPasswordResetDto.validate(req.body);

//   if (error) {
//     return res.status(422).json(error.details[0].message);
//   }

//   const password = req.body.password as string;

//   try {
//     const { id, name, email, isAdmin } = req.user as IUser;

//     const passwordHash = await Bcrypt.hash(password, 10);

//     const updatedUser = await dbUtils.exec("usp_UpdateUser", {
//       id,
//       name,
//       email,
//       password: passwordHash,
//       isAdmin,
//     });

//     if (updatedUser.recordset.length > 0) {
//       const { id, name, email, isAdmin } = updatedUser.recordset[0];

//       //password reset was successful email
//       const subject = "Password Reset Successful";
//       const html = `<h1>Password Reset Successful</h1>
//       <p>Dear ${name},</p>
//       <p>Your password has been reset successfully.</p>
//       <P>Happy <a href=${process.env.CLIENT_URL}>Shopping</a> 🎉</P>
//       <p>If you did not request this, please contact us immediately.</p>
//       <p>Regards,<br/>GadgetHub Team</p>`;

//       sendEmail(subject, email, html);

//       const JWT = generateJWT(
//         {
//           id,
//           name,
//           email,
//           isAdmin,
//         } as IJWTPayload,
//         "1d"
//       );

//       return res.status(200).json({ id, name, email, isAdmin, JWT });
//     } else {
//       return res.status(400).json({
//         message: "Password reset failed, please request a new password reset",
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json(error.message);
//     CreateLog.error(error);
//   }
// };