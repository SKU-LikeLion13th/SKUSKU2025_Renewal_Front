import React, { useState, useEffect } from "react";
import AssignmentSearchBar from "./AssignmentSearchBar";
import AssignmentBoard from "./AssignmentBoard";

export default function AssignmentMain() {
  const [assignments, setAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15; // 기본 설정
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sampleData = [
      { id: 1, title: "4월 10일 과제", status: "미제출", completed: "미확인" },
      { id: 2, title: "4월 3일 과제", status: "제출", completed: "확인" },
      {
        id: 3,
        title: "과제 이거 뭐에요...? 감자력 MAX 찍는 중",
        status: "제출",
        completed: "확인",
      },
      {
        id: 4,
        title: "과제 이거 뭐에요...? 감자력 MAX 찍는 중",
        status: "제출",
        completed: "확인",
      },
    ];
    setAssignments(sampleData);
  }, []);

  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPosts = filteredAssignments.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // 검색 시 1페이지로
  };

  // 현재 페이지에 해당하는 게시물만 표시
  const currentPosts = filteredAssignments.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12">
        <h1 className="text-4xl font-bold my-15">BACK-END 과제</h1>

        <div className="flex w-full mt-8 justify-center">
          {/* 여기서 현재 페이지에 해당하는 게시물만 전달 */}
          <AssignmentBoard assignments={currentPosts} />
        </div>

        <AssignmentSearchBar
          totalPosts={totalPosts}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
}
