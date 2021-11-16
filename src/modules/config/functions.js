const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const isOk = password => {
    let validRegex = /^[a-zA-Z0-9]{8,}/
    return validRegex.test(password)
}

export const isCurrencyValid = currencyPreference => {
    let validCurrency = ['USD', 'EUR', 'ARS']
    return validCurrency.includes(currencyPreference)
}

export const passwordEncrypt = password => {

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);

}

export const passwordAuth = (password, passwordEncrypt) => {
    return bcrypt.compareSync(password, passwordEncrypt);
}

export  const getToken = (userId, userName) => {

    if (!process.env.JWT_SECRET) throw new Error("getToken process.env.JWT_SECRET is required!");

    if (!process.env.JWT_LOGIN_EXPIRED_IN) throw new Error("getToken process.env.JWT_LOGIN_EXPIRED_IN is required!");

    try{

        const payload = {userId, userName}

        const options = {
            expiresIn: process.env.JWT_LOGIN_EXPIRED_IN,
            jwtid: userId.toString(),
            algorithm: "HS256"
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, options);

        return {token}

    }catch (error){
        throw new Error(error);
    }

}
