import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// 개별 카드 컴포넌트로 분리
function AnimatedCard({ title, desc, imgSrc, imgClass, bgColor }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-1 min-w-0 sm:max-w-[26%] w-full h-auto sm:h-48 aspect-[4/3] sm:aspect-auto rounded-sm sm:rounded-xl items-center justify-evenly px-2 sm:px-3 py-2"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-col justify-center gap-1 sm:gap-2 text-left overflow-hidden">
        <p className="fontSB text-[11px] sm:text-[clamp(11px,2.9vw,26px)] truncate">
          {title}
        </p>
        {/* <div className="hidden lg:block fontEL text-sm break-words leading-5"> */}
        <div className="hidden lg:block fontEL leading-5 break-words text-[clamp(8px,2vw,15px)]">
          {desc}
        </div>
      </div>
      <img src={imgSrc} alt={title} className={`${imgClass} shrink-0`} />
    </motion.div>
  );
}

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
      // imgClass: "lg:w-15 md:w-13 sm:w-10 w-6",
      imgClass: "w-[clamp(24px,5vw,60px)]",
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
      // imgClass: "lg:w-26 md:w-20 sm:w-12 w-8",
      imgClass: "w-[clamp(40px,7vw,90px)]",
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
      // imgClass: "lg:w-18 md:w-14 sm:w-10 w-6",
      imgClass: "w-[clamp(24px,5vw,60px)]",
      bgColor: "#142F69",
    },
  ];

  return (
    <div className="relative sm:min-h-screen h-[250px] w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      {/* 배경 이미지 + 검정색 오버레이 */}
      <div className="absolute inset-0 sm:bg-[url('/assets/images/Main/Main2.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      <div className="relative flex flex-col justify-center h-full text-white items-center sm:space-y-30 sm:pt-32 py-16 space-y-3">
        {/* 3가지 방향성 */}
        <div className="text-center sm:block flex flex-row justify-center items-center gap-1">
          <p className="sm:text-[clamp(9px,2.9vw,16px)] text-[11px] fontThin">
            성결대학교 멋쟁이사자처럼의
          </p>
          <p className="sm:text-[clamp(20px,2.9vw,30px)] text-[12px] fontSB">
            3가지 방향성
          </p>
        </div>
        {/* 모토 */}
        <p className="sm:hidden text-[9px] fontEL">
          "내 아이디어를 내 손으로 실현한다."
        </p>
        {/* 박스 3개 */}
        <div className="flex flex-wrap w-full px-4 sm:px-0 justify-center gap-x-2 gap-y-4 sm:gap-x-6 sm:gap-y-6 mt-2">
          {items.map(({ title, desc, imgSrc, imgClass, bgColor }, idx) => (
            <AnimatedCard
              key={idx}
              title={title}
              desc={desc}
              imgSrc={imgSrc}
              imgClass={imgClass}
              bgColor={bgColor}
            />
          ))}
        </div>

        {/* 글 */}
        <div className="text-center hidden sm:block leading-8">
          <p className="fontThin sm:text-[clamp(9px,2.9vw,16px)] ">
            <span className="fontSB text-xl">
              "내 아이디어를 내 손으로 실현한다."{" "}
            </span>
            라는 모토를 가지고,
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
