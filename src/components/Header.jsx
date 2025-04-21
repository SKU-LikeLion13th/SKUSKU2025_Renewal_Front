import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleLoginBtn from "./GoogleLoginBtn";
import CCBtn from "./CCBtn";

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`fixed z-10 top-0 w-full transition-all duration-300
    ${isHovered ? "bg-white min-h-[280px]" : "backdrop-blur-2xl"}
  `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex py-5 px-12 items-center justify-between mx-auto relative z-10 shadow-[0px_0.5px_0px_0px_rgba(217,217,217,1)] ">
        {/* 왼쪽 */}
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
            {["PROJECT", "TEAM", "COMMUNITY"].map((title, index) => (
              <div
                key={index}
                className={`fontMedium text-[16px] ${
                  isHovered ? "text-[#000]" : "text-white"
                } cursor-pointer relative`}
              >
                {title}
                {isHovered && (
                  <div className="absolute w-full space-y-6 mt-12">
                    {title === "COMMUNITY" ? (
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
        </div>

        {/* 오른쪽 */}
        <div className="flex space-x-4 items-center">
          {/* hover 시에만 보여지는 버튼들 */}
          <div
            className={`transition-opacity duration-300 space-x-4 ${
              isHovered ? "flex opacity-100 " : "hidden opacity-0"
            }`}
          >
            <button className="text-[13px] px-6 py-1 flex items-center rounded-3xl text-[#fff] bg-[#212121] ">
              제작자
            </button>
            <a
              href="https://www.instagram.com/likelion_sku?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className=" flex items-center"
            >
              <img src="/assets/images/insta.png" className="w-7" alt="" />
            </a>
            <a href="#" className=" flex items-center mr-6">
              <img src="/assets/images/chat.png" className="w-7" alt="" />
            </a>
          </div>

          <CCBtn isHovered={isHovered} />
          <GoogleLoginBtn isHovered={isHovered} />
        </div>
      </div>
    </div>
  );
}
