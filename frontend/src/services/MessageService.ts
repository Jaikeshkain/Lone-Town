import axios from "axios"
import API_URL from "./UserService"

export const getMessageBYMatchAPI=async(matchId:string,token:string)=>{
    try {
        const response=await axios.get(`${API_URL}/api/message/${matchId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    } catch (error:any) {
        throw new Error(error?.response?.data.message || "Something went wrong")
    }
}