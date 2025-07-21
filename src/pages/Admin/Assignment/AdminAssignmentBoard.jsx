import React from "react";

const headers = ["번호", "제목", "수정", "선택"];
const flexValues = ["1", "10", "2", "2"];

export default function AdminAssignmentBoard({
  assignments,
  selectedItems,
  onSelectItem,
  onEditAssignment, // Add this new prop
}) {
  const headerStyle = "flex fontBold justify-center px-1";
  const rowStyle = "flex w-full border-b border-b-[#E0E0E0] p-2";
  const cellStyle = "flex justify-center px-1 text-[13.5px]";
  const titleCellStyle = "flex justify-start px-1 text-[13.5px]";
  const buttonStyle = "underline cursor-pointer";

  return (
    <div className="flex flex-col items-center w-full">
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
      <div className="flex w-full flex-col">
        {assignments.map((assignment, index) => (
          <div key={`${assignment.id}-${index}`} className={rowStyle}>
            <div className={cellStyle} style={{ flex: flexValues[0] }}>
              {index + 1}
            </div>
            <div className={titleCellStyle} style={{ flex: flexValues[1] }}>
              {assignment.title}
            </div>
            <div className={cellStyle} style={{ flex: flexValues[2] }}>
              <button
                className={buttonStyle}
                onClick={() => onEditAssignment(assignment.id)}>
                수정
              </button>
            </div>
            <div className={cellStyle} style={{ flex: flexValues[3] }}>
              <input
                type="checkbox"
                checked={selectedItems.includes(assignment.id)}
                onChange={() => onSelectItem(assignment.id)}
                className="w-4 h-4"
              />
            </div>
          </div>
        ))}
        {assignments.length === 0 && (
          <div className="flex justify-center w-full p-4 text-gray-500">
            등록된 과제가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
