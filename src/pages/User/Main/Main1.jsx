import { motion } from "framer-motion";
import axios from "axios";
import API from "../../../utils/axios";
import CCBtn from "../../../components/CCBtn";
import GoogleLoginBtn from "../../../components/GoogleLoginBtn";

export default function Main1() {
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

  return (
    <div className="relative sm:h-screen w-full h-[400px] overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      {/* 배경 이미지 + 검정색 오버레이 */}
      <div className="absolute inset-0 sm:bg-[url('/assets/images/Main/Main1.jpeg')] bg-[url('/assets/images/Mobile_Main/Main1.jpg')] bg-cover bg-no-repeat sm:bg-cover bg-left sm:w-full w-[700px]">
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
        <div className="xl:hidden flex mt-16 flex space-x-3 justify-center items-center px-6 w-full">
          <div className="lg:w-[250px] md:w-[200px] w-[125px] h-auto text-[5px]">
            <CCBtn textSize="lg:text-[20px] md:text-[15px] text-[10px]" />
          </div>
          <div className="lg:w-[250px] md:w-[200px] w-[150px]">
            <GoogleLoginBtn textSize="lg:text-[20px] md:text-[15px] text-[10px]" />
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
