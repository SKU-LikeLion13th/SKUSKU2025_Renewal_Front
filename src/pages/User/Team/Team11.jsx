import React from "react";
import TeamSection from "./TeamSection";
import images from "../../../utils/images";

export default function Team11() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center xl:justify-start">
        <div className="w-full xl:w-1/2">
          <TeamSection title="대표/부대표" members={leader} isCompact={true} />
        </div>
      </div>

      <div className="w-full">
        <TeamSection title="백엔드팀" members={backend} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TeamSection title="프론트엔드팀" members={frontend} />
        <TeamSection title="기획팀" members={design} />
      </div>
    </div>
  );
}

const leader = [
  {
    name: "김현준",
    role: "대표",
    department: "산업경영공학과 17",
    img: `${images.김현준}`,
    imgWidth: "130px",
    imgHeight: "130px",
    imgMarginTop: "-15px",
  },
  {
    name: "주영민",
    role: "부대표",
    department: "미디어소프트웨어학과 17",
    img: `${images.주영민}`,
    imgWidth: "115px",
    imgHeight: "115px",
    imgMarginRight: "-15px",
  },
];

const design = [
  {
    name: "이원경",
    role: "파트장",
    department: "국어국문학과 22",
    img: `${images.이원경}`,
    imgWidth: "115px",
    imgHeight: "115px",
    imgMarginRight: "-10px",
  },
];

const frontend = [
  {
    name: "노승희",
    role: "대표",
    department: "미디어소프트웨어학과 20",
    img: `${images.노승희}`,
    imgWidth: "130px",
    imgHeight: "130px",
    imgMarginRight: "-15px",
  },
];

const backend = [
  {
    name: "천민우",
    role: "운영진",
    department: "컴퓨터공학과 19",
    img: `${images.천민우}`,
    imgWidth: "120px",
    imgHeight: "120px",
  },
  {
    name: "정택원",
    role: "부대표",
    department: "컴퓨터공학과 19",
    img: `${images.정택원}`,
    imgWidth: "105px",
    imgHeight: "105px",
  },
  {
    name: "남민지",
    role: "운영진",
    department: "컴퓨터공학과 21",
    img: `${images.남민지}`,
    imgWidth: "115px",
    imgHeight: "115px",
    imgMarginRight: "-10px",
  },
];
