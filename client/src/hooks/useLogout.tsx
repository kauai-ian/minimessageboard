// removes the cookie with react-cookie
// reroutes
// loading
// logout function async, set loading, await api logout, remove cookie, navigate, error, setloading false
// return loading, logout

import getErrorMessage from "../helpers/getErrorMessage"
import { useNavigate } from "react-router"
import { useState } from "react"
import * as api from '../api/auth'
import { useCookieContext } from "../context/auth.context";

const useLogout = () => {
    const {removeCookie} = useCookieContext() //retrieve the removeCookie function
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // define a logout function
    const logout = async () => {
        setLoading(true)
        try {
            await api.logout()
            removeCookie('daCookieMonster')
            navigate('/')
        } catch (err) {
            throw new Error('failed to logout' + getErrorMessage(err))
        }
        setLoading(false)
    } 
    return {logout, loading }
}
export default useLogout