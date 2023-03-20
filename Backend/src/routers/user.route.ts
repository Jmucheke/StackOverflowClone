import { Router } from "express";
import { loginUser, RegisterUser, getUserProfile, getUserById, updateUserProfile, getAllUsers } from "../controllers/user.controller";
import { VerifyToken } from "../middlewares/auth.middleware";



const authrouter = Router()

authrouter.post('/register', RegisterUser)
authrouter.post('/login', loginUser)
authrouter.get('/profile', getUserProfile)
authrouter.get('/:id', getUserById)
authrouter.patch('/:id', updateUserProfile)
authrouter.get('/', getAllUsers)
// authrouter.get('/home', Homepage)//protected Route


export default authrouter