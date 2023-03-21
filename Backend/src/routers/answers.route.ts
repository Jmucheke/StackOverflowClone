import { Router } from "express";
import { addAnswer, getAnswerById, updateAnswer, deleteAnswer, getAllAnswers } from "../controllers/answers.controller";
import { VerifyToken } from "../middlewares/auth.middleware";

const answerRoutes = Router()

answerRoutes.post('/',VerifyToken, addAnswer)
answerRoutes.get('/:id', VerifyToken, getAnswerById)
answerRoutes.get('/', VerifyToken, getAllAnswers)
answerRoutes.delete('/:id',VerifyToken, deleteAnswer)
answerRoutes.patch('/:id', VerifyToken, updateAnswer)


export default answerRoutes