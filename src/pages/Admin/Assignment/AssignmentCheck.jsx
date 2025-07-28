import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../utils/axios";
import AdminAssignmentCheckBoard from "./AdminAssignmentCheckBoard";
import ReviewSearch from "../../User/Review/ReviewSearch";
import TrackTitle from "../../../components/TrackTitle";
import Breadcrumb from "../../../components/Breadcrumb";

export default function AssignmentCheck() {
  const navigate = useNavigate();
  const { track } = useParams();

  const [assignments, setAssignments] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const postsPerPage = 15;

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

        // Sort assignments by ID in descending order (most recent first)
        const sortedAssignments = processed.sort((a, b) => b.id - a.id);

        setAssignments(sortedAssignments);
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

      navigate(`/admin/assignment/${track}/add`, {
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
    const assignment = assignments.find((a) => a.id === id);
    navigate(`/admin/assignmentCheck/${track}/babylions/${id}`, {
      state: {
        title: assignment?.title || "제목 없음",
        track,
      },
    });
  };

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
      <div className="flex flex-col justify-start w-9/12 mx-auto sm:mt-50 mt-30 lg:w-8/12">
        <div className="flex items-center justify-between">
          <TrackTitle suffix="과제 채점" />
        </div>

        <div className="flex justify-start w-full sm:mt-15 mt-8 pb-5 mb-6">
          <Breadcrumb />
        </div>
        <div className="flex w-full justify-center mb-7">
          <AdminAssignmentCheckBoard
            assignments={currentPosts}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onEditAssignment={handleEditAssignment}
            onGradeAssignment={handleGradeAssignment}
            headers={["번호", "제목", "채점", "수정"]}
            flexValues={["1", "10", "2", "2"]}
          />
        </div>

        <ReviewSearch
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
