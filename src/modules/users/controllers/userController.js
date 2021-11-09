import {createUser, getUser} from "../services/userService";


export const createUserAction = async (req, res) => {

    try{

        const {name, lastName, userName, password, currencyPreference} = req.body

        if(!name || !lastName || !userName || !password || !currencyPreference)
            res.status(400).send("name, lastname, username, password and currencypreference parameters is required!")

        let response = await createUser({name,lastName,userName,password,currencyPreference})

        if(!response)
            res.status(200).send("username ya esta en uso")

        res.status(201).json(response)

    }catch (error){
        res.status(500).send("Server error"+error)
    }

}

export const getUserAction = async (req,res) => {
    try{

        let response = await getUser()

        if(!response)
            res.status(404).send("content not found!")

        res.status(200).json(response)

    }catch (error){

        res.status(500).send("server error"+error)

    }
}
