import user from "../models/user";
import {passwordEncrypt,getToken, passwordAuth} from "../../config/functions";


/**
 *
 * @param name {String}
 * @param lastName {String}
 * @param userName {String}
 * @param password {String}
 * @param currencyPreference {String}
 * @returns {Promise<user>}
 */
export const createUser = async ({name,lastName,userName,password,currencyPreference}) => {

    try{

        let userDoc = await user.findOne({userName: userName})

        if(userDoc)
            return null

        const newUser = new user({ name, lastName, userName, password: passwordEncrypt(password), currencyPreference});

        userDoc = await newUser.save()

        return userDoc

    }catch(error){
        console.error("createUser error: ",error)
        throw new Error("createUser error "+error)
    }
}

export const getUser = (id) => {

    return new Promise((resolve, reject) => {

        user.findOne({_id: id})
            .then(doc => {
                resolve(doc)
            })
            .catch(error => {
                console.error("getUser error: ",error)
                reject(error)
            })
    })

}

export const authUser = async (userName, password) => {

    try{

        let userDoc = await user.findOne({userName: userName})

        if(userDoc && passwordAuth(password,userDoc.password)) {
            return getToken(userDoc._id, userDoc.userName)
        }else{
            return null
        }

    }catch (error){
        console.error("createUser error: ",error)
        throw new Error("createUser error "+error)
    }

}