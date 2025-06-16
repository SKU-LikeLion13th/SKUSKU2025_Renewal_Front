export default function Main3() {
  const programs = [
    {
      title: "함께 공부하는 ",
      highlight: "스터디",
      desc: "공부하고 싶은 트랙을 함께 공부하며\n지식을 습득할 수 있는 학습의 장이 마련됩니다.",
      img: "/assets/images/Main/Main3_1.png",
      place: "성결대학교 성결관",
      time: "스터디 별로 상이",
      note: "(스쿠스쿠 사이버캠퍼스 내 일정 참고)",
    },
    {
      title: "세분화된 교육, ",
      highlight: "정기세션",
      desc: "아기사자들에게 트랙별로 교육을 제공합니다.\n매주 정기세션에서 아기사자들과 운영진이 함께 성장합니다.",
      img: "/assets/images/Main/Main3_2.png",
      place: "성결대학교 성결관",
      time: "매주 목요일 18시-21시",
    },
    {
      title: "서비스의 초석 ",
      highlight: "아이디어톤",
      desc: "서비스 아이디어를 다듬고 실현 가능성을 테스트하는 시간입니다.\n열정적인 토론과 발표로 아이디어의 깊이를 더합니다.",
      img: "/assets/images/Main/Main3_3.png",
      place: "성결대학교 성결관",
      time: "스터디 별로 상이",
      note: "(스쿠스쿠 사이버캠퍼스 내 일정 참고)",
    },
    {
      title: "상상을 현실로 만드는 ",
      highlight: "해커톤",
      desc: "주어진 시간 내에 팀을 이뤄 서비스를 기획/개발합니다.\n실전 감각을 익히고 팀워크를 높이는 경험을 제공합니다.",
      img: "/assets/images/Main/Main3_4.png",
      place: "성결대학교 성결관",
      time: "스터디 별로 상이",
      note: "(스쿠스쿠 사이버캠퍼스 내 일정 참고)",
    },
    {
      title: "하계 ",
      highlight: "MT",
      desc: "팀워크를 다지는 특별한 시간!\n친목과 소통을 통해 끈끈한 유대감을 형성합니다.",
      img: "/assets/images/Main/Main3_5.png",
      place: "성결대학교 외부 장소",
      time: "방학 중 진행",
    },
  ];

  return (
    <div>
      {/* 소개 문구 */}
      <div className="hidden sm:flex bg-[#0E0E0E] text-white h-[300px] justify-center items-center text-[20px]">
        <p className="fontThin">
          멋쟁이사자처럼 13기에서 진행되는{" "}
          <span className="fontBold">프로그램</span>을 소개합니다
        </p>
      </div>

      {/* 본문 */}
      <div className="bg-[#1B1B1B] sm:py-20 py-12 sm:pb-40 pb-10 space-y-20">
        <p className="text-[#9ABFFF] fontSB text-center sm:text-[18px] text-[9px]">
          @2025 PROGRAM info
        </p>

        <div className="max-w-6xl mx-auto sm:flex sm:flex-col max-sm:grid max-sm:grid-cols-2 max-sm:gap-2 gap-20 sm:gap-40">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className={`flex flex-col sm:flex-row items-center ${
                idx % 2 === 1 ? "sm:flex-row-reverse" : ""
              } gap-6 sm:gap-32`}
            >
              <img
                src={program.img}
                alt={program.highlight}
                className="w-40 sm:w-[45%] sm:rounded-[15px] rounded-sm"
              />
              <div className="flex-1 text-white space-y-4 sm:space-y-6 sm:px-4 ">
                <p className="text-[12px] sm:text-[30px] fontSB">
                  {program.title}
                  <span className="text-[#72A6FF]">{program.highlight}</span>
                </p>
                <p className="hidden sm:block text-[#E5E5E5] fontThin text-[11px] sm:text-[15px] whitespace-pre-line">
                  {program.desc}
                </p>
                <div className="hidden sm:block text-[11px] sm:text-[13px] text-[#E5E5E5] fontThin space-y-1">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/images/Main/place.png"
                      alt="장소"
                      className="w-3"
                    />
                    <p>{program.place}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/images/Main/date.png"
                      alt="시간"
                      className="w-3"
                    />
                    <p>
                      {program.time}{" "}
                      {program.note && (
                        <span className="text-[11px] sm:text-[12px]">
                          {program.note}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
