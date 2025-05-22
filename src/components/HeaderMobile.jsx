import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function HeaderMobile() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`fixed z-10 bg-[#121212] top-0 w-full transition-all duration-300 ${
        isHovered || isMenuOpen ? "bg-white min-h-[180px]" : "backdrop-blur-2xl"
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
      </div>
    </div>
  );
}
