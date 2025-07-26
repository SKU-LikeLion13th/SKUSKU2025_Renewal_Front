import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../utils/axios";
import AdminAssignmentBoard from "./AdminAssignmentBoard";
import AdminAssignmentControl from "./AdminAssignmentControl";
import AdminAssignmentPagination from "./AdminAssignmentPagination";
import TrackTitle from "../../../components/TrackTitle";
import Breadcrumb from "../../../components/Breadcrumb";

export default function AssignmentManagement() {
  const navigate = useNavigate();
  const { track } = useParams();

  const [assignments, setAssignments] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 15;

  useEffect(() => {
    const assignmentList = async () => {
      try {
        const response = await API.get(`/assignment/track/${track}`);
        const processed = response.data.map((item) => ({
          id: item.assignmentId,
          title: item.title,
          isSubmit: item.isSubmit,
          description: item.description,
          adminCheck: item.adminCheck,
        }));

        // Sort assignments by ID in descending order (most recent first)
        const sortedAssignments = processed.sort((a, b) => b.id - a.id);

        setAssignments(sortedAssignments);
        console.log("과제 목록:", sortedAssignments);
      } catch (error) {
        console.error("과제 데이터를 불러오는 데 실패했습니다:", error);
        if (error.response?.status === 404) {
          alert("해당 트랙의 과제가 없습니다.");
        }
      }
    };
    if (track) assignmentList();
  }, [track]);

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(assignments.map((a) => a.id));
    }
    setAllSelected(!allSelected);
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      setAllSelected(false);
    } else {
      const newSelected = [...selectedItems, id];
      setSelectedItems(newSelected);
      if (newSelected.length === assignments.length) {
        setAllSelected(true);
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;

    if (
      window.confirm(
        `선택한 ${selectedItems.length}개의 과제를 삭제하시겠습니까?`
      )
    ) {
      try {
        await Promise.all(
          selectedItems.map((id) =>
            API.delete(`/admin/assignment/delete/${id}`)
          )
        );
        setAssignments(
          assignments.filter((a) => !selectedItems.includes(a.id))
        );
        setSelectedItems([]);
        setAllSelected(false);
        alert("선택한 과제가 삭제되었습니다.");
      } catch (error) {
        console.error("과제 삭제 중 오류 발생:", error);
        alert("과제 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleCreateAssignment = () => {
    navigate(`/admin/assignment/${track}/add`, { state: { isEdit: false } });
  };

  const handleEditAssignment = async (id) => {
    try {
      const response = await API.get(`/assignment/${id}`);
      const assignmentDetail = response.data;

      const currentAssignment = assignments.find((a) => a.id === id);
      const title = currentAssignment?.title || "제목 없음";

      navigate(`/admin/assignment/${track}/add`, {
        state: {
          isEdit: true,
          assignmentId: id,
          assignmentDetail: {
            ...assignmentDetail,
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

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col justify-start w-9/12 mx-auto sm:mt-50 mt-30 lg:w-8/12">
        <div className="flex items-center justify-between">
          <TrackTitle suffix="과제 등록" />
        </div>

        <div className="flex justify-start w-full sm:mt-15 mt-8 pb-5 mb-6">
          <Breadcrumb />
        </div>

        <AdminAssignmentBoard
          assignments={currentPosts}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onEditAssignment={handleEditAssignment}
        />

        <AdminAssignmentControl
          selectedItems={selectedItems}
          onSelectAll={handleSelectAll}
          onDelete={handleDeleteSelected}
          onCreateAssignment={handleCreateAssignment}
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
