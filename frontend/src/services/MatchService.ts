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

