import { useEffect } from "react";

export default function MobileMain4() {
  const track = {
    frontend: {
      title: "프론트엔드",
      subtitle: "FRONT-END",
      color: "#F75222",
      image: "/assets/images/Main/Main4_React.png",
      curri: "/assets/images/Main/front.png",
      description: (
        <>
          <p>React 기반 UI 개발</p>
          <p>상태관리, Tailwind CSS 등</p>
        </>
      ),
    },
    backend: {
      title: "백엔드",
      subtitle: "BACK-END",
      color: "#0ACF83",
      image: "/assets/images/Main/Main4_spring.png",
      curri: "/assets/images/Main/back_.png",
      description: (
        <>
          <p>Java를 활용한 객체지향 개념</p>
          <p>Spring setting & Thymeleaf</p>
          <p>Spring API 통신</p>
          <p>DB Connection & JPA (MYSQL 사용)</p>
        </>
      ),
    },
    design: {
      title: "기획/디자인",
      subtitle: "PM/DESIGN",
      color: "#FF6F71",
      image: "/assets/images/Main/Main4_figma.png",
      curri: "/assets/images/Main/design_.png",
      description: (
        <>
          <p>UX/UI 기획</p>
          <p>Figma 툴 실습</p>
        </>
      ),
    },
  };
  return (
    <div className="my-16">
      {/* TRACKS */}
      <div className="flex flex-col text-center justify-center">
        <p className="text-[#3B79FF] fontBold sm:text-[30px] text-[20px]">
          TRACKS
        </p>
        <p className="fontThin text-[#ffffff] sm:mt-8 mt-2 sm:text-[18px] text-[9px]">
          멋쟁이사자처럼에서 각 트랙별로 세분화된 교육과 경험을 제공합니다.
        </p>
      </div>

      {/* 밑에 박스 3개 */}
      <div className="text-white space-y-16 mt-16">
        {/* 프론트 */}
        <div className="bg-[#262626] p-7 w-[85%] rounded-r-md">
          <div className="text-[#F75222] flex items-center space-x-2">
            <img
              src="/assets/images/Main/Main4_React.png"
              alt=""
              className="w-8"
            />
            <div className="flex items-center space-x-2">
              <span className="text-[11px] fontBold">프론트엔드</span>
              <span className="text-[9px] fontEL">FRONT-END</span>
            </div>
          </div>
          <span className="text-[7px] ml-10 -mt-1 block">
            상상을 현실로 만드는 시작,{" "}
            <span className="text-[#ED410F]">프론트엔드팀 커리큘럼</span>을
            소개합니다.
          </span>
          <div className="flex justify-end mt-6">
            <img src="/assets/images/Main/front.png" alt="" className="w-56" />
          </div>
        </div>
        {/* 백 */}
        <div className="bg-[#262626] p-7 w-[85%] rounded-l-md ml-auto">
          <div className="text-[#F75222] flex items-center space-x-2">
            <img
              src="/assets/images/Main/Main4_React.png"
              alt=""
              className="w-8"
            />
            <div className="flex items-center space-x-2 text-[#0ACF83]">
              <span className="text-[11px] fontBold">백엔드</span>
              <span className="text-[9px] fontEL">BACK-END</span>
            </div>
          </div>
          <span className="text-[7px] ml-10 -mt-1 block">
            상상을 실현시키는 기술,{" "}
            <span className="text-[#00CDCA]">백엔드팀 커리큘럼</span>을
            소개합니다.
          </span>
          <div className="flex justify-end mt-6">
            <img src="/assets/images/Main/back_.png" alt="" className="w-56" />
          </div>
        </div>
        {/* 기디 */}
        <div className="bg-[#262626] p-7 w-[85%] rounded-r-md">
          <div className="text-[#F75222] flex items-center space-x-2">
            <img
              src="/assets/images/Main/Main4_React.png"
              alt=""
              className="w-8"
            />
            <div className="flex items-center space-x-2 text-[#FF6F71]">
              <span className="text-[11px] fontBold">디자인</span>
              <span className="text-[9px] fontEL">PM/DESIGN</span>
            </div>
          </div>
          <span className="text-[7px] ml-10 -mt-1 block">
            상상을 현실로 만드는 똑똑한 디자인,{" "}
            <span className="text-[#EA4E75]">디자인팀 커리큘럼</span>을
            소개합니다.
          </span>
          <div className="flex justify-end mt-6">
            <img
              src="/assets/images/Main/design_.png"
              alt=""
              className="w-56"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
