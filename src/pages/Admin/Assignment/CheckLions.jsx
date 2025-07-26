import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import API from "../../../utils/axios";
import AdminAssignmentCheckBoard from "./AdminAssignmentCheckBoard";
import AdminAssignmentPagination from "./AdminAssignmentPagination";
import TrackTitle from "../../../components/TrackTitle";
import Breadcrumb from "../../../components/Breadcrumb";

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
        console.log("제출한 아기사자 목록:", data);

        const processed = data.map((item, index) => {
          return {
            id: item.submitAssignmentId,
            name: item.lionName || item.name || "이름 없음",
            index: index + 1,
            passNonePass: item.passNonePass,
            originalData: item,
          };
        });

        setAssignments(processed);
      } catch (error) {
        console.error("아기사자 과제 조회 실패:", error);
        alert("제출한 아기사자 목록을 불러오지 못했습니다.");
      }
    };

    if (assignmentId) fetchSubmittedLions();
  }, [assignmentId]);

  const handleGradeAssignment = (memberId, lionName) => {
    const targetAssignment = assignments.find((a) => a.id === memberId);
    const nameToPass = lionName || targetAssignment?.name || "이름 없음";

    navigate(
      `/admin/assignmentCheck/${track}/babylions/${assignmentId}/${memberId}`,
      {
        state: { lionName: nameToPass, title },
      }
    );
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

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col justify-start w-9/12 mx-auto sm:mt-50 mt-30 lg:w-8/12">
        <div className="flex items-center justify-between">
          <TrackTitle suffix="과제 채점" />
        </div>

        <div className="flex justify-start w-full sm:mt-15 mt-8 pb-5 mb-6">
          <Breadcrumb />
        </div>

        <h1 className="text-xl font-bold mb-10">{title}</h1>

        <AdminAssignmentCheckBoard
          assignments={currentPosts}
          onGradeAssignment={handleGradeAssignment}
          onEditAssignment={(memberId) => {
            const targetAssignment = assignments.find((a) => a.id === memberId);
            const nameToPass = targetAssignment?.name || "이름 없음";

            navigate(
              `/admin/assignmentCheck/${track}/babylions/${assignmentId}/${memberId}`,
              {
                state: {
                  lionName: nameToPass,
                  title,
                },
              }
            );
          }}
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
