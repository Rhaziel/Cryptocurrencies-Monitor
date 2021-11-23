import express from 'express'
import {createUserAction, getUserAction, authUserAction,addCryptocurrencyToUserAction} from "../controllers/userController";
const userRoutes = express.Router();

userRoutes.post('/user', (req, res) => {
    return createUserAction(req, res)
})

userRoutes.get('/user', (req, res) => {
    return getUserAction(req,res)
})

userRoutes.post('/login', (req, res) => {
    return authUserAction(req,res)
})

userRoutes.post('/cryptocurrencies', (req, res) => {
    return addCryptocurrencyToUserAction(req, res)
})

export default userRoutes