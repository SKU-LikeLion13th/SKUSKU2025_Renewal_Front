export default function Main2() {
  return (
    <div className="relative h-screen w-full">
      {/* 배경 이미지 + 검정색 오버레이 */}
      <div className="absolute inset-0 bg-[url('/assets/images/Main/Main2.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      <div className="relative flex flex-col justify-center h-full text-white items-center space-y-30 pt-32">
        {/* 3가지 방향성 */}
        <div className="text-center">
          <p className="text-[21px] fontEL">성결대학교 멋쟁이 사자처럼의</p>
          <p className="text-[40px] fontSB">3가지 방향성</p>
        </div>
        {/* 박스 3개 */}
        <div className="flex space-x-20">
          <div className="flex bg-[#4B76D3] w-100 h-50 rounded-xl items-center justify-evenly">
            <div className="flex flex-col items-around">
              <p className="fontBold text-[35px]">자기주도성</p>
              <p className="fontEL text-[13px]">
                나만의 커리어를 직접 설계하고,
                <br />
                만들어갈 수 있습니다
              </p>
            </div>
            <img src="/assets/images/Main/Self.png" alt="" className="w-20" />
          </div>
          <div className="flex bg-[#264C9F] w-100 h-50 rounded-xl items-center justify-evenly">
            <div className="flex flex-col items-around">
              <p className="fontBold text-[35px]">협력성</p>
              <p className="fontEL text-[13px]">
                동료들과 개발 고민을 함께
                <br />
                협력하고 공유하며,
                <br />
                성장할 수 있습니다.
              </p>
            </div>
            <img
              src="/assets/images/Main/cooperation.png"
              alt=""
              className="w-32"
            />
          </div>
          <div className="flex bg-[#142F69] w-100 h-50 rounded-xl items-center justify-evenly">
            <div className="flex flex-col items-around">
              <p className="fontBold text-[35px]">가능성</p>
              <p className="fontEL text-[13px]">
                나만의 커리어를 직접 설계하고,
                <br />
                만들어갈 수 있습니다
              </p>
            </div>
            <img
              src="/assets/images/Main/Possibility.png"
              alt=""
              className="w-20"
            />
          </div>
        </div>
        {/* 글 */}
        <div className="text-center">
          <p className="fontThin">
            <span className="fontSB">"내 아이디어를 내 손으로 실현한다.</span>
            "라는 모토를 가지고,
          </p>
          <p className="fontThin">
            실제 서비스를 구현하며 개발자의 꿈을 이루는데
          </p>
          <p className="fontThin">한걸음 더 다가가고자 합니다.</p>
        </div>
      </div>
    </div>
  );
}
