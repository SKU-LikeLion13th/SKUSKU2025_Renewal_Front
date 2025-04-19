import React from "react";

const CyberCampusLecture = () => {
  const data = [
    { id: 1, title: "4월 3일 강의자료", date: "2025-04-03" },
    { id: 2, title: "4월 3일 강의자료 2", date: "2025-04-03" },
    // 나머지는 빈 항목
  ];

  const itemsPerPage = 10;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="max-w-5xl mx-auto mt-44 pb-10 px-4">
      <h1 className="text-4xl fontBold mb-20">BACK-END 자료실</h1>
      <div className="text-sm text-gray-500 mb-6">
        홈 &gt; 사이버캠퍼스 &gt; 자료실
      </div>

      <table className="w-full text-center border-t-[0.5px] border-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 border-b-[0.5px]">번호</th>
            <th className="py-2 border-b-[0.5px]">제목</th>
            <th className="py-2 border-b-[0.5px]">작성일</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(15)].map((_, i) => {
            const item = data[i]; // index로 직접 접근
            return (
              <tr
                key={i}
                className={item ? "hover:bg-blue-50 cursor-pointer" : ""}
              >
                <td className="py-2 border-b-[0.5px]">{i + 1}</td>
                <td className="py-2 border-b-[0.5px] text-left pl-4">
                  {item ? item.title : ""}
                </td>
                <td className="py-2 border-b-[0.5px]">
                  {item ? item.date : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 text-sm text-gray-700">
        <div>
          전체 게시물 수: {totalItems} &nbsp; 전체 페이지 수: {totalPages}
        </div>
        <div className="space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} className="border px-3 py-1">
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end items-center mt-4 space-x-2 text-sm">
        <select className="border px-2 py-1">
          <option>제목</option>
          <option>작성자</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          className="border px-2 py-1"
        />
        <button className="border px-3 py-1">검색</button>
      </div>
    </div>
  );
};

export default CyberCampusLecture;
