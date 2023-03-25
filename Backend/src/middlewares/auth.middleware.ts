import { DecodedData } from './../models/index';
import { RequestHandler, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request {
 info?: DecodedData
}

export function VerifyToken(req: ExtendedRequest, res: Response, next: NextFunction) {
 const token = req.headers['token'] as string
 try {

  if (!token) {
   return res.status(401).json({ error: 'Forbidden' })
  }
  const Payloadata = jwt.verify(token, process.env.SECRETKEY as string) as DecodedData
  req.info = Payloadata
 }
 catch (error: any) {
  res.status(403).json(error.message)
 }
 next() 
}

// Check if user is an admin
export const authorizeAdmin = (
 req: ExtendedRequest,
 res: Response,
 next: NextFunction
): any => {
 if (req.info && req.info.isAdmin) {
  next();
 } else {
  return res
   .status(403)
   .json({ message: "Forbidden, not authorized to perform action" });
 }
};