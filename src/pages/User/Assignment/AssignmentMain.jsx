import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import AssignmentSearchBar from "./AssignmentSearchBar";
// import AssignmentBoard from "./AssignmentBoard";
// import API from "../../../utils/axios";

// export default function AssignmentMain() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const track = searchParams.get("track") || "BACKEND";

//   const [assignments, setAssignments] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 15;
//   const [searchTerm, setSearchTerm] = useState("");

//   const trackNames = {
//     FRONTEND: "프론트엔드",
//     BACKEND: "백엔드",
//     DESIGN: "디자인",
//   };

//   const trackTitle = trackNames[track.toUpperCase()] || "백엔드";

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await API.get(`/assignment/${track}`);
//         const data = await response.json();

//         // 서버에서 받은 필드를 프론트에 맞게 가공
//         const formatted = data.map((a) => ({
//           id: a.assignmentId,
//           title: a.title,
//           status: a.isSubmit === "True" ? "제출" : "미제출",
//           completed: a.adminCheck === "PASS" ? "확인" : "미확인",
//         }));

//         setAssignments(formatted);
//       } catch (error) {
//         console.error("과제 데이터를 불러오는 데 실패했습니다:", error);
//       }
//     };

//     fetchAssignments();
//   }, [track]);

//   const filteredAssignments = assignments.filter((a) =>
//     a.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPosts = filteredAssignments.length;
//   const totalPages = Math.ceil(totalPosts / postsPerPage);

//   const handlePageChange = (page) => setCurrentPage(page);

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//     setCurrentPage(1);
//   };

//   const currentPosts = filteredAssignments.slice(
//     (currentPage - 1) * postsPerPage,
//     currentPage * postsPerPage
//   );

//   return (
//     <div className="flex mx-auto min-h-screen">
//       <div className="flex flex-col w-9/12 my-30 mx-auto justify-start lg:w-8/12">
//         <h1 className="text-4xl font-bold my-15">{trackTitle} 과제</h1>

//         <div className="flex w-full mt-8 justify-center">
//           <AssignmentBoard assignments={currentPosts} />
//         </div>

//         <AssignmentSearchBar
//           totalPosts={totalPosts}
//           totalPages={totalPages}
//           currentPage={currentPage}
//           onPageChange={handlePageChange}
//           onSearch={handleSearch}
//         />
//       </div>
//     </div>
//   );
// }
