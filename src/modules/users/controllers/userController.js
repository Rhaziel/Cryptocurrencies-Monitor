import {createUser, getUser,authUser,addNewCryptocurrencyToUser} from "../services/userService";
import {isCurrencyValid, isOk} from "../../config/functions";

export const createUserAction = async (req, res) => {

    try {

        const {name, lastName, userName, password, currencyPreference} = req.body

        if (!name || !lastName || !userName || !password || !currencyPreference)
            return res.status(400).send("name, lastname, username, password and currencypreference parameters is required!")

        if (isOk(password) === false){
            return res.status(404).send("password invalid!")
        }

        if (isCurrencyValid(currencyPreference) === false){
            return res.status(400).send("currency prefer invalid!")
        }

        let response = await createUser({name, lastName, userName, password, currencyPreference})

        if(!response)
            return res.status(200).send("username is already use!")

        return res.status(201).json(response)

    }catch (error){
        return res.status(500).send("Server error"+error)
    }

}

export const getUserAction = async (req,res) => {
    try{

        let response = await getUser(req.param.userId)

        if(!response)
            res.status(404).send("content not found!")

        res.status(200).json(response)

    }catch (error){

        res.status(500).send("server error"+error)

    }
}

export  const authUserAction = async(req,res) =>{

    try{

        const {userName, password} = req.body

        if (!userName || !password)
            return res.status(400).send("username and password parameters is required!")

        let response = await authUser(userName,password)

        if(!response)
            res.status(404).send("content not found!")

        res.status(200).json(response)

    }catch (error){
        res.status(500).send("server error"+error)
    }

}

export const addCryptocurrencyToUserAction = async(req, res) => {

    try {

        if (!req.user)
            return res.status(400).send("bad autorization!")

        const userID = req.user.userId
        const {Coin} = req.query

        if (!Coin)
            return res.status(400).send("Coin is required!")

        const response = await addNewCryptocurrencyToUser(userID, Coin)

        if (!response)
            return res.status(400).send("Response not found!")

        console.log("Response:"+response)

        res.status(200).json(response)

    }catch(error){
        res.status(500).send("server error"+error)
    }
}