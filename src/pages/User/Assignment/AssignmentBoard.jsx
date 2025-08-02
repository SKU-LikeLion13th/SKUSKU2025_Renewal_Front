import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const headers = ["번호", "제목", "제출 여부", "운영진 확인"];

export default function AssignmentBoard({ assignments }) {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 640); // 640px 이하일 때 작은 화면으로 판단
    };

    checkScreenSize(); // 초기 실행
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 화면 크기에 따른 flex 값과 텍스트 크기 결정
  const flexValues = isSmallScreen
    ? ["1", "5", "2", "2.5"]
    : ["1", "10", "2", "2"];
  const textSize = isSmallScreen ? "text-[11px]" : "text-[13.5px]";

  const headerStyle = `flex fontBold justify-center px-1 ${textSize}`;
  const rowStyle = "flex w-full border-b border-b-[#E0E0E0] p-2";
  const titleCellStyle = `flex justify-start px-1 ${textSize} cursor-pointer hover:text-blue-500 overflow-hidden whitespace-nowrap text-ellipsis`;

  // 선택된 과제 데이터와 함께 네비게이션하는 함수
  const handleAssignmentClick = (assignment) => {
    // 원본 API 데이터 형태로 변환
    const selectedAssignmentData = {
      assignmentId: assignment.id,
      title: assignment.title,
      isSubmit: assignment.status === "제출" ? "True" : "False",
      description: assignment.description,
      adminCheck:
        assignment.completed === "확인"
          ? "PASS"
          : assignment.completed === "보류"
          ? "NONE_PASS"
          : "UNREVIEWED",
    };

    navigate(
      `/cybercampus/assignment/${assignment.track}/submit/${assignment.id}`,
      {
        state: {
          selectedAssignment: selectedAssignmentData,
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* 헤더 */}
      <div className="flex w-full border-t-[2.5px] border-t-[#232323] border-b border-b-[#9A9A9A] bg-[#F7F7F7] p-2">
        {headers.map((header, index) => (
          <div
            key={index}
            className={headerStyle}
            style={{ flex: flexValues[index] }}>
            {header}
          </div>
        ))}
      </div>

      <div
        className={`flex w-full flex-col ${
          !isSmallScreen ? "min-h-[290px]" : "min-h-[500px]"
        }`}>
        {assignments.map((assignment) => {
          const baseStyle = `flex justify-center px-1 ${textSize}`;

          // 제출 여부 스타일 (제출인 경우 파란색)
          let statusStyle = baseStyle;
          if (assignment.status === "제출") {
            statusStyle += " text-[#3B79FF] font-bold";
          }

          // 운영진 확인 스타일 (PASS, NONE_PASS, UNREVIEWED)
          let completedStyle = baseStyle;
          if (assignment.completed === "확인") {
            completedStyle += " text-[#4881FF] font-bold";
          } else if (assignment.completed === "보류") {
            completedStyle += " text-red-500 font-bold";
          }

          return (
            <div key={assignment.id} className={rowStyle}>
              {/* 번호 */}
              <div className={baseStyle} style={{ flex: flexValues[0] }}>
                {assignment.displayNumber}
              </div>

              {/* 제목 */}
              <div
                className={titleCellStyle}
                style={{ flex: flexValues[1] }}
                onClick={() => handleAssignmentClick(assignment)}
                title={assignment.title} // 호버 시 전체 제목 표시
              >
                {assignment.title}
              </div>

              {/* 제출 여부 */}
              <div className={statusStyle} style={{ flex: flexValues[2] }}>
                {assignment.status}
              </div>

              {/* 운영진 확인 */}
              <div className={completedStyle} style={{ flex: flexValues[3] }}>
                {assignment.completed}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
