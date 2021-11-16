import express from 'express'
import {getCurrenciesAction} from "../controllers/cryptocurrencyController"
const currencyRoutes = express.Router();

currencyRoutes.get("/coins", (req, res) => {
    return getCurrenciesAction(req,res)
})

export default currencyRoutes

