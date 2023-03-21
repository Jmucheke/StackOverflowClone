import { Router } from "express";
import { addVote } from './../controllers/votes.controller';
import { VerifyToken } from "../middlewares/auth.middleware";

const voteRoutes = Router()

voteRoutes.post('/',VerifyToken, addVote)


export default voteRoutes