import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GoogleLoginBtn from "./GoogleLoginBtn";
import CCBtn from "./CCBtn";
import { useAuth } from "../utils/AuthContext";

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname + location.search === path;
  };
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsTooltipVisible(false);
      }
    }

    if (isTooltipVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTooltipVisible]);

  const menuItems = [
    {
      title: { label: "PROJECT", path: "/project" },
      subItems: [
        { label: "13기", path: "/project?tab=13" },
        { label: "12기", path: "/project?tab=12" },
        { label: "11기", path: "/project?tab=11" },
      ],
    },
    {
      title: { label: "TEAM", path: "/team?tab=13" },
      subItems: [
        { label: "13기", path: "/team?tab=13" },
        { label: "12기", path: "/team?tab=12" },
        { label: "11기", path: "/team?tab=11" },
      ],
    },
    {
      title: { label: "COMMUNITY", isAlert: true },
      subItems: [{ label: "모집공고", isAlert: true }],
    },
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

  const handleAlertClick = () => {
    alert("내년 상반기에 다시 모집할 예정입니다. 다음 기회에 지원해주세요!");
  };

  return (
    <div
      className={`fixed z-10 top-0 w-full transition-all duration-300 ${
        isHovered ? "bg-white min-h-[280px]" : "backdrop-blur-2xl"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex py-5 px-12 items-center justify-between mx-auto relative z-10 shadow-[0px_0.5px_0px_0px_rgba(217,217,217,1)]">
        {/* 왼쪽 로고 + 메뉴 */}
        <div className="flex space-x-12">
          <Link to={"/"}>
            <div className="flex items-center space-x-4">
              <img src="/likelionLogo.png" alt="Logo" className="w-9" />
              <p
                className={`text-[21px] fontBlack ${
                  isHovered ? "text-[#000]" : "text-[#3B79FF]"
                }`}
              >
                LIKELION SKU
              </p>
            </div>
          </Link>

          <div className="flex items-center space-x-16">
            {menuItems.map((item, index) => {
              const active = isActive(item.title.path);

              return (
                <div
                  key={index}
                  className={`fontMedium text-[16px] ${
                    isHovered ? "text-[#000]" : "text-white"
                  } cursor-pointer relative ${
                    active ? "fontBold" : "fontRegular"
                  }`}
                >
                  {/* 타이틀이 alert일 경우 */}
                  {item.title.isAlert ? (
                    <div onClick={handleAlertClick}>
                      <span>{item.title.label}</span>
                    </div>
                  ) : (
                    <Link to={item.title.path}>
                      <span>{item.title.label}</span>
                    </Link>
                  )}

                  {isHovered && (
                    <div className="absolute w-full space-y-8 mt-12">
                      {item.subItems.map((subItem, subIdx) => {
                        const subActive = isActive(subItem.path);

                        return subItem.isAlert ? (
                          <div
                            key={subIdx}
                            onClick={handleAlertClick}
                            className={`block text-[16px] text-[#121212] text-center cursor-pointer ${
                              subActive ? "fontBold" : "fontRegular"
                            }`}
                          >
                            {subItem.label}
                          </div>
                        ) : (
                          <Link
                            key={subIdx}
                            to={subItem.path}
                            className={`block text-[16px] text-[#121212] text-center ${
                              subActive ? "fontBold" : "fontRegular"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 오른쪽 로그인 및 버튼 */}
        <div className="flex space-x-4 items-center ">
          {/* Hover 시에만 보임 */}
          <div
            className={`transition-opacity duration-300 space-x-4 hidden xl:flex ${
              isHovered ? "flex opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="relative" ref={tooltipRef}>
              <button
                className="text-[13px] px-6 py-1 flex items-center rounded-3xl text-[#fff] bg-[#212121]"
                onClick={() => setIsTooltipVisible((prev) => !prev)}
              >
                제작자
              </button>

              {isTooltipVisible && (
                <div className="absolute top-[140%] left-1/2 -translate-x-1/2 bg-white border border-gray-500 rounded-lg shadow-md px-4 py-2 text-sm text-black whitespace-nowrap z-20">
                  12, 13기 운영진이 제작했습니다!
                  <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-500 rotate-45"></div>
                </div>
              )}
            </div>
            <a
              href="https://www.instagram.com/likelion_sku"
              className="flex items-center"
              target="_blank"
              rel="noopener noreferrer"
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
                isHovered ? "text-black" : "text-white"
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
    </div>
  );
}
