import axios from "axios";
import API_URL from "./UserService";

export const getState = async (token:string) => {
  try {
    const res = await axios.get(`${API_URL}/api/state/getState`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data
  } catch (error) {
    throw new Error("Failed to get user state")
  }
};

//unpin match
export const unpinMatchAPI = async (token: string) => {
  try {
    const res = await axios.patch(
      `${API_URL}/api/state/unpinMatch`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to unpin match");
  }
};
