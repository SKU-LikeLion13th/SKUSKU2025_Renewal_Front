import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";

const AdminRouteGuard = ({ children }) => {
  const [isAllowed, setIsAllowed] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await API.get("/log/status");
        const user = res.data;

        if (user.role === "ADMIN_LION") {
          setIsAllowed(true);
        } else {
          alert("관리자 권한이 없습니다.");
          navigate("/");
        }
      } catch (err) {
        alert("로그인이 필요합니다.");
        navigate("/");
      }
    };

    checkRole();
  }, []);

  if (isAllowed === null) return null;

  return children;
};

export default AdminRouteGuard;
