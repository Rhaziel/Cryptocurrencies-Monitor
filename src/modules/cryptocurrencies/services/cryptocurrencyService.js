import {getUser} from "../../users/services/userService";
import {getMarketCryptocurrencies, getMarketCryptocurrency} from "../providers/coingeckoService.js";
import {response} from "express";
require('dotenv').config()

/**
 * traer la moneda preferida del usuario, luego con esa moneda hacer la pegada
 * a coingecko
 * @param {String} id
 * @param {number} coinsPerPage
 * @param {number} pageCoin
 * @param {String} order
 * @returns {Promise<Array>}
 */
export const getCurrencies = async (id,coinsPerPage = 10,pageCoin = 1,order = null) => {

    try{

        const {currencyPreference} = await getUserPreferredCurrency(id)

        const coinData = await getMarketCryptocurrencies(currencyPreference, coinsPerPage, pageCoin, order)

        return filterDataForResponse(coinData)

    }catch (error) {
        throw new Error("getCurrencies error "+error)
    }

}

/**
 * @description Returns the user's preferred quote.
 * Consumed by "getCurrencies" Service.
 * @param userID
 * @returns {Promise<>}
 */

const getUserPreferredCurrency = userID => {
    return new Promise((resolve,reject)=> {
        getUser({userID})
            .then(doc => {
                resolve(doc.currencyPreference)
            })
            .catch(error => {
                reject(error)
            })
    })

}

const filterDataForResponse = coinData => {
    return coinData.map(({id, symbol, name, image, current_price, last_updated}) => {
        return ({id, symbol, name, image, current_price, last_updated})
    })
}

export const findCryptocurrencyById = async coinId => {

    try{

        const {id, symbol, name, image, last_updated} = await getMarketCryptocurrency(coinId)

        console.log("id crypto: "+id)
        console.log("id crypto type: "+typeof (id))

        return {id, symbol, name, image, last_updated}

    }catch(error) {
        throw new Error("server error "+error)
    }

}