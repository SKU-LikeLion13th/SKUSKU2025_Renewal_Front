import React from "react";
import { Link, useLocation } from "react-router-dom";

const pathMap = {
  cybercampus: "사이버캠퍼스",
  lecture_detail: "강의자료",
  assignment_detail: "과제",
  admin: "관리자",
  quiz: "퀴즈",
  LectureEdit: "자료 수정",
  LectureUpload: "자료 업로드",
  reviewUpdate: "복습 퀴즈 수정",
  reviewAdd: "복습 퀴즈 추가",
  add: "과제 등록",
  babylions: " 아기사자 채점",
  submit: "과제 제출",
};

const sectionMap = {
  lecture: "자료실",
  assignment: "과제 목록",
  assignmentCheck: "과제 채점",
  review: "복습 공간",
  LectureManagement: "자료 관리",
  reviewQuiz: "복습 퀴즈",
};

const Breadcrumb = () => {
  const location = useLocation();
  const rawPathnames = location.pathname.split("/").filter((x) => x);
  const isAdmin = rawPathnames.includes("admin");

  const trimmed = rawPathnames.filter((x) => isNaN(x));

  let pathnames = [];

  for (let i = 0; i < trimmed.length; i++) {
    const segment = trimmed[i];

    if (sectionMap[segment]) {
      const track = trimmed[i + 1];
      if (track) {
        pathnames.push(`${track}-${sectionMap[segment]}`);
        i++;
      }
    } else {
      pathnames.push(segment);
    }
  }

  return (
    <nav className="flex text-sm" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-[#999999] hover:text-[#666666]"
          >
            <svg
              className="w-3 h-3 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1;

          // 라벨 처리
          let label;
          if (name.includes("-")) {
            const [track, section] = name.split("-");
            label = `${track} ${section}`;
          } else {
            label = pathMap[name] || decodeURIComponent(name);
          }

          // 경로 처리
          let routeTo;
          if (name.includes("-")) {
            const [track, sectionLabel] = name.split("-");
            const sectionKey = Object.keys(sectionMap).find(
              (key) => sectionMap[key] === sectionLabel
            );
            routeTo = `/${
              isAdmin ? "admin" : "cybercampus"
            }/${sectionKey}/${track}`;
          } else {
            routeTo = "/" + rawPathnames.slice(0, index + 1).join("/");
          }

          return (
            <li key={name}>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                {isLast ? (
                  <span className="ms-1 text-sm font-bold text-[#333333]">
                    {label}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="ms-1 text-sm font-medium text-[#B3B3B3] hover:text-[#666666] md:ms-2"
                  >
                    {label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
