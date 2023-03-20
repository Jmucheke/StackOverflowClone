import { Router } from "express";
import { addQuestion, getQuestionById, updateQuestion, deleteQuestion, getAllQuestions, getQuestionsByTagName } from "../controllers/questions.controller";
import { VerifyToken } from "../middlewares/auth.middleware";

const questionRoutes = Router()

questionRoutes.post('/', addQuestion)
questionRoutes.get('/:id', getQuestionById)
questionRoutes.get('/tag/:tagName', getQuestionsByTagName)
questionRoutes.get('/', getAllQuestions)
questionRoutes.delete('/:id', deleteQuestion)
questionRoutes.patch('/:id', updateQuestion)


export default questionRoutes