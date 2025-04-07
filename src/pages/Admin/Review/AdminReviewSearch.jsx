
import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";

export default function AdminReviewSearch({ totalPosts, totalPages, currentPage, onPageChange, onSearch }) {
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlePageChange();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDownSearch = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='flex w-full'>
      <div className="flex justify-between w-full p-2 items-center text-[14px]">
        {/* 게시물 수 */}
        <div className='flex items-center w-fit'>
          <div className="flex mr-3">전체 게시물수: {totalPosts}</div>
          <div className="flex mr-3">전체 페이지: {totalPages}</div>
          <input
            type="text"
            value={inputPage}
            onChange={handlePageInputChange}
            onKeyDown={handleKeyDown}
            placeholder="페이지"
            className="flex w-13 h-[30px] px-2 mr-3 text-center border-[#D8D8D8] border-[1.8px] rounded-[5.14px]"
          />
          <button
            onClick={handlePageChange}
            className="flex w-fit h-[30px] px-3 items-center text-center border-[#D8D8D8] border-[1.8px] rounded-[5.14px]"
          >
            보기
          </button>
        </div>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-center w-fit">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2 text-lg"
          >
            &lt;
          </button>
          <div>{currentPage} / {totalPages}</div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-2 text-lg"
          >
            &gt;
          </button>
        </div>

        {/* 검색 */}
        <div className="flex w-fit items-center pr-1.5 h-[30px] text-[#707070] border-[#C2C2C2] border-[1.8px] rounded-[5.14px]">
          <select name="reviewSearch" id="reviewSearch" className='px-2 h-full border-r-[1.8px] border-[#CED4DA]'>
            <option value="title">제목</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDownSearch}
            placeholder="검색어를 입력하세요."
            className="flex px-4 text-[#C2C2C2]"
          />
          <FiSearch className='mx-2 text-[#D8D8D8]' onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
}
