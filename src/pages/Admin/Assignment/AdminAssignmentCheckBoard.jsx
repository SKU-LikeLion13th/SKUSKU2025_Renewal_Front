import React, { useState, useEffect } from "react";

export default function AdminAssignmentCheckBoard({
  assignments = [], // 기본값 설정
  onEditAssignment,
  onGradeAssignment,
  headers = ["번호", "제목", "채점", "수정"],
  flexValues = ["1", "10", "2", "2"],
  emptyText,
}) {
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
  const responsiveFlexValues = isSmallScreen
    ? ["1", "7", "1.5", "1.5"]
    : flexValues;
  const textSize = isSmallScreen ? "text-[11px]" : "text-[13.5px]";
  const statusTextSize = isSmallScreen ? "text-[10px]" : "text-sm";

  const headerStyle = `flex fontBold justify-center px-1 ${textSize}`;
  const rowStyle = "flex w-full border-b border-b-[#E0E0E0] p-2";
  const cellStyle = `flex justify-center px-1 ${textSize}`;
  const titleCellStyle = `flex justify-start px-1 ${textSize} overflow-hidden whitespace-nowrap text-ellipsis`;
  const buttonStyle = `underline cursor-pointer ${textSize}`;

  return (
    <div className="flex flex-col items-center w-full">
      {/* 헤더 */}
      <div className="flex w-full border-t-[2.5px] border-t-[#232323] border-b border-b-[#9A9A9A] bg-[#F7F7F7] p-2">
        {headers.map((header, index) => (
          <div
            key={index}
            className={headerStyle}
            style={{ flex: responsiveFlexValues[index] }}>
            {header}
          </div>
        ))}
      </div>

      {/* 본문 */}
      <div
        className={`flex w-full flex-col ${!isSmallScreen && "min-h-[550px]"}`}>
        {assignments.length > 0 ? (
          assignments.map((assignment, index) => (
            <div key={`${assignment.id}-${index}`} className={rowStyle}>
              {/* 번호 */}
              <div
                className={cellStyle}
                style={{ flex: responsiveFlexValues[0] }}>
                {index + 1}
              </div>

              {/* 제목 */}
              <div
                className={titleCellStyle}
                style={{ flex: responsiveFlexValues[1] }}
                title={assignment.name || assignment.title || "제목 없음"} // 호버 시 전체 제목 표시
              >
                {assignment.name || assignment.title || "제목 없음"}
              </div>

              {/* 채점 상태/버튼 */}
              <div
                className={cellStyle}
                style={{ flex: responsiveFlexValues[2] }}>
                {assignment.passNonePass === "PASS" ? (
                  <span
                    className={`text-[#4881FF] font-semibold ${statusTextSize}`}>
                    확인
                  </span>
                ) : assignment.passNonePass === "NONE_PASS" ? (
                  <span
                    className={`text-[#FF4D4F] font-semibold ${statusTextSize}`}>
                    보류
                  </span>
                ) : (
                  <button
                    className={buttonStyle}
                    onClick={() => onGradeAssignment?.(assignment.id)}>
                    채점
                  </button>
                )}
              </div>

              {/* 수정 버튼 */}
              <div
                className={cellStyle}
                style={{ flex: responsiveFlexValues[3] }}>
                <button
                  className={buttonStyle}
                  onClick={() => onEditAssignment?.(assignment.id)}>
                  수정
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            className={`flex justify-center w-full p-4 text-gray-500 ${textSize}`}>
            {emptyText || "등록된 과제가 없습니다."}
          </div>
        )}
      </div>
    </div>
  );
}
