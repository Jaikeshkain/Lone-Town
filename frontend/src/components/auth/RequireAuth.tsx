import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkTokenAPI } from "@/services/UserService";
import { useDispatch } from "react-redux";
import { logoutAction } from "@/redux/slice/authSlice";
 // update path if needed

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    const parsed = stored ? JSON.parse(stored) : null;
    const token = parsed?.token;

    const verifyToken = async () => {
      try {
        if (!token) throw new Error("No token");
        await checkTokenAPI(token); // ping backend
        setCheckingAuth(false); // valid token
      } catch (error) {
        // Token is missing or expired
        dispatch(logoutAction());
        localStorage.removeItem("userInfo");
        navigate("/login");
      }
    };

    verifyToken();
  }, []);

  if (checkingAuth) return <div>Loading...</div>;

  return <>{children}</>;
};

export default RequireAuth;
