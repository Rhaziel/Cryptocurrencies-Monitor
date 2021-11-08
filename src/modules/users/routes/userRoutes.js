import express from 'express'
import {createUserAction, getUserAction} from "../controllers/userController";
const userRoutes = express.Router();

userRoutes.post('/user', (req, res) => {
    return createUserAction(req, res)
})

userRoutes.get('/user', (req, res) => {
    return getUserAction(req,res)
})

export default userRoutes