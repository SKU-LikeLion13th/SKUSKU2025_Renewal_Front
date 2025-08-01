import React from "react";

export default function AssignmentAdminComments({ feedback }) {
  // feedback이 없거나 빈 문자열이면 컴포넌트를 렌더링하지 않음
  if (!feedback || feedback.trim() === "") {
    return null;
  }

  return (
    <div className="bg-[#F9F9F9] mb-15 border-t-2 border-[#232323] p-5 text-sm sm:text-base sm:p-8 sm:mt-30">
      <p>
        <span className="text-[#F6701D] font-bold">운영진</span> : {feedback}
      </p>
    </div>
  );
}
