import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get("/log/status");
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // const logout = () => {
  //   localStorage.removeItem("redirectAfterLogin");
  //   setUser(null);
  //   window.location.href = "/";
  // };
  const logout = async () => {
    try {
      // 서버 로그아웃 요청 (OAuth2 + HttpOnly Cookie 세션 종료)
      await API.post("/log/out");

      // 클라이언트 상태 초기화
      setUser(null);
      localStorage.removeItem("redirectAfterLogin");

      // 홈으로 이동
      window.location.href = "/";
    } catch (err) {
      console.error("로그아웃 실패:", err);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
