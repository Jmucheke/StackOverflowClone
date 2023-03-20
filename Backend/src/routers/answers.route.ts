import { Router } from "express";
import { addAnswer, getAnswerById, updateAnswer, deleteAnswer, getAllAnswers } from "../controllers/answers.controller";
import { VerifyToken } from "../middlewares/auth.middleware";

const answerRoutes = Router()

answerRoutes.post('/', addAnswer)
answerRoutes.get('/:id', getAnswerById)
answerRoutes.get('/', getAllAnswers)
answerRoutes.delete('/:id', deleteAnswer)
answerRoutes.patch('/:id', updateAnswer)


export default answerRoutes