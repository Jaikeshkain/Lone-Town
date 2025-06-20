import { getUserData } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const storedData = localStorage.getItem("userInfo");
  const token = storedData ? JSON.parse(storedData)?.token : null;

  const { data: userData } = useQuery({
    queryKey: ["fetch user"],
    queryFn: () => getUserData(token as string),
    enabled: !!token,
  });

  return userData?.user || null;
};
