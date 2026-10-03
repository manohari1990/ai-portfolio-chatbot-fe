import { authServiceInstance } from "./ApiInstance"

export const userLogin = async (login: string, password: string) => {
    try {
        const response = await authServiceInstance.post(
            `/auth/login`,
            { login, password }
        )
        return response.data
    } catch (err) {
        throw err
    }
}

export const registerUser = async (formData: any) => {
    try {
        const response = await authServiceInstance.post(
            `/auth/register`,
            formData
        )
        return response.data
    } catch (err) {
        throw err
    }
}