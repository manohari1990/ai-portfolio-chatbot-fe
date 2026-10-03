// Create the context.
// Create the AuthProvider component.
// Add only the user state.
// Wrap the children with the provider.
// Pass user and setUser through the provider value.

// Don't add login(), logout(), localStorage, or useEffect yet.
import { useState, createContext, useEffect } from "react"
// import { USER_STORAGE_KEY } from "../utils/Constants"
// import { authenticatedFetch } from "@/services/authService"
const USER_STORAGE_KEY = 'user'
interface UserData{
    first_name: string
    last_name?: string
    username: string
    email: string
    phone?: string
    profile_image?: string
}
// 1. Context
export const AuthContext = createContext(null)
// 2. Provider
export function AuthProvider({children}) {
    const [user, setUser] = useState<UserData>(()=>{
                                const cachedUserData = localStorage.getItem(USER_STORAGE_KEY) === undefined ? null : localStorage.getItem(USER_STORAGE_KEY)
                                return cachedUserData
                            })

    // useEffect(()=>{
    //     const checkSession = async()=>{
    //         try{
    //             const resp = await authenticatedFetch()
    //             if (resp && !resp.success) {
    //                 logout();
    //             }
    //         }catch(err){
    //             setUser(null)
    //             localStorage.removeItem(USER_STORAGE_KEY)
    //             throw err
    //         }
    //     }
    //     if(localStorage.getItem('user'))
    //         checkSession();
    // },[])

    const login = (userSession: any) =>{
        setUser(userSession)
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userSession))
        console.info("Login Successful!")
    }

    const updateUser = (updatedInfo: any) => {
        console.log(updatedInfo,"====================updatedInfo")
        setUser(JSON.stringify(updatedInfo))
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
