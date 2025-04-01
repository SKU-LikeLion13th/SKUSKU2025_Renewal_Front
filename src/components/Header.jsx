import { useState } from "react";

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`fixed z-10 top-0 w-full ${
        isHovered ? "bg-white min-h-[230px]" : ""
      } transition-all duration-300 `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex py-5 px-12 items-center justify-between mx-auto relative shadow-[0px_0.5px_0px_0px_rgba(217,217,217,1)]">
        {/* 왼쪽 */}
        <div className="flex space-x-12">
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
          <div className="flex items-center space-x-16">
            <div
              className={`fontMedium text-[16px] ${
                isHovered ? "text-[#000]" : "text-white"
              } cursor-pointer relative`}
            >
              PROJECT
              {isHovered && (
                <div className="absolute w-full space-y-6 mt-12">
                  <div className="text-[16px] text-[#121212] text-center fontRegular">
                    12기
                  </div>
                  <div className="text-[16px] text-[#121212] text-center fontRegular">
                    11기
                  </div>
                </div>
              )}
            </div>
            <div
              className={`fontMedium text-[16px] ${
                isHovered ? "text-[#000]" : "text-white"
              } cursor-pointer relative`}
            >
              TEAM
              {isHovered && (
                <div className="absolute w-full space-y-6 mt-12">
                  <div className="text-[16px] text-[#121212] text-center fontRegular">
                    12기
                  </div>
                  <div className="text-[16px] text-[#121212] text-center fontRegular">
                    11기
                  </div>
                </div>
              )}
            </div>
            <div
              className={`fontMedium text-[16px] ${
                isHovered ? "text-[#000]" : "text-white"
              } cursor-pointer relative`}
            >
              COMMUNITY
              {isHovered && (
                <div className="absolute w-full mt-12 ">
                  <div className="text-[16px] text-[#121212] text-center fontRegular">
                    문의사항
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex space-x-4">
          <div
            className={`flex text-white items-center px-4 py-2 rounded-sm ${
              isHovered ? "bg-[#8DB7FF]" : "bg-[#2D5ABB]"
            }`}
          >
            <img
              src="../../../public/assets/images/campus.png"
              alt=""
              width={"16px"}
              className="mr-2"
            />
            <p className="text-[14px]">CYBERCAMPUS</p>
          </div>
          <div
            className={`flex text-white bg-white/50 items-center px-4 py-2 rounded-sm ${
              isHovered ? "border-1 border-[#000]" : ""
            }`}
          >
            <img
              src="../../../public/assets/images/googleLogin.png"
              alt=""
              width={"16px"}
              className="mr-2"
            />
            <p
              className={`text-[13px]  ${
                isHovered ? "text-[#000] " : "text-[#fff]"
              }`}
            >
              구글계정으로 계속하기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
