import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import API from "../../../utils/axios";
import AdminAssignmentCheckBoard from "./AdminAssignmentCheckBoard";
import AdminAssignmentPagination from "./AdminAssignmentPagination";

export default function CheckLions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { track, id: assignmentId } = useParams();
  const title = location.state?.title || "제목 없음";

  const [assignments, setAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const postsPerPage = 15;

  useEffect(() => {
    const fetchSubmittedLions = async () => {
      try {
        const { data } = await API.get(
          `/admin/assignment/checklions/${assignmentId}`
        );

        const processed = data.map((item, index) => ({
          id: item.submitAssignmentId,
          name: item.lionName ?? "", // lionName → name으로 매핑
          index: index + 1,
        }));

        setAssignments(processed);
      } catch (error) {
        console.error("아기사자 과제 조회 실패:", error);
        alert("제출한 아기사자 목록을 불러오지 못했습니다.");
      }
    };

    if (assignmentId) fetchSubmittedLions();
  }, [assignmentId]);

  const handleGradeAssignment = (memberId) => {
    navigate(`/admin/assignment/grade/${assignmentId}/${track}/${memberId}`);
  };

  const filteredAssignments = assignments.filter((a) =>
    a.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPosts = filteredAssignments.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const currentPosts = filteredAssignments.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const trackToDisplay = {
    BACKEND: "BACK-END",
    FRONTEND: "FRONT-END",
    DESIGN: "DESIGN",
  };

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold my-15">
            {trackToDisplay[track] || track} 과제 채점
          </h1>
        </div>
        <div>{title}</div>

        <AdminAssignmentCheckBoard
          assignments={currentPosts}
          onGradeAssignment={handleGradeAssignment}
          headers={["번호", "제출자 명", "채점", "수정"]}
          flexValues={["1", "10", "2", "2"]}
          emptyText="제출한 아기사자가 없습니다."
        />

        {totalPages > 1 && (
          <AdminAssignmentPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
