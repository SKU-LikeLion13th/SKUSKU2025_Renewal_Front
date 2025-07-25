import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import API from "../../../utils/axios";

export default function CheckDetails() {
  const location = useLocation();
  const lionName = location.state?.lionName || "이름 없음";

  const { id: assignmentId, submitId, track } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await API.get(`/admin/assignment/check/${submitId}`);
        setAssignment(res.data);
        setFeedback(res.data.feedback || "");

        // API 응답에 lionName이 있다면 그것을 사용
        console.log("API 응답 데이터:", res.data);
      } catch (error) {
        console.error("과제 조회 실패:", error);
      }
    };

    fetchAssignment();
  }, [assignmentId, submitId]);

  const handleFileDownload = (url, name) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  };

  const handleSubmitFeedback = async (passStatus) => {
    // 피드백 필수 작성 체크
    if (!feedback.trim()) {
      alert("피드백을 작성해 주세요.");
      return;
    }

    try {
      const requestData = {
        submitAssignmentId: parseInt(submitId),
        feedback: feedback.trim(),
        passNonePass: passStatus,
      };

      console.log("API 요청 데이터:", requestData); // 디버깅용

      const response = await API.put(
        `/admin/assignment/check/feedback`,
        requestData
      );

      console.log("API 응답:", response.data); // 디버깅용

      const statusText = passStatus === "PASS" ? "통과" : "보류";
      alert(`${statusText} 처리가 완료되었습니다.`);
    } catch (error) {
      console.error("피드백 처리 실패:", error);
      console.error("에러 상세:", error.response?.data || error.message);
      alert("피드백 처리에 실패했습니다.");
    }
  };

  if (!assignment) return <div>Loading...</div>;

  // API 응답에서 lionName을 가져올 수 있다면 우선 사용
  const displayName = assignment.lionName || lionName;

  // 트랙 이름 매핑 - URL 파라미터의 track 사용
  const trackToDisplay = {
    BACKEND: "BACK-END",
    FRONTEND: "FRONT-END",
    DESIGN: "DESIGN",
  };

  // track이 없으면 assignment.track 사용, 둘 다 없으면 기본값
  const currentTrack = track || assignment?.track || "UNKNOWN";
  const displayTrack = trackToDisplay[currentTrack] || currentTrack;

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12">
        {/* 타이틀 */}
        <div className="text-4xl font-bold my-15">{displayTrack} 과제 채점</div>

        <h1 className="text-2xl font-bold mb-6">{assignment.title}</h1>

        {/* 과제 설명 */}
        <div
          className="bg-[#F9F9F9] p-8 mt-3 border-t-2 border-[#232323]"
          style={{ whiteSpace: "pre-line" }}
        >
          {assignment.description}
        </div>

        {/* 제출한 주관식 답변 */}
        <h2 className="text-2xl font-bold mb-4 mt-10">주관식 답변</h2>
        <div
          className="w-full p-8 bg-[#F9F9F9] border-t-2 border-[#232323]"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {assignment.content || "내용이 없습니다."}
        </div>

        {/* 파일 다운로드 (있을 때만) */}
        {assignment.files && assignment.files.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4 mt-10">파일 다운로드</h2>
            <div className="bg-[#F9F9F9] p-8 mb-6 border-t-2 border-[#232323]">
              {assignment.files.map((f, idx) => (
                <div
                  key={idx}
                  className="mb-2 flex justify-between items-center"
                >
                  <button
                    type="button"
                    onClick={() => handleFileDownload(f.fileUrl, f.fileName)}
                    className="underline text-[#4881FF] hover:text-blue-700"
                  >
                    {f.fileName} 다운로드
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 버튼 */}
        <div className="flex justify-between items-center mb-30 mt-10">
          <div className="flex">
            <p className="font-bold flex items-center">
              제출 여부
              <span className="block text-center w-23 border rounded-md p-1.5 ml-4 mr-10 font-normal">
                제출 완료
              </span>
            </p>
            <p className="font-bold flex items-center">
              제출자 명
              <span className="block text-center w-23 border rounded-md p-1.5 ml-4 mr-10 font-normal">
                {displayName}
              </span>
            </p>
          </div>

          <div>
            <button
              className="w-22 p-1.5 mr-5 text-white bg-[#FC6163] rounded-md hover:bg-red-500"
              onClick={() => handleSubmitFeedback("NONE_PASS")} // 수정: 보류 요청 전달
            >
              보류
            </button>
            <button
              className="w-22 p-1.5 text-white bg-[#4881FF] rounded-md hover:bg-blue-700"
              onClick={() => handleSubmitFeedback("PASS")} // 수정: 통과 요청 전달
            >
              통과
            </button>
          </div>
        </div>

        {/* 관리자 피드백 */}
        <div className="mb-6">
          <textarea
            className="w-full h-34 p-8 bg-[#F9F9F9] border-t-2 border-[#232323] focus:outline-none"
            rows={8}
            placeholder="댓글을 입력해 주세요. 보류 시에는 피드백을 꼭 입력해 주세요."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
