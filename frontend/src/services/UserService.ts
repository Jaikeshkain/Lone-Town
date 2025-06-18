import axios from "axios";

const API_URL="http://localhost:5000"
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

export default API_URL

