import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function AdminAssignmentControl({
  selectedItems,
  onSelectAll,
  onDelete,
  onCreateAssignment,
}) {
  return (
    <>
      <div className="flex justify-between mt-20 mb-8 text-xs sm:text-sm">
        <div>
          <button
            onClick={onCreateAssignment}
            className="bg-[#4881FF] text-white px-2 py-1.5 rounded cursor-pointer sm:px-3.5">
            과제 등록
          </button>
        </div>
        <div>
          <button
            onClick={onSelectAll}
            className="bg-[#E9E9E9] text-[#838383] px-2 py-1.5 rounded cursor-pointer mr-2 sm:mr-5 sm:px-3.5">
            전체 선택
          </button>
          <button
            onClick={onDelete}
            disabled={selectedItems.length === 0}
            className={`px-2 py-1.5 rounded sm:px-3.5 ${
              selectedItems.length > 0
                ? "bg-[#E65252] text-white cursor-pointer"
                : "bg-[#6C6868] text-white"
            }`}>
            선택 삭제
          </button>
        </div>
      </div>
    </>
  );
}
