import express, { json } from 'express'
import authrouter from './routers/user.route'
import cors from 'cors'
const app = express()

//Register some Middlewares
app.use(cors())
app.use(json()) //adds a body to the Request


app.use('/auth', authrouter)


app.listen(4000, () => {
 console.log("Running ...");
})