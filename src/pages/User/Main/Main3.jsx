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
      desc: "공부하고 싶은 트랙을 함께 공부하며\n지식을 습득할 수 있는 학습의 장이 마련됩니다.",
      img: "/assets/images/Main/Main3_3.png",
      place: "성결대학교 성결관",
      time: "스터디 별로 상이",
      note: "(스쿠스쿠 사이버캠퍼스 내 일정 참고)",
    },
    {
      title: "상상을 현실로 만드는 ",
      highlight: "해커톤",
      desc: "공부하고 싶은 트랙을 함께 공부하며\n지식을 습득할 수 있는 학습의 장이 마련됩니다.",
      img: "/assets/images/Main/Main3_4.png",
      place: "성결대학교 성결관",
      time: "스터디 별로 상이",
      note: "(스쿠스쿠 사이버캠퍼스 내 일정 참고)",
    },
    {
      title: "하계 ",
      highlight: "MT",
      desc: "공부하고 싶은 트랙을 함께 공부하며\n지식을 습득할 수 있는 학습의 장이 마련됩니다.",
      img: "/assets/images/Main/Main3_5.png",
      place: "성결대학교 성결관",
      time: "스터디 별로 상이",
      note: "(스쿠스쿠 사이버캠퍼스 내 일정 참고)",
    },
  ];
  return (
    <div>
      {/* 멋사에서 진행되는 프로그램을 소개합니다 */}
      <div className="hidden sm:flex bg-[#0E0E0E] text-white h-[300px] justify-center items-center text-[20px]">
        <p className="fontThin">
          멋쟁이사자처럼 13기에서 진행되는{" "}
          <span className="fontBold">프로그램</span>을 소개합니다
        </p>
      </div>

      {/* @2025 PROGRAM info  */}
      <div className="bg-[#1B1B1B] sm:py-20 py-12 pb-40 space-y-20">
        <p className="text-[#9ABFFF] fontSB text-center sm:text-[18px] text-[9px]">
          @2025 PROGRAM info
        </p>
        <div className="max-w-4xl mx-auto sm:space-y-40">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="grid grid-cols-2 sm:gap-32 items-center text-white"
            >
              {(idx % 2 === 0 || window.innerWidth < 640) && (
                <img src={program.img} className="rounded-[15px]" />
              )}
              <div className="flex flex-col p-4 space-y-6">
                <p className="sm:text-[30px] fontSB text-[12px]">
                  {program.title}
                  <span className="text-[#72A6FF]">{program.highlight}</span>
                </p>
                <p className="text-[#E5E5E5] fontThin text-[15px] whitespace-pre-line">
                  {program.desc}
                </p>
                <div className="text-[13px]">
                  <div className="flex items-center">
                    <img
                      src="../../../public/assets/images/Main/place.png"
                      alt=""
                      className="w-2.5"
                    />
                    <p className="ml-2 text-[#E5E5E5] fontThin">
                      {program.place}
                    </p>
                  </div>
                  <div className="flex items-center mt-0.5">
                    <img
                      src="../../../public/assets/images/Main/date.png"
                      alt=""
                      className="w-3"
                    />
                    <p className="ml-2 text-[#E5E5E5] fontThin">
                      {program.time}{" "}
                      {program.note && (
                        <span className="text-[12px]">{program.note}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {idx % 2 === 1 && window.innerWidth >= 640 && (
                <img src={program.img} className="rounded-[15px]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
