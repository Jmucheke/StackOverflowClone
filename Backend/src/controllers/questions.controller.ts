import { Question } from './../models/questions.model';
import { RequestHandler, Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import Joi from 'joi'
import { DatabaseHelper } from '../databaseHelpers'
import { DecodedData } from '../models/questions.model'
import { User } from '../models/user.model'

const _db = new DatabaseHelper()
interface ExtendedRequest extends Request {
 body: {
  title: string,description: string, code: string, userId: string },
 params: { id: string },
 info?: DecodedData
 user?:User
}

// Add Question
export const addBooking = async (req: ExtendedRequest, res: Response) => {
 try {
  const id = uid()
  const { Id: userId } = req.user as User 
  const { title, description, code } = req.body

  if (req.info) {
   _db.exec('uspAddQuestion',
    { id, title, description, code,userId })

   return res.status(201).json({ message: 'Question Added Successfully' })
  }
 }
 catch (error: any) {
  return res.status(500).json(error.message)
 }
}

// Get one question
export const getQuestionById = async (req: ExtendedRequest, res: Response) => {
 const id  = req.params.id;
 // const { Id: userId } = req.user as User;

 try {
  const order = await _db.exec("uspGetQuestionById", { id });

  if (order.recordset.length > 0) {
   return res.status(200).json(order.recordset[0]);
  } else {
   return res.status(404).json({ message: "Order not found" });
  }
 } catch (error: any) {
  return res.status(500).json({ message: error.message });
 }
};

// Update Question
export const updateOrder = async (req: Request, res: Response) => {
 // const { error } = UpdateOrderDTO.validate(req.body);
 // if (error) {
 //   return res.status(422).json({ message: error.details[0].message });
 // }

 const  id  = req.params.id;
 const { title, description, code } = req.body;

 try {
  const Question = await _db.exec("uspGetQuestionById", { id });

 if ( Question.recordset.length > 0) {
   const updatedQuestion = await _db.exec("uspUpdateQuestion", {
    id,
    title, 
    description,
    code
   });
   return res.status(200).json({
    message: "Order updated successfully",
    updatedQuestion: updatedQuestion.recordset[0],
   });
  } else {
   return res.status(404).json({ message: "Order not found" });
  }
 } catch (error: any) {
  // CreateLog.error(error);
  return res.status(500).json({ message: error.message });
 }
};

// Delete Question
export const cancelBooking = async (req: ExtendedRequest, res: Response) => {

 const id = req.params.id;
 const { title, description, code } = req.body;
 try {
  const Question = await (
   await _db.exec('uspGetQuestionById', { id })
  ).recordset[0]
  if (Question) {
   await _db.exec('uspDeleteQuestion', { id })
   return res.status(200).json({ message: 'Deleted successfully' })
  }
  return res.status(404).json({ error: 'Question Not Found' })
 } catch (error: any) {
  res.status(500).json(error.message)
 }
}

