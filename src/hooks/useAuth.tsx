import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// Hook to validate the context and safe rendering
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider.")

    return context
}