import React from "react";
import { useNavigate } from "react-router-dom";

const headers = ["번호", "제목", "제출 여부", "운영진 확인"];
const flexValues = ["1", "10", "2", "2"];

export default function AssignmentBoard({ assignments }) {
  const navigate = useNavigate();
  const headerStyle = "flex fontBold justify-center px-1";
  const rowStyle = "flex w-full border-b border-b-[#E0E0E0] p-2";
  const cellStyle = "flex justify-center px-1 text-[13.5px]";
  const titleCellStyle =
    "flex justify-start px-1 text-[13.5px] cursor-pointer hover:text-blue-500";

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
      <div className="flex w-full min-h-[590px] flex-col">
        {assignments.map((assignment) => (
          <div key={assignment.id} className={rowStyle}>
            <div className={cellStyle} style={{ flex: flexValues[0] }}>
              {assignment.displayNumber}
            </div>
            <div
              className={titleCellStyle}
              style={{ flex: flexValues[1] }}
              onClick={() =>
                navigate(
                  `/cybercampus/assignment/${assignment.id}/${assignment.track}`
                )
              }>
              {assignment.title}
            </div>
            <div
              className={`flex justify-center px-1 text-[13.5px] ${
                assignment.status === "제출" ? "text-[#3B79FF] font-bold" : ""
              }`}
              style={{ flex: flexValues[2] }}>
              {assignment.status}
            </div>
            <div className={cellStyle} style={{ flex: flexValues[3] }}>
              {assignment.completed}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
