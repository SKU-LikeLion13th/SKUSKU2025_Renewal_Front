import React, { forwardRef, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 2,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export const ProgramCard = forwardRef(function ProgramCard(props, _ref) {
  const { program, idx } = props;
  const localRef = useRef(null);
  const isInView = useInView(localRef, { threshold: 0.3 });

  // Optional: 외부 ref도 연결
  useEffect(() => {
    if (typeof _ref === "function") {
      _ref(localRef.current);
    } else if (_ref) {
      _ref.current = localRef.current;
    }
  }, [_ref]);

  return (
    <motion.div
      ref={localRef}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-col sm:flex-row items-center ${
        idx % 2 === 1 ? "sm:flex-row-reverse" : ""
      } gap-4 sm:gap-20`}
    >
      <img
        src={program.img}
        alt={program.highlight}
        className="w-38 sm:w-[45%] sm:rounded-[15px] rounded-sm"
      />
      <div className="flex-1 text-white space-y-4 sm:space-y-6 sm:px-4">
        <p className="text-[12px] sm:text-[18px] md:text-[32px] fontSB">
          {program.title}
          <span className="text-[#72A6FF]">{program.highlight}</span>
        </p>
        <p className="hidden sm:block text-[#E5E5E5] fontThin text-[11px] sm:text-[12px] md:text-[15px] whitespace-pre-line">
          {program.desc}
        </p>
        <div className="hidden sm:block text-[11px] sm:text-[12px] md:text-[13px] text-[#E5E5E5] fontThin space-y-1">
          <div className="flex items-center gap-2">
            <img src="/assets/images/Main/place.png" alt="장소" className="w-3" />
            <p>{program.place}</p>
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/images/Main/date.png" alt="시간" className="w-3" />
            <p>
              {program.time}{" "}
              {program.note && (
                <span className="text-[11px] sm:text-[12px]">{program.note}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
