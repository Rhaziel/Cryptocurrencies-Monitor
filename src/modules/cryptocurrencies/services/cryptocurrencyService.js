const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

export const getCurrencies = async () => {

    try{


        let func = async() => {
            let data = await CoinGeckoClient.ping();
        };


    }catch (error) {
        console.error("createUser error: ",error)
        throw new Error("createUser error "+error)
    }

}