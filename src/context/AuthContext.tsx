// Create the context.
// Create the AuthProvider component.
// Add only the user state.
// Wrap the children with the provider.
// Pass user and setUser through the provider value.

// Don't add login(), logout(), localStorage, or useEffect yet.
// import { USER_STORAGE_KEY } from "../utils/Constants"
// import { authenticatedFetch } from "@/services/authService"

// interface UserData{
//     first_name: string
//     last_name?: string
//     username: string
//     email: string
//     phone?: string
//     profile_image?: string
// }

import type { Session } from "../services/api"
import { useState, createContext } from "react"

const USER_STORAGE_KEY = 'portfolio-os-session'
// 1. Context
export const AuthContext = createContext(null)
// 2. Provider
export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<Session | null>(()=>{
                                const cachedUserData = localStorage.getItem(USER_STORAGE_KEY) === undefined ? null : localStorage.getItem(USER_STORAGE_KEY)
                                return cachedUserData
                            })

    const login = (userSession: Session | null) =>{
        console.log(userSession, "====================userSession")
        setUser(userSession)
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userSession))
        console.info("Login Successful!")
    }

    const updateUser = (updatedInfo: Session | null) => {
        console.log(updatedInfo,"====================updatedInfo")
        setUser(updatedInfo)
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedInfo))
        console.info("User updated!")
    }

    const logout = () =>{
        setUser(null)
        localStorage.removeItem(USER_STORAGE_KEY)
        console.info("Logout Successful!")
    }

    return(
        <AuthContext.Provider value={{user, updateUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
