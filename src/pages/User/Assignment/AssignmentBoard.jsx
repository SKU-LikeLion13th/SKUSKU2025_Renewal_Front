import React from "react";
import { useNavigate } from "react-router-dom";

const headers = ["번호", "제목", "제출 여부", "운영진 확인"];
const flexValues = ["1", "10", "2", "2"];

export default function AssignmentBoard({ assignments }) {
  const navigate = useNavigate();
  const headerStyle = "flex fontBold justify-center px-1";
  const rowStyle = "flex w-full border-b border-b-[#E0E0E0] p-2";
  const titleCellStyle =
    "flex justify-start px-1 text-[13.5px] cursor-pointer hover:text-blue-500";

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

    navigate(`/cybercampus/assignment/${assignment.id}/${assignment.track}`, {
      state: {
        selectedAssignment: selectedAssignmentData,
      },
    });
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

      {/* 본문 */}
      <div className="flex w-full min-h-[590px] flex-col">
        {assignments.map((assignment) => {
          const baseStyle = "flex justify-center px-1 text-[13.5px]";

          // 제출 여부 스타일 (예: 제출/미제출)
          const statusStyle = `${baseStyle}`;

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
              <div className={statusStyle} style={{ flex: flexValues[0] }}>
                {assignment.displayNumber}
              </div>

              {/* 제목 */}
              <div
                className={titleCellStyle}
                style={{ flex: flexValues[1] }}
                onClick={() => handleAssignmentClick(assignment)}>
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
