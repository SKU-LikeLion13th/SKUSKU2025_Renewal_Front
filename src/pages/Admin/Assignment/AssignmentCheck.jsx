import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../utils/axios";
import AdminAssignmentCheckBoard from "./AdminAssignmentCheckBoard";
import AdminAssignmentPagination from "./AdminAssignmentPagination";

export default function AssignmentCheck() {
  const navigate = useNavigate();
  const { track } = useParams();

  const [assignments, setAssignments] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const postsPerPage = 15;

  const displayTrack =
    {
      BACKEND: "BACK-END",
      FRONTEND: "FRONT-END",
      DESIGN: "DESIGN",
    }[track?.toUpperCase()] || track;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const { data } = await API.get(`/assignment/track/${track}`);
        const processed = data.map((item) => ({
          id: item.assignmentId,
          title: item.title,
          isSubmit: item.isSubmit,
          description: item.description,
          adminCheck: item.adminCheck,
        }));
        setAssignments(processed);
        setSelectedItems([]);
      } catch (error) {
        console.error("과제 데이터를 불러오는 데 실패했습니다:", error);
        if (error.response?.status === 404) {
          alert("해당 트랙의 과제가 없습니다.");
        }
      }
    };

    if (track) fetchAssignments();
  }, [track]);

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleEditAssignment = async (id) => {
    try {
      const { data } = await API.get(`/assignment/${id}`);
      const title = assignments.find((a) => a.id === id)?.title || "제목 없음";

      navigate(`/admin/assignment/add/${track}`, {
        state: {
          isEdit: true,
          assignmentId: id,
          assignmentDetail: {
            ...data,
            title,
            assignmentId: id,
          },
        },
      });
    } catch (error) {
      console.error("과제 상세 조회 실패:", error);
      alert("과제 상세 정보를 불러오는데 실패했습니다.");
    }
  };

  const handleGradeAssignment = (id) => {
    // id와 track, 그리고 title을 navigation state로 넘김
    const assignment = assignments.find((a) => a.id === id);
    navigate(`/admin/assignment/check/${id}/${track}`, {
      state: {
        title: assignment?.title || "제목 없음",
        track,
      },
    });
  };

  // 페이지네이션 & 검색 처리 함수
  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold my-15">{displayTrack} 과제 채점</h1>
        </div>

        <AdminAssignmentCheckBoard
          assignments={currentPosts}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onEditAssignment={handleEditAssignment}
          onGradeAssignment={handleGradeAssignment}
          headers={["번호", "제목", "채점", "수정"]}
          flexValues={["1", "10", "2", "2"]}
        />

        <AdminAssignmentPagination
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
