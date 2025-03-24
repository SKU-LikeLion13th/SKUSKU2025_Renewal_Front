import React from 'react';

const ReviewBoard = () => {

  return (
    <div className="flex flex-col items-center w-full">
      <div>
        <div className="grid grid-cols-12 fontBold justify-center items-center text-center bg-[#F7F7F7] w-full h-12 border-t-[2.5px] border-b-[0.1px] border-black">
          <p>번호</p>
          <p className="col-span-7 xl:col-span-7">제목</p>
          <p className="col-span-3 xl:col-span-2">제출여부</p>
          <p>나의점수</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewBoard;