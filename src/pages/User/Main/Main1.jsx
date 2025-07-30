import { motion } from "framer-motion";
import axios from "axios";
import API from "../../../utils/axios";
import CCBtn from "../../../components/CCBtn";
import GoogleLoginBtn from "../../../components/GoogleLoginBtn";
import { useAuth } from "../../../utils/AuthContext";

export default function Main1() {
  const { user, logout } = useAuth();
  const handleClick = async () => {
    try {
      const res = await API.get("/log/status");
      const user = res.data;

      if (user.role === "ADMIN_LION") {
        window.location.href = "/admin";
      } else {
        alert("관리자 권한이 없습니다.");
      }
    } catch (err) {
      alert("로그인이 필요합니다.");
    }
  };

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
    <div className="relative h-screen w-full overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      {/* 모바일 배경 */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat sm:hidden bg-cover bg-no-repeat sm:bg-cover bg-[position:-200px_center] md:bg-[position:-150px_center] lg:bg-[position:-2000px_center]"
        style={{
          backgroundImage: "url('/assets/images/Mobile_Main/Main1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      {/* 데스크탑 배경 */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat hidden sm:block"
        style={{ backgroundImage: "url('/assets/images/Main/Main1.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      {/* 글 (이미지 위에 배치) */}
      <div className="relative flex flex-col justify-center h-full text-white ">
        <div className="sm:font-extrabold fontSBold text-[28px] sm:leading-[80px] sm:pl-[15%] pl-6 sm:text-[65px] leading-[35px]">
          <p>상상을 현실로 만드는</p>
          <p>
            내 손 안에{" "}
            <span className="text-[#3B79FF] block sm:inline fontMedium ">
              스쿠스쿠
            </span>
          </p>
        </div>

        <div className="sm:leading-[30px] sm:pt-12 pt-6 sm:pl-[15%] pl-6">
          <p className="sm:text-[15px] fontEL text-[9px]">
            <span className="fontSB">성결대학교 멋쟁이 사자처럼</span>은
          </p>
          <p className="sm:text-[15px] fontEL text-[9px]">
            자신이 원하는 <span onClick={handleClick}>IT</span> 서비스를
            구현하고 싶은 성결대학교 학생들이 모인 동아리입니다.
          </p>
        </div>

        <div className="xl:hidden flex mt-24 justify-center items-center px-6 w-full">
          <div className="flex flex-col justify-center items-center gap-4">
            {/* 로그인 ㅇ */}
            {user ? (
              <>
                <div
                  className={`flex items-center justify-center text-white`} // 기본 흰색 글씨
                >
                  <div className="flex items-center">
                    <div
                      style={{ backgroundColor: getColorByTrack(user.track) }}
                      className="flex items-center justify-center w-[20px] sm:w-[25px] md:w-[30px] lg:w-[35px] h-[20px] sm:h-[25px] md:h-[30px] lg:h-[35px] h-auto rounded-full text-[10px] sm:text-[14px] md:text-[16px] lg:text-[20px]"
                    >
                      🦁
                    </div>
                    <span className="px-1 sm:px-3 text-[10px] sm:text-[14px] md:text-[16px] lg:text-[20px]">
                      {user.track}
                    </span>
                    <span className="fontBold text-[10px] sm:text-[14px] md:text-[16px] lg:text-[20px]">
                      {user.name}님
                    </span>
                  </div>
                  <div className="px-1 sm:px-2 text-[gray]">|</div>
                  <button
                    onClick={logout}
                    className="text-[10px] sm:text-[14px] md:text-[16px] lg:text-[20px]"
                  >
                    LOGOUT
                  </button>
                </div>
                <div className="lg:w-[250px] md:w-[200px] sm:w-[180px] w-[125px] h-auto text-[5px] flex justify-center">
                  <CCBtn textSize="lg:text-[18px] md:text-[15px] text-[10px]" />
                </div>
              </>
            ) : (
              // 로그인 ㄴ
              <div className="flex flex-row space-x-3 items-center">
                <div className="lg:w-[250px] md:w-[200px] w-[125px] h-auto text-[5px]">
                  <CCBtn textSize="lg:text-[18px] md:text-[15px] text-[10px]" />
                </div>
                <div className="lg:w-[250px] md:w-[200px] w-[150px]">
                  <GoogleLoginBtn textSize="lg:text-[18px] md:text-[15px] text-[10px]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 스크롤다운 (sm 이상일 때만 보임) */}
      <div className="relative sm:flex hidden flex-col items-center bottom-[15%]">
        <p className="fontSB text-md text-[#666666] flex items-center">
          Scroll down
        </p>
        <motion.img
          src="/assets/images/Mouse.png"
          alt="마우스 모양"
          className="w-[35px] mt-2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
