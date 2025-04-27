import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function AdminAssignmentControl({
  selectedItems,
  onSelectAll,
  onDelete,
  onCreateAssignment,
  totalPosts,
  totalPages,
  currentPage,
  onPageChange,
  onSearch,
}) {
  const [inputPage, setInputPage] = useState(currentPage);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePageInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageChange = () => {
    const page = parseInt(inputPage, 10);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePageKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePageChange();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {/* 버튼 영역 */}
      <div className="flex justify-between mt-20 text-sm">
        <div>
          <button
            onClick={onCreateAssignment}
            className="bg-[#4881FF] text-white px-3.5 py-1.5 rounded cursor-pointer">
            과제 등록
          </button>
        </div>
        <div>
          <button
            onClick={onSelectAll}
            className="bg-[#E9E9E9] text-[#838383] px-3.5 py-1.5 rounded mr-5 cursor-pointer">
            전체 선택
          </button>
          <button
            onClick={onDelete}
            disabled={selectedItems.length === 0}
            className={`px-3.5 py-1.5 rounded ${
              selectedItems.length > 0
                ? "bg-[#E65252] text-white cursor-pointer"
                : "bg-[#6C6868] text-white"
            }`}>
            선택 삭제
          </button>
        </div>
      </div>

      {/* 페이지네이션 및 검색 */}
      <div className="flex w-full p-2 items-center justify-between text-[14px] mt-8">
        {/* 왼쪽: 전체 게시물수, 전체 페이지, 페이지 이동 */}
        <div className="flex items-center">
          <div className="mr-3">전체 게시물수: {totalPosts}</div>
          <div className="mr-3">전체 페이지: {totalPages}</div>
          <input
            type="text"
            value={inputPage}
            onChange={handlePageInputChange}
            onKeyDown={handlePageKeyDown}
            placeholder="페이지"
            className="w-12 h-[30px] px-2 text-center border-[1.8px] border-[#D8D8D8] rounded-[5.14px] mr-2"
          />
          <button
            onClick={handlePageChange}
            className="h-[30px] px-3 border-[1.8px] border-[#D8D8D8] rounded-[5.14px]">
            보기
          </button>
        </div>

        {/* 중앙: 현재 페이지 */}
        <div className="flex items-center">-{currentPage}-</div>

        {/* 오른쪽: 검색 */}
        <div className="flex items-center h-[30px] border-[1.8px] border-[#C2C2C2] rounded-[5.14px] text-[#707070]">
          <select
            name="assignmentSearch"
            id="assignmentSearch"
            className="px-2 h-full border-r-[1.8px] border-[#CED4DA] bg-white">
            <option value="title">제목</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="검색어를 입력하세요."
            className="px-4 text-[#C2C2C2] bg-white"
          />
          <FiSearch
            className="mx-2 text-[#D8D8D8] cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>
    </>
  );
}
