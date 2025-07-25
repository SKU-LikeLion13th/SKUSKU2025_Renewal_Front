import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function AdminAssignmentPagination({
  totalPosts,
  totalPages,
  currentPage,
  onPageChange,
  onSearch,
}) {
  const [inputPage, setInputPage] = useState(currentPage);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setInputPage(currentPage); // currentPage 변경 시 input 반영
  }, [currentPage]);

  const handlePageChange = () => {
    const page = parseInt(inputPage, 10);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handlePageChange();
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex w-full p-2 items-center justify-between text-[14px] mt-8">
      {/* 왼쪽: 전체 게시물 수 / 페이지 수 / 이동 */}
      <div className="flex items-center">
        <div className="mr-3">전체 게시물수: {totalPosts}</div>
        <div className="mr-3">전체 페이지: {totalPages}</div>
        <input
          type="text"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          onKeyDown={handleKeyDown}
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
          onChange={(e) => setSearchTerm(e.target.value)}
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
  );
}
