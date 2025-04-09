import React from "react";

const IntroPart2 = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center">
          <p className="">환영합니다!</p>
          <p className="">트랙을 선택해주세요.</p>
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-2">디자인</button>
          <button className="px-6 py-2">프론트</button>
          <button className="px-6 py-2">백</button>
        </div>

        <div className="flex gap-4">
          <button className="px-4 py-2">과제 확인하기</button>
          <button className="px-4 py-2">자료실 바로가기</button>
          <button className="px-4 py-2">배운 내용 복습하기</button>
        </div>
      </div>
    </div>
  );
};

export default IntroPart2;
