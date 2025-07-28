import React, { useState, useEffect, useRef } from "react";
import { ProgramCard } from "../../../components/ProgramCard";

const useInView = (options) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      options
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, inView];
};

const TypingTextComponent = ({ fullText, highlightText, frame, flag, className = "" }) => {
  const [typingText, setTypingText] = useState("");
  const textIndex = useRef(0);
  const lastTimeStamp = useRef(null);
  const animationFrameId = useRef(null);

  const animate = (timeStamp) => {
    if (!lastTimeStamp.current) lastTimeStamp.current = timeStamp;
    const elapsed = timeStamp - lastTimeStamp.current;

    if (elapsed > frame) {
      lastTimeStamp.current = timeStamp;

      setTypingText((prev) => {
        if (textIndex.current >= fullText.length) return prev;
        const nextText = prev + fullText[textIndex.current];
        textIndex.current += 1;
        return nextText;
      });
    }

    if (textIndex.current < fullText.length) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (flag) {
      textIndex.current = 0;
      lastTimeStamp.current = null;
      setTypingText("");
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      setTypingText("");
      textIndex.current = 0;
      lastTimeStamp.current = null;
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [flag, fullText, frame]);

  // 강조 텍스트가 포함된 상태에서 렌더링할 때는 이렇게 분할해서 하이라이트 처리
  const renderWithHighlight = () => {
    if (!typingText) return null;

    const highlightStart = typingText.indexOf(highlightText);
    if (highlightStart === -1) {
      // 아직 강조 텍스트가 안나왔거나 완성 안된 경우 그냥 전체 출력
      return typingText;
    }

    // 강조 텍스트 앞/강조/강조 뒤로 분할
    const before = typingText.slice(0, highlightStart);
    const highlight = typingText.slice(highlightStart, highlightStart + highlightText.length);
    const after = typingText.slice(highlightStart + highlightText.length);

    return (
      <>
        {before}
        <span className="fontBold ml-1.5">{highlight}</span>
        {after}
      </>
    );
  };

  return <p className={className}>{renderWithHighlight()}</p>;
};

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

  const beforeText = "멋쟁이사자처럼 13기에서 진행되는 ";
  const highlightText = "프로그램";
  const afterText = "을 소개합니다.";
  const fullText = beforeText + highlightText + afterText;

  const [textRef, inView] = useInView({ threshold: 0.5 });

  return (
    <div>
      <div
        ref={textRef}
        className="hidden sm:flex bg-[#0E0E0E] text-white h-[300px] justify-center items-center text-[16px] sm:text-[20px] lg:text-[24px]"
      >
        <TypingTextComponent
          fullText={fullText}
          highlightText={highlightText}
          frame={50}
          flag={inView}
          className="fontThin flex"
        />
      </div>

      <div className="px-4 sm:px-8 md:px-16 lg:px-14 xl:px-18 bg-[#1B1B1B] sm:py-20 py-12 sm:pb-40 pb-10 space-y-20">
        <p className="text-[#9ABFFF] fontSB text-center text-[9px] sm:text-[14px] md:text-[18px]">
          @2025 PROGRAM info
        </p>

        <div className="max-w-5xl mx-auto sm:flex sm:flex-col max-sm:grid max-sm:grid-cols-2 sm:gap-25">
          {programs.map((program, idx) => (
            <ProgramCard key={idx} program={program} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
