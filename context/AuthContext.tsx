import React, { useEffect, useState } from "react"
import { Token, User, UserLogin, UserRegister } from "../types/auth.types"

import * as authService from '../services/auth.service'
import tokenCache from "../services/token.service"

export interface IAuthContext {
    error: unknown
    userId: string | undefined
    loading: boolean
    user: User | undefined

    login: (dto: UserLogin) => Promise<Token | undefined>
    register: (dto: UserRegister) => Promise<User | undefined>
    clearErrors: () => void
    logout: () => void
}


const AuthContext = React.createContext<IAuthContext | null>(null)

export const AuthContextProvider = ({children} : {children : React.ReactNode}) => {

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState<unknown>()
    const [userId, setUserId] = useState<string | undefined>()
    const [user, setUser] = useState<User | undefined>()

    useEffect(() => {
        if(userId) {
            const fetchUser = async() => {
                try {
                    const _user = await authService.getUser(userId)
                    setUser(user)
                }
                catch(e) {
                    // ignore error here, user does not need to be aware of it
                    console.log(e)
                }
            }
            fetchUser()
        }
    }, [userId])


    const clearErrors = () => setError(undefined)

    async function login(dto: UserLogin) : Promise<Token | undefined> {
        setLoading(true)
        try {
            const response = await authService.login(dto)
            setUserId(response.userId)
            tokenCache.saveToken("userId", response.userId)
            return response
        }
        catch(e: any) {
            setError(e)
        }
        finally {
            setLoading(false)
        }
        return undefined
    }

    async function register(dto: UserRegister) : Promise<User | undefined> {
        setLoading(true)
        try {
            const _user = await authService.register(dto)
            console.log(_user)
            return _user
        }
        catch(e: any) {
            console.log(JSON.stringify(e))
            setError(e)
        }
        finally {
            setLoading(false)
        }
        return undefined
    }

    async function logout() {
        tokenCache.deleteToken("userId")
        setUserId(undefined)
        setUser(undefined)
    }

    return  <AuthContext.Provider value={{error, loading, userId,user,logout, login,register,clearErrors}}>
        {children}
    </AuthContext.Provider>
}


export const useAuth  = () => {
    const context = React.useContext(AuthContext)
    if(!context) {
        throw new Error("AuthContext was used outside of a AuthContextProvider")
    }
    return context
}