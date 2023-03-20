import { Router } from "express";
import { addComment, getCommentById, updateComment, deleteComment, getAllComments } from "../controllers/comments.controller";
import { VerifyToken } from "../middlewares/auth.middleware";

const commentsRoutes = Router()

commentsRoutes.post('/', addComment)
commentsRoutes.get('/:id', getCommentById)
commentsRoutes.get('/', getAllComments)
commentsRoutes.delete('/:id', deleteComment)
commentsRoutes.patch('/:id', updateComment)


export default commentsRoutes