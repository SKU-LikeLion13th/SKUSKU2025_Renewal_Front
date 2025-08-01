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
        className="absolute inset-0 bg-cover bg-no-repeat sm:hidden sm:bg-cover bg-[position:-200px_center] md:bg-[position:-150px_center] lg:bg-[position:-2000px_center]"
        style={{
          backgroundImage: "url('/assets/images/Mobile_Main/Main1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      {/* 데스크탑 배경 */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat hidden sm:block bg-center"
        style={{ backgroundImage: "url('/assets/images/Main/Main1.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      {/* 글 (이미지 위에 배치) */}
      <div className="relative flex flex-col justify-center h-full mt-3 text-white ">
        <div className="fontSB text-[28px] sm:leading-[clamp(3rem,4.3vw,4rem)] sm:pl-[8%] pl-6 sm:text-[clamp(28px,2.9vw,3rem)]">
          <p>상상을 현실로 만드는</p>
          <p>
            내 손 안에{" "}
            <span className="text-[#3B79FF] block sm:inline ">스쿠스쿠</span>
          </p>
        </div>

        <div className="sm:leading-[30px] sm:pt-9 pt-6 sm:pl-[8%] pl-6 sm:text-[clamp(9px,2.9vw,16px)] fontThin text-[9px]">
          <p>
            <span className="fontSB">성결대학교 멋쟁이사자처럼</span>은
          </p>
          <p>
            자신이 원하는 <span onClick={handleClick}>IT</span> 서비스를
            구현하고 싶은 성결대학교 학생들이 모인 동아리입니다.
          </p>
        </div>

        <div className="xl:hidden flex lg:mt-24 md:mt-16 sm:mt-12 mt-20 justify-center items-center px-6 w-full">
          <div className="flex flex-col justify-center items-center gap-4">
            {/* 로그인 ㅇ */}
            {user ? (
              <>
                <div
                  className={`flex items-center justify-center text-white text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]`} // 기본 흰색 글씨
                >
                  <div className="flex items-center">
                    <div
                      style={{ backgroundColor: getColorByTrack(user.track) }}
                      className="flex items-center justify-center w-[20px] sm:w-[25px] md:w-[30px] lg:w-[35px] sm:h-[25px] md:h-[30px] lg:h-[35px] h-[20px] rounded-full "
                    >
                      🦁
                    </div>
                    <span className="px-1 sm:px-3">{user.track}</span>
                    <span className="fontBold">{user.name}님</span>
                  </div>
                  <div className="px-1 sm:px-2 text-[gray]">|</div>
                  <button onClick={logout} className="">
                    LOGOUT
                  </button>
                </div>
                <div className="lg:w-[250px] md:w-[200px] sm:w-[180px] w-[125px] h-auto text-[5px] flex justify-center">
                  <CCBtn textSize="lg:text-[15px] md:text-[13px] text-[10px]" />
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
        <p className="fontSB text-sm text-[#666666] flex items-center">
          Scroll down
        </p>
        <motion.img
          src="/assets/images/Mouse.png"
          alt="마우스 모양"
          className="w-[23px] mt-2"
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
