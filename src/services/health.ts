import apiInstance from "./ApiInstance";
export const healthCheck = async() => {
    try{
        const healthResponse = await apiInstance.get('/health')
        return healthResponse.data
    }catch(err){
        console.error(`Failed to fetch: ${err}`)
    }
}

export const testDBConn = async() =>{
    try{
        const dbConn = await apiInstance.get('/api/db-test')
        return dbConn.data
    }catch(err){
        console.error(err)
    }
}