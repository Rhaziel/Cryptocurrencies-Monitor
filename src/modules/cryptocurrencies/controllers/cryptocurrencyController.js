import {getCurrencies} from "../services/cryptocurrencyService"

export const getCurrenciesAction = async (req,res) => {

    try{

        if(!req.user)
            return res.status(400).send("bad autorization!")

        let response = await getCurrencies(req.user)

        res.status(200).json(response)

    }catch (error){
        res.status(500).send("server error"+error)
    }

}