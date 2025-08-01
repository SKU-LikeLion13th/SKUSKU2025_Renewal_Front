import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function HeaderMobile() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { title: "PROJECT", path: "/project" },
    { title: "TEAM", path: "/team" },
    { title: "COMMUNITY", path: "/", isAlert: true },
    { title: "CYBERCAMPUS", path: "/cybercampus" },
  ];

  const handleAlertClick = () => {
    alert("내년 상반기에 다시 모집할 예정입니다. 다음 기회에 지원해주세요!");
  };

  return (
    <div
      className={`fixed z-100 top-0 w-full transition-all duration-300 ${
        isMenuOpen ? "bg-white" : "backdrop-blur-2xl"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isMenuOpen) setIsHovered(false);
      }}
    >
      <div className="flex flex-col py-4 px-4">
        {/* 로고 & 햄버거 버튼 */}
        <div className="flex justify-between items-center w-full">
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

        {/* 메뉴 리스트 */}
        {isMenuOpen && (
          <div className="flex flex-col space-y-4 mt-4 transition-all duration-300 sm:ml-5">
            {menuItems.map((item, index) => {
              const isLast = index === menuItems.length - 1;
              const itemClass = `text-black text-base fontMedium cursor-pointer px-4 ${
                isLast ? "mb-3" : ""
              }`;

              return (
                <div key={index}>
                  {item.isAlert ? (
                    <div
                      onClick={() => {
                        handleAlertClick();
                        setIsMenuOpen(false);
                        setIsHovered(false);
                      }}
                      className={itemClass}
                    >
                      {item.title}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={itemClass}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsHovered(false);
                      }}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
