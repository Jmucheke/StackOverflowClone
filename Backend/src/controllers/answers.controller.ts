import { answerSchema, updateAnswerSchema } from './../helpers/answers.helper';
import { RequestHandler, Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import Joi from 'joi'
import { DatabaseHelper } from '../databaseHelpers'
import { DecodedData } from '../models/index'

const _db = new DatabaseHelper()
interface ExtendedRequest extends Request {
 body: {
  description: string, code: string, userId: string, questionId:string
 },
 info?: DecodedData
}

// Add Answer
export const addAnswer = async (req: ExtendedRequest, res: Response) => {
 try {
  // const { Id: userId } = req.user as User 
  const { description, code,  questionId} = req.body

  const { error } = await answerSchema.validateAsync(req.body)

  if (error) {
   return res.status(422).json(error.details[0].message)
  }
  if(req.info){   
  await _db.exec('uspAddAnswer',
   { description, code, userId:req.info!.id, questionId })

  return res.status(201).json({ message: 'Answer Added Successfully'})
  }
 }
 catch (error) {
  return res.status(500).json(error)
 }
}

// Get one Answer
export const getAnswerById = async (req: ExtendedRequest, res: Response) => {
 const {id} = req.params;
 // const { Id: userId } = req.user as User;

 try {
  const answer = await _db.exec("uspGetAnswerById", { id });

  if (answer.recordset.length > 0) {
   return res.status(200).json(answer.recordset[0]);
  } else {
   return res.status(404).json({ message: "Answer not found" });
  }
 } catch (error: any) {
  return res.status(500).json({ message: error.message });
 }
};

// Update Answer
export const updateAnswer = async (req: Request, res: Response) => {

 const { id } = req.params;
 const { description,code} = req.body;
 const { error } = updateAnswerSchema.validate(req.body)

 try {


  if (error) {
   return res.status(422).json(error.details[0].message)
  }

  const Answer = await _db.exec("uspGetAnswerById", { id });

  if (Answer.recordset.length > 0) {
   const updatedAnswer = await _db.exec("uspUpdateAnswer", {
    id,
    description,
    code
   });
   return res.status(200).json({
    message: "Answer updated successfully"
    // updatedAnswer: updatedAnswer.recordset[0],
   });
  } else {
   return res.status(404).json({ message: "Answer not found" });
  }
 } catch (error: any) {
  // CreateLog.error(error);
  return res.status(500).json({ message: error.message });
 }
};

// Delete Answer
export const deleteAnswer = async (req: ExtendedRequest, res: Response) => {

 const { id } = req.params;
 const { description } = req.body;
 try {
  const Answer = await (
   await _db.exec('uspGetAnswerById', { id })
  ).recordset[0]
  if (Answer) {
   await _db.exec('uspDeleteAnswer', { id })
   return res.status(200).json({ message: 'Deleted successfully' })
  }
  return res.status(404).json({ error: 'Answer Not Found' })
 } catch (error: any) {
  res.status(500).json(error.message)
 }
}

// Get all Answers

export const getAllAnswers = async (req: Request, res: Response) => {
 try {
  const users = await _db.exec("uspGetAllAnswers");

  // returns the users else if ther's none yet an empty array is returned
  return res.status(200).json(users.recordset);
 } catch (error: any) {
  res.status(500).json(error.message);
 }
};
