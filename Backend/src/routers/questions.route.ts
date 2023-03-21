import { Router } from "express";
import { addQuestion, getQuestionById, updateQuestion, deleteQuestion, getAllQuestions, getQuestionsByTagName, getAllQuestionsWithPagination } from "../controllers/questions.controller";
import { VerifyToken } from "../middlewares/auth.middleware";

const questionRoutes = Router()

questionRoutes.post('/askQuestion',VerifyToken, addQuestion)
questionRoutes.get('/getQuestionById/:id',VerifyToken, getQuestionById)
questionRoutes.get('/getQuestionByTag/:tagName',VerifyToken, getQuestionsByTagName)
// questionRoutes.get('/allQuestions',VerifyToken, getAllQuestions)
questionRoutes.get('/allQuestions', VerifyToken, getAllQuestionsWithPagination)
questionRoutes.delete('/deleteQuestion/:id',VerifyToken, deleteQuestion)
questionRoutes.patch('/updateQuestion/:id',VerifyToken, updateQuestion)


export default questionRoutes