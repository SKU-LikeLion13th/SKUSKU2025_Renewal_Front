import React, { useState, useEffect, useRef } from "react";
import AssignmentAdminComments from "./AssignmentAdminComments";
import API from "../../../../utils/axios";
import axios from "axios";

export default function AssignmentSubmit({ assignment }) {
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedContent, setSubmittedContent] = useState("");
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [files, setFiles] = useState([]);

  const fileInputRef = useRef();

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const { data } = await API.get(
          `/assignment/${assignment.assignmentId}`
        );
        setAssignmentDetails(data);
      } catch (error) {
        console.error("과제 상세 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchAssignmentDetails();

    const checkSubmissionStatus = async () => {
      const submissionData = {
        isSubmitted: false,
        content: "이것은 제출된 답안입니다.",
      };
      setIsSubmitted(submissionData.isSubmitted);
      if (submissionData.isSubmitted) {
        setSubmittedContent(submissionData.content);
      }
    };

    checkSubmissionStatus();
  }, [assignment.assignmentId]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

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

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileRemove = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // S3 업로드 함수
  const uploadFileToS3 = async (file) => {
    try {
      const presignedRes = await API.post("/s3/presigned-urls", [
        {
          fileName: file.name,
          mimeType: file.type,
        },
      ]);

      const { uploadUrl, cdnUrl, fileKey, key } = presignedRes.data[0];

      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      return {
        fileUrl: cdnUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileKey: fileKey || key || null,
      };
    } catch (err) {
      console.error("파일 업로드 중 에러:", err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. 파일 S3 업로드
      const uploadedFiles = await Promise.all(
        files.map((file) => uploadFileToS3(file))
      );

      // 2. 과제 제출 요청
      const submitPayload = {
        assignmentId: assignment.assignmentId,
        content: content,
        files: uploadedFiles,
      };

      await API.post("/assignment/submit", submitPayload);

      alert("과제가 제출되었습니다.");
      setIsSubmitted(true);
      setSubmittedContent(content);
      setContent("");
      setFiles([]);
    } catch (err) {
      console.error("과제 제출 중 오류:", err);
      alert("과제 제출에 실패했습니다.");
    }
  };

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12">
        <div className="text-4xl font-bold my-15">
          {assignment.track.toUpperCase()} 과제
        </div>

        <h1 className="text-2xl font-bold mb-6">{assignment.title}</h1>

        <div
          className="bg-[#F9F9F9] p-8 mt-3 mb-6 border-t-2 border-[#232323]"
          style={{ whiteSpace: "pre-line" }}>
          {assignmentDetails?.files?.map((f, idx) => (
            <div key={idx} className="mb-2 flex justify-between items-center">
              <button
                type="button"
                onClick={() => handleFileDownload(f.fileUrl, f.fileName)}
                className="underline text-[#4881FF] hover:text-blue-700">
                {f.fileName} 다운로드
              </button>
            </div>
          ))}

          {assignment.description}
        </div>

        {isSubmitted ? (
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
          <form onSubmit={handleSubmit}>
            {/* 텍스트 제출 */}
            <div className="mb-6">
              <textarea
                className="w-full h-64 p-8 bg-[#F9F9F9] border-t-2 border-[#232323] focus:outline-none"
                placeholder="답안을 작성하세요."
                value={content}
                onChange={handleContentChange}
              />
            </div>

            {/* 파일 업로드 영역 */}
            {assignmentDetails?.files && assignmentDetails.files.length > 0 && (
              <>
                <h1 className="text-2xl font-bold mb-6">파일 업로드</h1>
                <div className="bg-[#F9F9F9] p-8 mt-3 mb-6 border-t-2 border-[#232323] text-sm">
                  {files.map((f, idx) => (
                    <div
                      key={idx}
                      className="mb-2 flex justify-between items-center">
                      <span className="underline text-[#4881FF] hover:text-blue-700">
                        {f.name}
                      </span>
                      <button
                        type="button"
                        className="text-xs underline hover:text-gray-700"
                        onClick={() => handleFileRemove(idx)}>
                        삭제
                      </button>
                    </div>
                  ))}

                  <div
                    className="text-gray-500 text-sm cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}>
                    <span className="underline font-semibold">파일선택</span>{" "}
                    또는 여기로 파일을 끌어오세요.
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                </div>
              </>
            )}

            <div className="flex justify-end gap-2">
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
