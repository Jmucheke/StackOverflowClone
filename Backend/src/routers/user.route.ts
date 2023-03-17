import { Router } from "express";
import { loginUser, RegisterUser, getUserProfile, getUserById, updateUserProfile } from "../controllers/user.controller";
import { VerifyToken } from "../middlewares/auth.middleware";



const authrouter = Router()

authrouter.post('/register', RegisterUser)
authrouter.post('/login', loginUser)
authrouter.get('/profile', getUserProfile)
authrouter.get('/user/:id', getUserById)
authrouter.patch('/update/:id', updateUserProfile)
// authrouter.get('/home', Homepage)//protected Route


export default authrouter