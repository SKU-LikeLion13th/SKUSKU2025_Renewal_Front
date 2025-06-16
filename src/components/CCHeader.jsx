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
    <div
      className={`fixed z-10 top-0 w-full transition-all duration-300
        ${isHovered ? "bg-[#4A4A4A] min-h-[280px]" : "backdrop-blur-2xl"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex py-5 px-12 items-center justify-between mx-auto relative z-10 shadow-[0px_0.5px_0px_0px_rgba(217,217,217,1)] ">
        {/* 왼쪽 로고 + 메뉴 */}
        <div className="flex space-x-12">
          <Link to={"/"}>
            <div className="flex items-center space-x-4">
              <img src="/likelionLogo.png" alt="Logo" className="w-9" />
              <p
                className={`text-[21px] fontBlack ${
                  isHovered ? "text-[#fff]" : "text-[#3B79FF]"
                }`}
              >
                LIKELION SKU
              </p>
            </div>
          </Link>

          <div className="flex items-center space-x-16">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`fontMedium text-[16px] ${
                  isHovered ? "text-[#fff]" : "text-white"
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
        <div className="flex space-x-4 items-center">
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
            <div
              className={`flex items-center justify-center  ${
                isHovered ? "text-white" : "text-black"
              }`}
            >
              <div className="flex items-center">
                {/** 색상 조건 설정 */}
                <div
                  style={{ backgroundColor: getColorByTrack(user.track) }}
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full"
                >
                  🦁
                </div>
                <span className="px-2 text-xs">{user.track}</span>
                <span className="font-bold">{user.name}님</span>
              </div>
              <div className="px-2 text-[#fff]">|</div>
              <button onClick={logout} className="text-xs">
                LOGOUT
              </button>
            </div>
          ) : (
            // user가 없으면 로그인 버튼을 표시
            <GoogleLoginBtn isHovered={isHovered} />
          )}
        </div>
      </div>
    </div>
  );
}
