import { Router } from "express";
import { Homepage, loginUser, RegisterUser } from "../controllers/user.controller";
import { VerifyToken } from "../middlewares/auth.middleware";



const authrouter = Router()

authrouter.post('/register', RegisterUser)
authrouter.post('/login', loginUser)
authrouter.get('/home', VerifyToken, Homepage)//protected Route

export default authrouter