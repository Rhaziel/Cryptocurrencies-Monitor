import user from "../models/user";

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

        const newUser = new user({ name, lastName, userName, password, currencyPreference});

        userDoc = await newUser.save()

        return userDoc

    }catch(error){
        console.error("createUser error: ",error)
        throw new Error("createUser error "+error)
    }


}

export const getUser =() => {

    return new Promise((resolve, reject) => {

        user.find()
            .then(docs => {
                resolve(docs)
            })
            .catch(error => {
                console.error("getUser error: ",error)
                reject(error)
            })
    })

}

