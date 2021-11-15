import express from 'express'
import {getCurrenciesAction} from "../controllers/cryptocurrencyController"
const currencyRoutes = express.Router();

currencyRoutes.get("/", (req, res) => {
    return getCurrenciesAction(req,res)
})

export default currencyRoutes

