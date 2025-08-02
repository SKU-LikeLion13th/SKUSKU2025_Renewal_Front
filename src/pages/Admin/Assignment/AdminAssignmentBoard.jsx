import React, { useState, useEffect } from "react";

const headers = ["번호", "제목", "수정", "선택"];

export default function AdminAssignmentBoard({
  assignments,
  selectedItems,
  onSelectItem,
  onEditAssignment,
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
  const flexValues = isSmallScreen
    ? ["1", "6", "1", "1"]
    : ["1", "10", "2", "2"];
  const textSize = isSmallScreen ? "text-[11px]" : "text-[13.5px]";

  const headerStyle = `flex fontBold justify-center px-1 ${textSize}`;
  const rowStyle = "flex w-full border-b border-b-[#E0E0E0] p-2";
  const cellStyle = `flex justify-center items-center px-1 ${textSize}`;
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
            style={{ flex: flexValues[index] }}>
            {header}
          </div>
        ))}
      </div>

      {/* 본문 */}
      <div
        className={`flex w-full flex-col ${
          isSmallScreen ? "min-h-[290px]" : "min-h-[500px]"
        } ${assignments.length === 0 ? "justify-center items-center" : ""}`}>
        {assignments.length > 0 ? (
          assignments.map((assignment, index) => (
            <div key={`${assignment.id}-${index}`} className={rowStyle}>
              {/* 번호 */}
              <div className={cellStyle} style={{ flex: flexValues[0] }}>
                {index + 1}
              </div>

              {/* 제목 */}
              <div
                className={titleCellStyle}
                style={{ flex: flexValues[1] }}
                title={assignment.title} // 호버 시 전체 제목 표시
              >
                {assignment.title}
              </div>

              {/* 수정 버튼 */}
              <div className={cellStyle} style={{ flex: flexValues[2] }}>
                <button
                  className={buttonStyle}
                  onClick={() => onEditAssignment(assignment.id)}>
                  수정
                </button>
              </div>

              {/* 선택 체크박스 */}
              <div className={cellStyle} style={{ flex: flexValues[3] }}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(assignment.id)}
                  onChange={() => onSelectItem(assignment.id)}
                  className={`${
                    isSmallScreen ? "w-3 h-3" : "w-[13px] h-[13px]"
                  }`}
                />
              </div>
            </div>
          ))
        ) : (
          /* 빈 상태 메시지 */
          <div className={`text-gray-500 ${textSize}`}>
            등록된 과제가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
