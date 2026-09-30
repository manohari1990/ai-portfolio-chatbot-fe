import apiInstance from "./ApiInstance"

export const userLogin = async (login:string, password: string) => {
    try {
        // const response = await apiInstance(
        //     `/api/login`,
        //     {
        //         'method': 'POST',
        //         data: JSON.stringify({login, password})
        //     }
        // )
        return {
            success: true,
            data: [{
                username: 'admin',
                email: 'admin@dev.com',
                phone: '1234567890',
            }]
        }
        // { method: 'POST', body: JSON.stringify({ login, password }), headers: HEADERS, credentials: 'include' }
        // if (!response.ok)
        //     throw new Error("User authentication failed!!")
        // return await response.json()
    } catch (err) {
        throw err
    }
}