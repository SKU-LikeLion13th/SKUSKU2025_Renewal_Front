import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import API from "../../../utils/axios";
import TrackTitle from "../../../components/TrackTitle";
import Breadcrumb from "../../../components/Breadcrumb";

export default function CheckDetails() {
  const navigate = useNavigate();
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

        console.log("API 응답 데이터:", res.data);
      } catch (error) {
        console.error("과제 조회 실패:", error);
      }
    };

    fetchAssignment();
  }, [assignmentId, submitId]);

  const handleFileDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
      window.open(fileUrl, "_blank");
    }
  };

  const handleSubmitFeedback = async (passStatus) => {
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

      const response = await API.put(
        `/admin/assignment/check/feedback`,
        requestData
      );

      const statusText = passStatus === "PASS" ? "통과" : "보류";
      alert(`${statusText} 처리가 완료되었습니다.`);

      navigate(-1, { replace: true });
    } catch (error) {
      console.error("피드백 처리 실패:", error);
      alert("피드백 처리에 실패했습니다.");
    }
  };

  if (!assignment) return <div>Loading...</div>;

  const displayName = assignment.lionName || lionName;

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col justify-start w-9/12 mx-auto sm:mt-50 mt-30 lg:w-8/12">
        <div className="flex items-center justify-between">
          <TrackTitle suffix="과제 채점" />
        </div>

        <div className="flex justify-start w-full sm:mt-15 mt-8 pb-5 mb-6">
          <Breadcrumb />
        </div>

        <h1 className="text-xl font-bold mb-3">{assignment.title}</h1>

        <div
          className="bg-[#F9F9F9] p-8 mt-3 border-t-2 border-[#232323]"
          style={{ whiteSpace: "pre-line" }}>
          {assignment.description}
        </div>

        <h2 className="text-xl font-bold mb-4 mt-10">주관식 답변</h2>
        <div
          className="w-full p-8 bg-[#F9F9F9] border-t-2 border-[#232323]"
          style={{ whiteSpace: "pre-wrap" }}>
          {assignment.content || "내용이 없습니다."}
        </div>

        {assignment.files && assignment.files.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4 mt-10">제출된 파일</h2>
            <div className="bg-[#F9F9F9] p-8 mb-6 border-t-2 border-[#232323]">
              {assignment.files.map((file, idx) => (
                <div
                  key={idx}
                  className="mb-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() =>
                      handleFileDownload(file.fileUrl, file.fileName)
                    }
                    className="underline text-[#4881FF] hover:text-blue-700 transition-colors duration-200">
                    {file.fileName} 다운로드
                  </button>
                  {file.fileSize && (
                    <span className="text-sm text-gray-500">
                      ({(file.fileSize / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

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
              onClick={() => handleSubmitFeedback("NONE_PASS")}>
              보류
            </button>
            <button
              className="w-22 p-1.5 text-white bg-[#4881FF] rounded-md hover:bg-blue-700"
              onClick={() => handleSubmitFeedback("PASS")}>
              통과
            </button>
          </div>
        </div>

        <div className="mb-15">
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
