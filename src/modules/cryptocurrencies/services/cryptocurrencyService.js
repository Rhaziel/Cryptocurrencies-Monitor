import {getUser} from "../../users/services/userService";
import axios from 'axios'

/**
 * traer la moneda preferida del usuario, luego con esa moneda hacer la pegada
 * a coingecko
 * @param id
 * @returns {Promise<Array>}
 */
export const getCurrencies = async (id) => {

    try{

        const {currencyPreference} = await getUser(id)

        console.log(currencyPreference)

        const URL_COINGECKO = 'https://api.coingecko.com/api/v3/'


        let coinData = await axios.get(`${URL_COINGECKO}coins/markets?vs_currency=${currencyPreference}&order=market_cap_desc&per_page=10&page=1&sparkline=false`)

        console.log(coinData.data)

        return coinData.data.map(({id, symbol, name, image, current_price, last_updated}) => {
            return ({id, symbol, name, image, current_price, last_updated})
        })

    }catch (error) {
        throw new Error("getCurrencies error "+error)
    }

}