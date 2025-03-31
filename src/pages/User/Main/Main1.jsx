export default function Main1() {
  return (
    <div className="relative h-screen w-full">
      {/* 배경 이미지 + 검정색 오버레이 */}
      <div className="absolute inset-0 bg-[url('/assets/images/Main/Main1.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      {/* 글 (이미지 위에 배치) */}
      <div className="relative z-10 flex flex-col justify-center h-full text-white ">
        <div className="font-extrabold text-[65px] leading-[80px] pl-[15%]">
          <p>상상을 현실로 만드는</p>
          <p>
            내 손 안에 <span className="text-[#3B79FF]">스쿠스쿠</span>
          </p>
        </div>
        <div className="leading-[30px] pt-12 pl-[15%]">
          <p className="text-[15px] font-extralight">
            <span className="font-semibold">성결대학교 멋쟁이 사자처럼</span>은
          </p>
          <p className="text-[15px] font-extralight">
            자신이 원하는 IT 서비스를 구현하고 싶은 성결대학교 학생들이 모인
            동아리입니다.
          </p>
        </div>
      </div>
      {/* 스크롤다운 */}
      <div className="relative z-10 flex flex-col items-center bottom-[15%] ">
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
