import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const DEFAULT_ORDER_VALUE = "market_cap_desc";
const ORDER_VALUES_FOR_FETCH_COINS = ["market_cap_asc", "market_cap_desc", "gecko_asc", "gecko_desc", "volume_asc", "volume_desc", "id_asc", "id_desc"];

export const getMarketCryptocurrencies = (currency, coinsPerPage = 10,pageCoin = 1,order = null) => {

    return new Promise((resolve, reject) => {

        if(!currency)
            reject("currency is required!")

        if(!process.env.URL_COINGECKO)
            reject("process.env.URL_COINGECKO is required!")

        const URL = process.env.URL_COINGECKO + "coins/markets"

        const PARAMS = {
            vs_currency: currency,
            order: getOrder(order, ORDER_VALUES_FOR_FETCH_COINS, DEFAULT_ORDER_VALUE),
            per_page: coinsPerPage,
            page: pageCoin
        };

        axios.get(URL, {params: PARAMS})
            .then(response => resolve(response.data))
            .catch(error => reject(error))

    });

}

const getOrder = (order, orderValueList, orderDefault) => {
    if(orderValueList.includes(order))
        return order;
    else return orderDefault;
};

export const getMarketCryptocurrency = coinId => {

    return new Promise((resolve, reject) => {

        if(!process.env.URL_COINGECKO)
            reject("process.env.URL_COINGECKO is required!")

        const URL = process.env.URL_COINGECKO + "coins/" + coinId

        axios.get(URL)
            .then(response => resolve(response))
            .catch(error => reject(error))
    });

}