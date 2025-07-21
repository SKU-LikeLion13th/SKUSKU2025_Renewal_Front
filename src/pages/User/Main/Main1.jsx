export default function Main1() {
  return (
    <div className="relative sm:h-screen w-full h-[400px] overflow-hidden">
      {/* 배경 이미지 + 검정색 오버레이 */}
      <div className="absolute inset-0 sm:bg-[url('/assets/images/Main/Main1.jpeg')] bg-[url('/assets/images/Mobile_Main/Main1.jpg')] bg-cover bg-no-repeat sm:bg-cover bg-left sm:w-full w-[700px]">
        <div className="absolute inset-0 bg-black opacity-80"></div>$
      </div>

      {/* 글 (이미지 위에 배치) */}
      <div className="relative  flex flex-col justify-center h-full text-white ">
        <div className="sm:font-extrabold fontThin text-[28px] sm:leading-[80px] sm:pl-[15%] pl-6 sm:text-[65px] leading-[35px]">
          <p>상상을 현실로 만드는</p>
          <p>
            내 손 안에
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
            자신이 원하는 IT 서비스를 구현하고 싶은 성결대학교 학생들이 모인
            동아리입니다.
          </p>
        </div>
      </div>

      {/* 스크롤다운 (sm 이상일 때만 보임) */}
      <div className="relative sm:flex hidden flex-col items-center bottom-[15%]">
        <p className="fontSB text-md text-[#666666] flex items-center">
          Scroll down
        </p>
        <img
          src="../../../public/assets/images/Mouse.png"
          alt="마우스 모양"
          className="w-[35px] mt-2"
        />
      </div>
    </div>
  );
}
