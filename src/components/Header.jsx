import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GoogleLoginBtn from "./GoogleLoginBtn";
import CCBtn from "./CCBtn";
import { useAuth } from "../utils/AuthContext";
import { Menu, X } from "lucide-react"; // 햄버거 아이콘 (lucide-react 추천)

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { title: "PROJECT", path: "/project" },
    { title: "TEAM", path: "/team" },
    { title: "COMMUNITY", path: null },
  ];

  function getColorByTrack(track) {
    switch (track) {
      case "DESIGN":
        return "#FF669D";
      case "FRONTEND":
        return "#F75222";
      case "BACKEND":
        return "#0ACF83";
      default:
        return "#999999";
    }
  }

  return (
    // <div
    //   className="fixed z-10 top-0 w-full transition-all duration-300"
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    // >
    <div
      className={`
    fixed z-10 top-0 w-full transition-all duration-300
    ${isHovered ? "md:bg-white md:min-h-[280px]" : ""}
    backdrop-blur-2xl
  `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-wrap py-5 px-4 md:px-12 items-center justify-between mx-auto relative z-10 shadow-[0px_0.5px_0px_0px_rgba(217,217,217,1)]">
        {/* 왼쪽 로고 */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="/likelionLogo.png" alt="Logo" className="w-9" />
          <p
            className={`text-[21px] fontBlack 
    ${isHovered ? "md:text-black" : "text-[#3B79FF]"}
  `}
          >
            LIKELION SKU
          </p>
        </Link>

        {/* 햄버거 버튼 (모바일 전용) */}
        <button
          className="md:hidden text-black ml-auto"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* 중앙 메뉴 (데스크탑 전용) */}
        <div className="hidden md:flex items-center space-x-12">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`fontMedium text-[16px] ${
                isHovered ? "md:text-black" : "text-white"
              } cursor-pointer relative`}
            >
              {item.path ? (
                <Link to={item.path}>{item.title}</Link>
              ) : (
                item.title
              )}
              {isHovered && (
                <div className="absolute w-full space-y-6 mt-12">
                  {item.title === "COMMUNITY" ? (
                    <div className="text-[16px] text-[#121212] text-center fontRegular">
                      문의사항
                    </div>
                  ) : (
                    <>
                      <div className="text-[16px] text-[#121212] text-center fontRegular">
                        13기
                      </div>
                      <div className="text-[16px] text-[#121212] text-center fontRegular">
                        12기
                      </div>
                      <div className="text-[16px] text-[#121212] text-center fontRegular">
                        11기
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 오른쪽 버튼들 */}
        <div className="flex space-x-4 items-center mt-4 md:mt-0">
          <div className="transition-opacity duration-300 space-x-4">
            <button className="text-[13px] px-4 py-1 flex items-center rounded-3xl text-[#fff] bg-[#212121] ">
              제작자
            </button>
            <a
              href="https://www.instagram.com/likelion_sku"
              className="flex items-center"
            >
              <img
                src="/assets/images/insta.png"
                className="w-7"
                alt="인스타"
              />
            </a>
            <a href="#" className="flex items-center mr-6">
              <img src="/assets/images/chat.png" className="w-7" alt="채팅" />
            </a>
          </div>

          <CCBtn isHovered={isHovered} />

          {user ? (
            <div
              className={`flex items-center justify-center ${
                isHovered ? "md:text-black" : "text-white"
              }`}
            >
              <div className="flex items-center">
                <div
                  style={{ backgroundColor: getColorByTrack(user.track) }}
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full"
                >
                  🦁
                </div>
                <span className="px-2 text-xs">{user.track}</span>
                <span className="font-bold">{user.name}님</span>
              </div>
              <div className="px-2 text-[gray]">|</div>
              <button onClick={logout} className="text-xs">
                LOGOUT
              </button>
            </div>
          ) : (
            <GoogleLoginBtn isHovered={isHovered} />
          )}
        </div>
      </div>

      {/* 모바일 메뉴 열림 시 드롭다운 */}
      {/* {mobileMenuOpen && (
        <div className="block md:hidden px-4 py-4 space-y-3 bg-white text-black">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.path ? (
                <Link to={item.path} className="block text-sm font-medium">
                  {item.title}
                </Link>
              ) : (
                <span className="block text-sm font-medium">{item.title}</span>
              )}
            </div>
          ))}
        </div>
      )} */}
      {/* 모바일 메뉴 열림 시 드롭다운 */}
      {mobileMenuOpen && (
        <div className="block md:hidden px-4 py-4 space-y-3 bg-white text-black">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.path ? (
                <Link to={item.path} className="block text-sm font-medium">
                  {item.title}
                </Link>
              ) : (
                <div className="text-sm font-medium">
                  {item.title}
                  <div className="ml-2 mt-1 space-y-1 text-sm text-gray-600">
                    {item.title === "COMMUNITY" ? (
                      <div>문의사항</div>
                    ) : (
                      <>
                        <div>13기</div>
                        <div>12기</div>
                        <div>11기</div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
