import axios from "axios";
import API_URL from "./UserService";

export const findMatchAPI = async (token: string) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/match/findMatch`,
      {}, // No body data needed, send empty object
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err:any) {
    console.error(err);
    throw new Error(err?.response?.data?.message || "Failed to find match");
  }
};

export const getMatchByIdAPI=async(currentMatch:string)=>{
  try {
    const response=await axios.get(`${API_URL}/api/match/getMatchById/${currentMatch}`)
    return response.data
  } catch (error:any) {
    throw new Error(error.response.data.message)
  }
}

