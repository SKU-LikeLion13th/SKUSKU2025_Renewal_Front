import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
const LectureControls = ({
  totalItems,
  totalPages,
  currentPage,
  setCurrentPage,
  onSearch,
}) => {
  const [inputPage, setInputPage] = useState(currentPage);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handlePageChange = () => {
    const page = parseInt(inputPage, 10);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageInputChange = (e) => {
    setInputPage(e.target.value);
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
    <div className="flex justify-between items-center mt-32 text-sm text-gray-700 ">
      <div>
        전체 게시물 수: {totalItems} &nbsp; 전체 페이지 수: {totalPages}
        <input
          type="text"
          value={inputPage}
          onChange={handlePageInputChange}
          onKeyDown={handlePageKeyDown}
          placeholder="페이지"
          className="w-12 h-[30px] px-2 text-center border-[1.8px] border-[#D8D8D8] rounded-[5.14px] mx-4"
        />
        <button
          onClick={handlePageChange}
          className="h-[30px] px-3 border-[1.8px] border-[#D8D8D8] rounded-[5.14px]"
        >
          보기
        </button>
      </div>

      <div className="flex items-center -ml-4">-{currentPage}-</div>

      <div className="flex items-center h-[30px] border-[1.8px] border-[#C2C2C2] rounded-[5.14px] text-[#707070]">
        <select
          name="assignmentSearch"
          id="assignmentSearch"
          className="px-2 h-full border-r-[1.8px] border-[#CED4DA] bg-white"
        >
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
  );
};

export default LectureControls;
