import express from "express"
import { login, register } from "../Controller/userController.js"

const authRouter  = express.Router()

authRouter.route("/register").post(register)
authRouter.route('/login').post(login)


export default authRouter