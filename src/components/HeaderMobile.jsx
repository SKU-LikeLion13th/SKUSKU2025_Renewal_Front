import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function HeaderMobile() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { title: "PROJECT", path: "/project" },
    { title: "TEAM", path: "/team" },
    { title: "COMMUNITY", path: "/community" },
  ];

  return (
    <div
      className={`fixed z-10 top-0 w-full transition-all duration-300 ${
        isMenuOpen ? "bg-white" : "backdrop-blur-2xl"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isMenuOpen) setIsHovered(false);
      }}
    >
      <div className="flex flex-col py-4 md:py-6 px-4">
        {/* 👆 flex-col이 핵심 */}

        {/* 로고 & 햄버거 버튼 (윗줄) */}
        <div className="flex justify-between items-center w-full md:px-3">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <img src="/likelionLogo.png" alt="Logo" className="w-7 md:w-10" />
              <p
                className={`text-md fontBlack md:text-xl ${
                  isMenuOpen ? "text-[#000]" : "text-[#3B79FF]"
                }`}
              >
                LIKELION SKU
              </p>
            </div>
          </Link>

          <button
            className="flex"
            onClick={() => {
              const newState = !isMenuOpen;
              setIsMenuOpen(newState);
              if (!newState) setIsHovered(false);
            }}
          >
            {isMenuOpen ? (
              <FiX size={24} className="text-black" />
            ) : (
              <FiMenu size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* 👇 메뉴 항목들 (아랫줄에 따로!) */}
        {isMenuOpen && (
          <div className="flex flex-col space-y-4 mt-4 transition-all duration-300 sm:ml-5">
            {menuItems.map(({ title, path }) => (
              <Link
                to={path}
                key={title}
                className="text-black text-base fontMedium cursor-pointer px-4"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsHovered(false);
                }}
              >
                {title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
