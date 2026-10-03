import {portfolioServiceInstance} from "./ApiInstance";

export const GetAllPortfolios = async(userid:string) => {
    try{
        const response  = await portfolioServiceInstance.get(
            `/api/portfolio/${userid}`,
        )
        return response.data
    }catch(err){
        throw err
    }
} 