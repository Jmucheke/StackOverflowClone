import { Router } from "express";
import { addComment, getCommentById, updateComment, deleteComment, getAllComments } from "../controllers/comments.controller";
import { VerifyToken } from "../middlewares/auth.middleware";

const commentsRoutes = Router()

commentsRoutes.post('/', VerifyToken, addComment)
commentsRoutes.get('/:id', VerifyToken, getCommentById)
commentsRoutes.get('/', VerifyToken, getAllComments)
commentsRoutes.delete('/:id', VerifyToken, deleteComment)
commentsRoutes.patch('/:id', VerifyToken, updateComment)


export default commentsRoutes