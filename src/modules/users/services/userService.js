import user from "../models/user";
import {passwordEncrypt,getToken, passwordAuth} from "../../config/functions";
import {findCryptocurrencyById} from "../../cryptocurrencies/services/cryptocurrencyService.js";


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

export const addNewCryptocurrencyToUser = async (userId, coinID) => {

    try{

        const userDoc = await getUser(userId)

        console.log("UserId:" + userId)
        console.log("UserDoc:" + userDoc)

        if(!userDoc)
            return ("content not found!")

        if(userDoc.cryptocurrencies.find(coin => coin.id_crypto === coinID)){
            return ("Cryptocurrency is already added to favorites!")
        }else{

            const {id, symbol, name, image, last_updated} = await findCryptocurrencyById(coinID);

            const newCoin = {id_crypto: id, symbol, name, image, last_updated}

            console.log("NewCoin:" + newCoin)

            userDoc.cryptocurrencies.push(newCoin)

            console.log("userDoc modificado:" + userDoc)

            userDoc.save()

            console.log("hasta aqui llego")
            return userDoc
        }

    }catch(error){
        console.error("addNewCryptocurrencyToUser error: ",error)
        throw new Error("addNewCryptocurrencyToUser error "+error)
    }

}