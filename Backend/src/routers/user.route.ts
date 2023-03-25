import { Router } from "express";
import { loginUser, RegisterUser, getUserProfile, getUserById, updateUserProfile, getAllUsers,deleteUser } from "../controllers/user.controller";
import { authorizeAdmin, VerifyToken } from "../middlewares/auth.middleware";



const authrouter = Router()

authrouter.post('/register', RegisterUser)
authrouter.post('/login', loginUser)
authrouter.get('/profile',VerifyToken, getUserProfile)
authrouter.delete('/:id', VerifyToken, authorizeAdmin, deleteUser)
authrouter.get('/:id',VerifyToken, getUserById)
authrouter.patch('/:id',VerifyToken, updateUserProfile)
authrouter.get('/', VerifyToken, authorizeAdmin, getAllUsers)
// authrouter.get('/home', Homepage)//protected Route


export default authrouter