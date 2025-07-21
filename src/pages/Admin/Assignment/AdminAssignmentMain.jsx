import React, { useState, useEffect, use } from "react";
import { FiHome } from "react-icons/fi";
import AdminAssignmentBoard from "./AdminAssignmentBoard";
import AdminAssignmentControl from "./AdminAssignmentControl";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../utils/axios";

export default function AdminAssignmentMain() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 15;

  const { track } = useParams(); // URL에서 track 파라미터 받기

  useEffect(() => {
    const assignmentList = async () => {
      try {
        console.log(`/assignment/${track}`);
        const response = await API.get(`/assignment/${track}`);
        console.log("과제 데이터:", response.data);
      } catch (error) {
        console.error("과제 데이터를 불러오는 데 실패했습니다:", error);
        console.error("상태 코드:", error.response?.status);
        console.error("에러 메시지:", error.response?.data);
      }
    };

    if (track) {
      assignmentList();
    }
  }, [track]);

  // 전체 선택/해제 처리
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      const allIds = assignments.map((item) => item.id);
      setSelectedItems(allIds);
    }
    setAllSelected(!allSelected);
  };

  // 개별 항목 선택/해제 처리
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      setAllSelected(false);
    } else {
      setSelectedItems([...selectedItems, id]);
      if (selectedItems.length + 1 === assignments.length) {
        setAllSelected(true);
      }
    }
  };

  // 선택 항목 삭제
  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;

    if (
      window.confirm(
        `선택한 ${selectedItems.length}개의 과제를 삭제하시겠습니까?`
      )
    ) {
      const updatedAssignments = assignments.filter(
        (assignment) => !selectedItems.includes(assignment.id)
      );
      setAssignments(updatedAssignments);
      setSelectedItems([]);
      setAllSelected(false);
      alert("선택한 과제가 삭제되었습니다.");
    }
  };

  // 과제 등록 페이지로 이동
  const handleCreateAssignment = () => {
    navigate("/admin/assignment/add");
  };

  // 과제 수정 기능 추가
  const handleEditAssignment = (id) => {
    alert(`${id}번 과제를 수정합니다.`);
    // 여기에 수정 페이지로 이동하는 로직을 추가할 수 있습니다
  };

  // 검색 처리
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // 페이지 변경 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 검색어에 따른 필터링
  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지네이션
  const totalPosts = filteredAssignments.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPosts = filteredAssignments.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold my-15">BACK-END 과제 등록</h1>
        </div>

        {/* 경로 표시 */}
        <div></div>

        {/* 과제 목록 테이블 */}
        <AdminAssignmentBoard
          assignments={currentPosts}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onEditAssignment={handleEditAssignment}
        />

        {/* 버튼 컨트롤 영역 */}
        <AdminAssignmentControl
          selectedItems={selectedItems}
          onSelectAll={handleSelectAll}
          onDelete={handleDeleteSelected}
          onCreateAssignment={handleCreateAssignment}
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
