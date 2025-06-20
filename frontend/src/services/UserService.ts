import axios from "axios";

const API_URL = "https://lone-town-backend-bfvr.onrender.com";
export const RegisterAPI=async(formData:any)=>{
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, formData);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "Failed to create account"
      );
    }
}

export const LoginAPI = async (body: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, body);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

export const logoutAPI=async()=>{
  try {
    const response=await axios.post(`${API_URL}/api/auth/logout`,{})
    return response.data
  } catch (error:any) {
    throw new Error(error?.response?.data?.message || "Something went wrong");
  }
}

export const getUserData=async(token:string)=>{
  try {
    const response=await axios.get(`${API_URL}/api/auth/getUser`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error:any) {
    throw new Error(error?.response?.data.message || "Something went wrong")
  }
}

export const checkTokenAPI = async (token: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/auth/check`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.valid;
  } catch (err) {
    throw new Error("Token invalid or expired");
  }
};

export default API_URL

