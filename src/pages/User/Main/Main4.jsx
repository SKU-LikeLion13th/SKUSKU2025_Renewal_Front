import { useEffect, useRef, useState } from "react";

export default function Main4() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // 상세 화면이 열려 있고, 클릭한 대상이 상세 영역 바깥이라면 초기화
      if (
        selectedTrack &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setSelectedTrack(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedTrack]);

  const trackDetails = {
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
    <div className="bg-[#121212] py-[8%] flex flex-col items-center transition-all duration-500 ease-in-out">
      {/* 상단 타이틀 영역 */}
      <div className="flex flex-col text-center justify-center">
        <p className="text-[#3B79FF] fontBold sm:text-[30px] text-[20px]">
          TRACKS
        </p>
        <p className="fontThin text-[#ffffff] sm:mt-8 mt-2 sm:text-[18px] text-[9px]">
          멋쟁이사자처럼에서 각 트랙별로 세분화된 교육과 경험을 제공합니다.
        </p>
        <p
          className={`fontMedium mt-4 transition-opacity duration-500 text-white ${
            selectedTrack ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          상상을 현실로 만드는 시작,{" "}
          <span
            className="font-semibold"
            style={{
              color: selectedTrack
                ? trackDetails[selectedTrack].color
                : "transparent",
            }}
          >
            {trackDetails[selectedTrack]?.title ?? ""}
          </span>
          팀 커리큘럼을 소개합니다.
        </p>
      </div>

      {/* 트랙 영역 */}
      <div className="bg-[#262626] mt-10 w-full h-[160px] flex items-center justify-center text-white">
        {!selectedTrack ? (
          <div className="flex justify-evenly w-full px-10">
            {Object.entries(trackDetails).map(([key, value]) => (
              <div
                key={key}
                className={`flex items-center cursor-pointer transition-transform duration-300 hover:scale-105 ${
                  key === "frontend"
                    ? "hover:text-[#F75222]"
                    : key === "backend"
                    ? "hover:text-[#0ACF83]"
                    : "hover:text-[#FF6F71]"
                }`}
                onClick={() => setSelectedTrack(key)}
              >
                <img
                  src={value.image}
                  className="w-12 mr-4"
                  alt={`${value.title}`}
                />
                <div>
                  <span className="text-[18px]">{value.title}</span>
                  <span className="ml-3 fontEL text-[12px]">
                    {value.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`flex items-center text-center justify-evenly h-[160px] w-full ${
              selectedTrack === "frontend"
                ? "bg-[#B74321]"
                : selectedTrack === "backend"
                ? "bg-[#1C7674]"
                : "bg-[#CF637E]"
            }`}
            ref={containerRef}
          >
            <div className="flex">
              <img
                src={trackDetails[selectedTrack].image}
                className="w-12 mr-4 "
                alt=""
              />
              <div className="text-center flex items-center">
                <p className="text-[20px] font-semibold">
                  {trackDetails[selectedTrack].title}
                </p>
                <p className="text-[14px] ml-2">
                  {trackDetails[selectedTrack].subtitle}
                </p>
              </div>
            </div>
            <img
              className={`text-[16px] md:w-[50%] ${
                selectedTrack === "backend" ? "w-[900px]" : "w-[700px]"
              }`}
              src={trackDetails[selectedTrack].curri}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
}
