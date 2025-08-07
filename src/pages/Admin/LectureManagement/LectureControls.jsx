import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const LectureControls = ({
  totalItems,
  totalPages,
  currentPage,
  setCurrentPage,
  onSearch,
}) => {
  const [inputPage, setInputPage] = useState(currentPage.toString());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const handlePageInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageChange = () => {
    const page = parseInt(inputPage, 10);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePageChange();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    setCurrentPage(1); // 검색 시 페이지를 1로 초기화
  };

  const handleKeyDownSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full my-20">
      <div className="flex justify-between w-full p-2 items-center sm:text-[14px] text-[10px]">
        <div className="flex sm:flex-row flex-col items-start">
          <div className="flex mr-3">
            전체 게시물:{" "}
            <span className="text-[#3B79FF] ml-1">{totalItems}</span>
          </div>

          <div className="flex mr-3 sm:mb-0 mb-0.5">
            전체 페이지:{" "}
            <span className="text-[#FF7816] ml-1">{totalPages}</span>
          </div>

          <div className="flex">
            <input
              type="text"
              value={inputPage}
              onChange={handlePageInputChange}
              onKeyDown={handleKeyDown}
              placeholder="페이지"
              className="flex sm:w-[50px] w-[30px] sm:py-1 sm:px-2 py-0.5 px-1 mr-3 text-center border-[#D8D8D8] border-[1.8px] rounded-[5.14px]"
            />
            <button
              onClick={handlePageChange}
              className="sm:w-[60px] w-[50px] sm:py-1.25 sm:px-3 px-1 py-0.5 text-center sm:text-[13.5px] text-[8px] border-[#D8D8D8] border-[1.8px] rounded-[5.14px] cursor-pointer"
            >
              보기
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center w-[70px] sm:w-fit px-4 sm:text-[14px] text-[10px] font-medium">
          - {inputPage} -
        </div>

        {/* 검색 */}
        <div className="flex w-fit items-center pr-1.5 py-1 text-[#707070] border-[#C2C2C2] border-[1.8px] rounded-[5.14px]">
          <select
            name="lectureSearch"
            id="lectureSearch"
            className="sm:px-2 px-0.5 border-r-[1.8px] border-[#CED4DA]"
          >
            <option value="title">제목</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDownSearch}
            placeholder="검색어를 입력하세요."
            className="flex w-[50%] sm:w-fit sm:px-4 px-2 text-[#C2C2C2]"
          />
          <FiSearch
            className="sm:mx-2 mx-1 text-[#D8D8D8] cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default LectureControls;
