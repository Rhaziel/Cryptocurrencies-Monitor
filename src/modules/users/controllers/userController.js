import {createUser, getUser} from "../services/userService";


export const createUserAction = async (req, res) => {

    try{

        const {name, lastName} = req.body

        if(!name || !lastName)
            res.status(400).send("name and lastName parameters is required!")

        let response = await createUser({name,lastName})

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
