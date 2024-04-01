import axios from "axios"
import API_Url from "./config"
import getErrorMessage from "../helpers/getErrorMessage"

export const user = async(userId: string) => {
    try{const res = await axios.get(`${API_Url}/users/${userId}`)
res.status
return res.data
    } catch (err) {
throw new Error('failed to get user' + getErrorMessage(err))
    }
}
export const list = async () => {
    try {
        const res = await axios.get(`${API_Url}/users`)
        return await res.data
    } catch (err) {
        throw new Error('failed to get users list' + getErrorMessage(err))
            }
}

// user function async fetches the user data from an api 

// list function async fetches a list of users