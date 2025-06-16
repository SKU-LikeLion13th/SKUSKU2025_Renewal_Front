export default function Main2() {
  const items = [
    {
      title: "자기주도성",
      desc: (
        <>
          나만의 커리어를 직접 설계하고,
          <br />
          만들어갈 수 있습니다
        </>
      ),
      imgSrc: "/assets/images/Main/Self.png",
      imgClass: "sm:w-20 w-6",
      bgColor: "#4B76D3",
    },
    {
      title: "협력성",
      desc: (
        <>
          동료들과 개발 고민을 함께
          <br />
          협력하고 공유하며,
          <br />
          성장할 수 있습니다.
        </>
      ),
      imgSrc: "/assets/images/Main/cooperation.png",
      imgClass: "sm:w-20 w-8",
      bgColor: "#264C9F",
    },
    {
      title: "가능성",
      desc: (
        <>
          나만의 커리어를 직접 설계하고,
          <br />
          만들어갈 수 있습니다
        </>
      ),
      imgSrc: "/assets/images/Main/Possibility.png",
      imgClass: "sm:w-20 w-6",
      bgColor: "#142F69",
    },
  ];
  return (
    <div className="relative sm:h-screen h-[250px] w-full">
      {/* 배경 이미지 + 검정색 오버레이 */}
      <div className="absolute inset-0 sm:bg-[url('/assets/images/Main/Main2.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      <div className="relative flex flex-col justify-center h-full text-white items-center sm:space-y-30 sm:pt-32 py-16 space-y-3">
        {/* 3가지 방향성 */}
        <div className="text-center sm:block flex flex-row justify-center items-center gap-1">
          <p className="sm:text-[21px] sm:fontEL text-[11px] fontEL">
            성결대학교 멋쟁이 사자처럼의
          </p>
          <p className="sm:text-[40px] sm:fontSB text-[12px] fontBold">
            3가지 방향성
          </p>
        </div>
        {/* 모토 */}
        <p className="sm:hidden text-[9px] fontEL">
          "내 아이디어를 내 손으로 실현한다."
        </p>
        {/* 박스 3개 */}
        <div className="flex sm:space-x-20 space-x-2 mt-2">
          {items.map(({ title, desc, imgSrc, imgClass, bgColor }, idx) => (
            <div
              key={idx}
              className="flex sm:w-100 sm:h-50 w-28 h-16 sm:rounded-xl rounded-sm items-center justify-evenly"
              style={{ backgroundColor: bgColor }}
            >
              <div className="flex flex-col items-around">
                <p className="sm:fontBold sm:text-[35px] text-[11px]">
                  {title}
                </p>
                <p className="hidden sm:block sm:fontEL sm:text-[13px]">
                  {desc}
                </p>
              </div>
              <img src={imgSrc} alt={title} className={imgClass} />
            </div>
          ))}
        </div>
        {/* 글 */}
        <div className="text-center hidden sm:block">
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
