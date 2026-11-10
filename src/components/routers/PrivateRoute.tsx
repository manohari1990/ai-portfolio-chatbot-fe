import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}: {children: React.ReactNode}){
    const {user} = useAuth()
    if(!user){
        return <Navigate to="/auth" replace />
    }
    return children
}

export default ProtectedRoute;