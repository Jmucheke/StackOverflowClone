import { voteSchema, updateVoteSchema } from './../helpers/votes.helpers';
import { RequestHandler, Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import Joi from 'joi'
import { DatabaseHelper } from '../databaseHelpers'
import { DecodedData } from '../models/index'



const _db = new DatabaseHelper()
interface ExtendedRequest extends Request {
 body: {
  id: number,
  votes: BinaryType, userId: string, questionId: string
 },
 info?: DecodedData
}

// Add vote
export const addVote = async (req: ExtendedRequest, res: Response) => {
 try {
  const { votes, questionId } = req.body

  const { error } = voteSchema.validate(req.body)

  if (error) {
   return res.status(422).json(error.details[0].message)
  }
  if (req.info) {
  await _db.exec('uspAddVote',
   { votes, userId: req.info!.id, questionId })

  return res.status(201).json({ message: 'Vote Added Successfully' })
 }}
 catch (error) {
  return res.status(500).json(error)
 }
}