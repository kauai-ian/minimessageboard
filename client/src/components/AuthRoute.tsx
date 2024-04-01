

import { Navigate, RouteProps } from "react-router";
import useAuth from "../hooks/useAuth";
import { FC } from "react";

const AuthRoute: FC<RouteProps> = ({ children }) => {
    const {isAuthenticated } = useAuth()
    if(!isAuthenticated) {
        return <Navigate to='/' />
    }
    return children
}
export default AuthRoute
// protects routes that require auth. checks if user is auth. returns isAuth.