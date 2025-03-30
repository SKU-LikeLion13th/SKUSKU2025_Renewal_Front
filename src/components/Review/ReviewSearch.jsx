import React from 'react'
import { FiSearch } from "react-icons/fi";

export default function ReviewSearch({ totalPosts, totalPages }) {
  return (
    <div className='flex w-full'>
      <div className="flex justify-between w-full p-2 items-center text-[14px]">
        <div className='flex w-fit items-center'>
          <div className="flex mr-3">전체 게시물수: {totalPosts}</div>
          <div className="flex mr-3">전체 페이지: {totalPages}</div>
          <input type="text" placeholder="n" className="flex w-13 h-[30px] px-2 mr-3 text-center border-[#D8D8D8] border-[1.8px] rounded-[5.14px]" />
          <button className="flex w-fit h-[30px] px-3 items-center text-center border-[#D8D8D8] border-[1.8px] rounded-[5.14px]">보기</button>
        </div>
        <div className="flex w-fit justify-center">- {totalPages} -</div>
        <div className="flex w-fit items-center pr-1.5 h-[30px] text-[#707070] border-[#C2C2C2] border-[1.8px] rounded-[5.14px]">
          <select name="reviewSearch" id="reviewSearch" className='px-2 h-full border-r-[1.8px] border-[#CED4DA]'>
            <option value="title">제목</option>
          </select>
          <input type="text" placeholder="검색어를 입력하세요." className="flex px-4 text-[#C2C2C2]" />
          <FiSearch className='mx-2 text-[#D8D8D8]' />
        </div>
      </div>
    </div>
  )
}
