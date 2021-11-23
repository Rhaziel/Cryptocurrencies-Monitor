import {getCurrencies} from "../services/cryptocurrencyService"

export const getCurrenciesAction = async (req,res) => {

    try{

        if(!req.user)
            return res.status(400).send("bad autorization!")

        const userID = req.user.userId
        const {coinsPerPage, pageCoin, order} = req.query

        if (isNaN(pageCoin))
            return res.status(400).json({ message: "page must be integer!" });
        if (isNaN(coinsPerPage))
            return res.status(400).json({ message: "itemsPerPage must be integer!" });
        if (coinsPerPage < 1 || coinsPerPage > 250)
            return res.status(400).json({ message: "itemsPerPage must be a number between 1 and 250" });

        let response = await getCurrencies(userID,coinsPerPage,pageCoin,order)

        res.status(200).json(response)

    }catch (error){
        res.status(500).send("server error"+error)
    }

}