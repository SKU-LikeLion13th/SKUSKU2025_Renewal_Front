import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function HeaderMobile() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`fixed z-10 bg-[#121212] top-0 w-full transition-all duration-300 ${
        isHovered || isMenuOpen ? "bg-white min-h-[280px]" : "backdrop-blur-2xl"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isMenuOpen) setIsHovered(false);
      }}
    >
      <div className="flex flex-col md:flex-row py-4 px-4 ">
        {/* 로고 & 햄버거 */}
        <div className="w-full flex justify-between items-center">
          <Link to={"/"}>
            <div className="flex items-center space-x-2 md:space-x-4">
              <img src="/likelionLogo.png" alt="Logo" className="w-7 md:w-9" />
              <p
                className={`text-md md:text-[21px] fontBlack ${
                  isHovered || isMenuOpen ? "text-[#000]" : "text-[#3B79FF]"
                }`}
              >
                LIKELION SKU
              </p>
            </div>
          </Link>

          {/* 모바일 전용 햄버거 메뉴 */}
          <div className="md:hidden">
            <button
              className="flex"
              onClick={() => {
                const newState = !isMenuOpen;
                setIsMenuOpen(newState);
                if (!newState) setIsHovered(false);
              }}
            >
              {isMenuOpen ? (
                <FiX size={24} />
              ) : (
                <FiMenu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 항목 */}
        {isMenuOpen && (
          <div className="flex flex-col space-y-4 mt-4 md:hidden transition-all duration-300">
            {["PROJECT", "TEAM", "COMMUNITY"].map((title, index) => (
              <div
                key={index}
                className="text-black text-base fontMedium cursor-pointer px-4"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsHovered(false);
                }}
              >
                {title}
              </div>
            ))}
          </div>
        )}

        {/* 메뉴 리스트 */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col mt-4 space-y-4 md:flex md:flex-row md:space-y-0 md:space-x-16 md:mt-0`}
        >
          {["PROJECT", "TEAM", "COMMUNITY"].map((title, index) => (
            <div
              key={index}
              className={`fontMedium text-sm md:text-[16px] ${
                isHovered || isMenuOpen ? "text-[#000]" : "text-white"
              } cursor-pointer relative`}
            >
              {title}
              {(isHovered || isMenuOpen) && (
                <div className="absolute w-full space-y-6 mt-12">
                  {title === "COMMUNITY" ? (
                    <div className="text-sm text-[#121212] text-center fontRegular">
                      문의사항
                    </div>
                  ) : (
                    <>
                      <div className="text-sm text-[#121212] text-center fontRegular">
                        13기
                      </div>
                      <div className="text-sm text-[#121212] text-center fontRegular">
                        12기
                      </div>
                      <div className="text-sm text-[#121212] text-center fontRegular">
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
        <div className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
          <div
            className={`transition-opacity duration-300 space-x-4 ${
              isHovered || isMenuOpen ? "flex opacity-100" : "hidden opacity-0"
            }`}
          >
            <button className="text-[13px] px-6 py-1 flex items-center rounded-3xl text-[#fff] bg-[#212121] ">
              제작자
            </button>
            <a
              href="https://www.instagram.com/likelion_sku"
              className="flex items-center"
            >
              <img
                src="/assets/images/insta.png"
                className="w-7"
                alt="Instagram"
              />
            </a>
            <a href="#" className="flex items-center mr-6">
              <img src="/assets/images/chat.png" className="w-7" alt="Chat" />
            </a>
          </div>

          <div
            className={`flex text-white items-center px-4 py-2 rounded-sm ${
              isHovered || isMenuOpen
                ? "bg-[#8DB7FF] hover:bg-[#2D5ABB]"
                : "bg-[#2D5ABB]"
            }`}
          >
            <img
              src="/assets/images/campus.png"
              alt="Campus Icon"
              width={"16px"}
              className="mr-2"
            />
            <p className="text-[14px]">CYBERCAMPUS</p>
          </div>

          <div
            className={`flex items-center px-4 py-2 rounded-sm ${
              isHovered || isMenuOpen
                ? "border border-[#000] text-[#000] bg-white"
                : "bg-white/50 text-white"
            }`}
          >
            <img
              src="/assets/images/googleLogin.png"
              alt="Google Icon"
              width={"16px"}
              className="mr-2"
            />
            <p className="text-[13px]">구글계정으로 계속하기</p>
          </div>
        </div>
      </div>
    </div>
  );
}
