import React, { useState, useEffect } from "react";
import AssignmentBoard from "./AssignmentBoard";

export default function AssignmentMain() {
  const [assignments, setAssignments] = useState([]);

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

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12">
        <h1 className="text-4xl font-bold my-15">BACK-END 과제</h1>
        {/* 검색 컴포넌트 및 페이지네이션 컴포넌트를 추가할 수 있음 */}
        <div className="flex w-full mt-8 justify-center">
          <AssignmentBoard assignments={assignments} />
        </div>
      </div>
    </div>
  );
}
