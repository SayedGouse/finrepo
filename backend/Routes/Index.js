import expressRouter from "express"
import authRouter from "./userRouter.js"



const router = expressRouter()

router.use('/user', authRouter)

export default router
