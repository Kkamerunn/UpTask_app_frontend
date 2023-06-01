import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axiosClient";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setLoading(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient('/users/perfil', config)

                setAuth(data)
            } catch (error) {
                setAuth({})
            } finally {
                setLoading(false)
            }
        }
        authUser()
    }, [])

    const handleSetAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                loading,
                handleSetAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext