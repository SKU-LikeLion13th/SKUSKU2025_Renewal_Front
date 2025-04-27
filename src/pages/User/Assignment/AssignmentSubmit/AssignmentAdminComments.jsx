import React, { useState } from "react";

export default function AssignmentAdminComments() {
  const [comments, setComments] = useState("");

  return (
    <>
      <div className="bg-[#F9F9F9] p-8 mt-30 mb-15 border-t-2 border-[#232323]">
        <p>
          <span className="text-[#F6701D] font-bold">운영진</span> : 파일이
          업로드되지 않았다고 뜨네요! 확인 부탁해요!!
        </p>
      </div>
    </>
  );
}
