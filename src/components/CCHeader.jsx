import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GoogleLoginBtn from "./GoogleLoginBtn";
import CCBtn from "./CCBtn";
import { useAuth } from "../utils/AuthContext";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";

export default function CCHeader() {
  const [isHovered, setIsHovered] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const menuItems = [
    { title: "PROJECT", path: "project" },
    { title: "TEAM", path: "team" },
    { title: "COMMUNITY", path: "community" },
  ];

  const basePath = isAdmin ? "admin" : "";

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
    <div
      className={`fixed z-100 top-0 w-full transition-all duration-300
        ${isHovered ? "bg-[#4A4A4A] min-h-[280px]" : "backdrop-blur-2xl"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex md:py-5 py-3 md:px-12 px-5 items-center justify-between mx-auto relative z-10 shadow-[0px_0.5px_0px_0px_rgba(217,217,217,1)] ">
        {/* 왼쪽 로고 + 메뉴 */}
        <div className="flex space-x-12">
          <Link to={"/"}>
            <div className="flex items-center md:space-x-4 space-x-2">
              <img src="/likelionLogo.png" alt="Logo" className="md:w-9 w-6" />
              <p
                className={`md:text-[21px] text-[16px] fontBlack ${
                  isHovered ? "text-[#fff]" : "text-[#3B79FF]"
                }`}
              >
                LIKELION SKU
              </p>
            </div>
          </Link>

          {/* 메뉴 (모바일에서는 숨김) */}
          <div className="hidden md:flex items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 xl:space-x-16">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`fontMedium text-[16px] ${
                  isHovered ? "text-[#fff]" : "text-black"
                } cursor-pointer relative`}
              >
                {item.path ? (
                  <Link
                    to={`/${[basePath, item.path].filter(Boolean).join("/")}`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
                {isHovered && (
                  <div className="absolute w-full space-y-6 mt-12">
                    {item.title === "COMMUNITY" ? (
                      <div className="text-[16px] text-[#fff] text-center fontRegular">
                        문의사항
                      </div>
                    ) : (
                      <>
                        <div className="text-[16px] text-[#fff] text-center fontRegular">
                          13기
                        </div>
                        <div className="text-[16px] text-[#fff] text-center fontRegular">
                          12기
                        </div>
                        <div className="text-[16px] text-[#fff] text-center fontRegular">
                          11기
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 로그인 및 버튼 */}
        <div className="hidden md:flex space-x-4 items-center ">
          {/* Hover 시에만 보임 */}
          <div
            className={`transition-opacity duration-300 space-x-4 ${
              isHovered ? "flex opacity-100" : "hidden opacity-0"
            }`}
          >
            <button className="text-[13px] px-6 py-1 flex items-center rounded-3xl text-[#232323] bg-white fontBold">
              제작자
            </button>
            <a
              href="https://www.instagram.com/likelion_sku?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="flex items-center rounded-full bg-white"
            >
              <FaInstagram className="w-7" />
            </a>
            <a
              href="#"
              className="flex items-center mr-6 rounded-full bg-white"
            >
              <BiSolidMessageRoundedDots className="w-7" />
            </a>
          </div>

          <CCBtn isHovered={isHovered} />

          {user ? (
            <div className="flex items-center justify-center ">
              <div
                className={`flex items-center justify-center fontMedium text-[16px] ${
                  isHovered ? "text-[#fff]" : "text-black"
                } cursor-pointer relative`}
              >
                {/** 색상 조건 설정 */}
                <div
                  style={{ backgroundColor: getColorByTrack(user.track) }}
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full "
                >
                  🦁
                </div>
                <span className="px-2 text-xs">{user.track}</span>
                <span className="font-bold">{user.name}님</span>
                <div
                  className={`flex mx-2 ${
                    isHovered ? "text-[#fff]" : "text-black"
                  } cursor-pointer relative`}
                >
                  |
                </div>
                <button onClick={logout} className="text-xs">
                  LOGOUT
                </button>
              </div>
            </div>
          ) : (
            // user가 없으면 로그인 버튼을 표시
            <GoogleLoginBtn
              textColor="text-black"
              bgColor="bg-white"
              borderColor="border-black"
            />
          )}
        </div>
      </div>
    </div>
  );
}
