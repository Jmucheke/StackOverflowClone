import express, { json } from 'express'
import authrouter from './routers/user.route'
import cors from 'cors'
import questionRoutes from './routers/questions.route'
import answerRoutes from './routers/answers.route'
import commentsRoutes from './routers/comments.route'
import voteRoutes from './routers/votes.route'
const app = express()

//Register some Middlewares
app.use(cors())
app.use(json()) //adds a body to the Request


app.use('/users', authrouter)
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);
app.use("/comments", commentsRoutes);
app.use("/votes", voteRoutes);


app.listen(4000, () => {
 console.log("Running ...");
})