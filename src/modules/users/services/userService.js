import user from "../models/user";

/**
 *
 * @param {String} name
 * @param {String} lastName
 * @returns {Promise<user>}
 */
export const createUser = ({name,lastName}) => {

    return new Promise((resolve, reject) => {

        const newUser = new user({ name, lastName});

        newUser.save()
            .then( doc => resolve(doc))
            .catch(err => {
                console.error("createUser error: ",err)
                reject(err)
            })
    })

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

