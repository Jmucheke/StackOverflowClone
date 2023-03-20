import { commentSchema, updateCommentSchema } from './../helpers/comments.helper';
import { Request, Response } from 'express'
import { DatabaseHelper } from '../databaseHelpers'
import { DecodedData } from '../models/answers.model'

const _db = new DatabaseHelper()
interface ExtendedRequest extends Request {
 body: {
  id: number,
  comment: string, userId: string, answerId: string
 },
 // params: { id: number },
 info?: DecodedData
}

// Add Comment
export const addComment = async (req: ExtendedRequest, res: Response) => {
 try {
  // const { Id: userId } = req.user as User 
  const { comment, userId, answerId } = req.body

  const { error } = commentSchema.validate(req.body)

  if (error) {
   return res.status(422).json(error.details[0].message)
  }
  await _db.exec('uspAddComment',
   { comment, userId, answerId })

  return res.status(201).json({ message: 'Comment Added Successfully' })
 }
 catch (error) {
  return res.status(500).json(error)
 }
}

// Get one Comment
export const getCommentById = async (req: ExtendedRequest, res: Response) => {
 const { id } = req.params;
 // const { Id: userId } = req.user as User;

 try {
  const comment = await _db.exec("uspGetCommentById", { id });

  if (comment.recordset.length > 0) {
   return res.status(200).json(comment.recordset[0]);
  } else {
   return res.status(404).json({ message: "Comment not found" });
  }
 } catch (error: any) {
  return res.status(500).json({ message: error.message });
 }
};

// Update Comment
export const updateComment = async (req: Request, res: Response) => {

 const { id } = req.params;
 const { comment } = req.body;
 const { error } = updateCommentSchema.validate(req.body)

 try {


  if (error) {
   return res.status(422).json(error.details[0].message)
  }

  const Comment = await _db.exec("uspGetCommentById", { id });

  if (Comment.recordset.length > 0) {
   const updatedComment = await _db.exec("uspUpdateComment", {
    id,
    comment
   });
   return res.status(200).json({
    message: "Comment updated successfully"
    // updatedComment: updatedComment.recordset[0],
   });
  } else {
   return res.status(404).json({ message: "Comment not found" });
  }
 } catch (error) {
  // CreateLog.error(error);
  return res.status(500).json({ message: error });
 }
};

// Delete Comment
export const deleteComment = async (req: ExtendedRequest, res: Response) => {

 const { id } = req.params;
 // const { comment } = req.body;
 try {
  const Comment = await (
   await _db.exec('uspGetCommentById', { id })
  ).recordset[0]
  if (Comment) {
   await _db.exec('uspDeleteComment', { id })
   return res.status(200).json({ message: 'Deleted successfully' })
  }
  return res.status(404).json({ error: 'Comment Not Found' })
 } catch (error) {
  res.status(500).json({message:error})
 }
}

// Get all Comments

export const getAllComments = async (req: Request, res: Response) => {
 try {
  const users = await _db.exec("uspGetAllComments");

  // returns the users else if ther's none yet an empty array is returned
  return res.status(200).json(users.recordset);
 } catch (error) {
  res.status(500).json({error});
 }
};
