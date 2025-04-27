import React, { useState, useEffect } from "react";

import AssignmentAdminComments from "./AssignmentAdminComments";

export default function EssayAssignmentSubmit() {
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedContent, setSubmittedContent] = useState("");

  // 페이지 로드 시 과제 제출 상태 확인
  useEffect(() => {
    const checkSubmissionStatus = async () => {
      // 예시
      const submissionData = {
        isSubmitted: false, // true면 제출 완료, false면 미제출
        content:
          "이것은 제출된 답안 내용입니다. 실제로는 API에서 가져온 내용이 표시됩니다.",
      };

      setIsSubmitted(submissionData.isSubmitted);
      if (submissionData.isSubmitted) {
        setSubmittedContent(submissionData.content);
      }
    };

    checkSubmissionStatus();
  }, []);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 과제 제출 로직
    alert("과제가 제출되었습니다.");
    setIsSubmitted(true);
    setSubmittedContent(content); // 제출한 내용을 저장
    // 리디렉션 로직 필요 시 추가
  };

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12">
        <div className="text-4xl font-bold my-15">BACK-END 과제</div>

        <div>{/* 여기에 경로 URL 들어갈거임*/}</div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold mb-6">
          8월 첫째주 과제 안내 [4월 첫째주 발표 안내]
        </h1>

        {/* 과제 설명 */}
        <div className="bg-[#F9F9F9] p-8 mt-3 mb-15 border-t-2 border-[#232323]">
          <p className="mb-2">
            4월 첫째주 과제 안내드립니다.
            <br /> 오늘 배운 이론 중 기억나는 문장 두줄 이상 작성하세요.
          </p>
        </div>

        {/* 과제 제출 폼 또는 제출된 답안 표시 */}
        {isSubmitted ? (
          // 제출 완료된 경우: 답안을 일반 텍스트로 표시
          <div className="mb-13">
            <div className="w-full p-8 bg-[#F9F9F9] border-t-2 border-[#232323] min-h-64">
              {submittedContent}
            </div>
            <div className="flex justify-end mt-10">
              <div className="py-2 text-[#4881FF] font-medium">
                과제 제출이 완료되었습니다.
              </div>
            </div>
          </div>
        ) : (
          // 미제출 상태: 답안 작성 폼 표시
          <form onSubmit={handleSubmit}>
            <div className="mb-13">
              <textarea
                className="w-full h-64 p-8 bg-[#F9F9F9] border-t-2 border-[#232323] focus:outline-none"
                placeholder="답안을 작성하세요."
                value={content}
                onChange={handleContentChange}
                required
              />
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-end gap-2">
              <div className="px-4 py-2 text-sm text-[#4881FF]">
                과제 제출 이후 수정이 불가합니다.
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-[#4881FF] rounded-md hover:bg-blue-700">
                과제 제출
              </button>
            </div>
          </form>
        )}

        <AssignmentAdminComments />
      </div>
    </div>
  );
}
