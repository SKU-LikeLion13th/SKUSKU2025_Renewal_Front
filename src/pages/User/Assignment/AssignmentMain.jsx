import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/axios";
import AssignmentSearchBar from "./AssignmentSearchBar";
import AssignmentBoard from "./AssignmentBoard";

export default function AssignmentMain() {
  const [assignments, setAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15; // 기본 설정
  const [searchTerm, setSearchTerm] = useState("");

  const { track } = useParams();

  const trackNames = {
    FRONTEND: "FRONT-END",
    BACKEND: "BACK-END",
    DESIGN: "DESIGN",
  };

  const trackTitle = trackNames[track.toUpperCase()] || track;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const { data } = await API.get(`/assignment/track/${track}`);
        const processed = data.map((item) => ({
          id: item.assignmentId,
          title: item.title,
          status: item.isSubmit ? "제출" : "미제출",
          completed:
            item.adminCheck === "PASS"
              ? "확인"
              : item.adminCheck === "NONE_PASS"
                ? "보류"
                : "미확인",
          description: item.description,
          track: track,
        }));
        setAssignments(processed);
        console.log("과제 데이터:", data);
      } catch (error) {
        console.error("과제 데이터를 불러오는 데 실패했습니다:", error);
        if (error.response?.status === 404) {
          alert("해당 트랙의 과제가 없습니다.");
        }
      }
    };

    if (track) fetchAssignments();
  }, [track]);

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

  // 현재 페이지에 해당하는 게시물만 표시 (번호와 함께)
  const currentPosts = filteredAssignments
    .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
    .map((assignment, index) => ({
      ...assignment,
      displayNumber: (currentPage - 1) * postsPerPage + index + 1,
    }));

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col w-9/12 my-30 mx-auto justify-start lg:w-8/12">
        <h1 className="text-4xl font-bold my-15">{trackTitle} 과제</h1>

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
