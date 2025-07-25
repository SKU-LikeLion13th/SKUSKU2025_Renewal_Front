import React, { useState, useEffect, useRef } from "react";
import AssignmentAdminComments from "./AssignmentAdminComments";
import API from "../../../../utils/axios";
import axios from "axios";

export default function AssignmentSubmit({ assignment }) {
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedContent, setSubmittedContent] = useState("");
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [files, setFiles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

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

    // 제출 상태 확인 - assignment prop에서 받은 데이터 사용
    const checkSubmissionStatus = () => {
      const hasContent = assignment.content && assignment.content.trim() !== "";
      const hasFiles = assignment.files && assignment.files.length > 0;

      if (hasContent || hasFiles) {
        setIsSubmitted(true);
        setSubmittedContent(assignment.content || "");
        setSubmittedFiles(assignment.files || []);
        setContent(assignment.content || "");
      } else {
        setIsSubmitted(false);
        setSubmittedContent("");
        setSubmittedFiles([]);
      }
    };

    checkSubmissionStatus();
  }, [assignment]);

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

  const handleSubmittedFileRemove = (index) => {
    setSubmittedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleEditMode = () => {
    setIsEditMode(true);
    setContent(submittedContent);
    setFiles([]);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setContent(submittedContent);
    setFiles([]);
    setSubmittedFiles(assignment.files || []);
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
      // 1. 새로 추가된 파일들만 S3 업로드
      const uploadedFiles = await Promise.all(
        files.map((file) => uploadFileToS3(file))
      );

      // 2. 기존 제출된 파일들과 새로 업로드된 파일들 합치기
      const allFiles = [...submittedFiles, ...uploadedFiles];

      // 3. 과제 제출/수정 요청
      const submitPayload = {
        assignmentId: assignment.assignmentId,
        content: content,
        files: allFiles,
      };

      if (isSubmitted) {
        // 수정 모드인 경우
        await API.put("/assignment/update", submitPayload);
        alert("과제가 수정되었습니다.");
      } else {
        // 새 제출인 경우
        await API.post("/assignment/submit", submitPayload);
        alert("과제가 제출되었습니다.");
      }

      setIsSubmitted(true);
      setSubmittedContent(content);
      setSubmittedFiles(allFiles);
      setIsEditMode(false);
      setFiles([]);
    } catch (err) {
      console.error("과제 제출/수정 중 오류:", err);
      alert(
        isSubmitted ? "과제 수정에 실패했습니다." : "과제 제출에 실패했습니다."
      );
    }
  };

  // 파일 업로드가 가능한지 확인 (과제에 파일이 첨부되어 있거나 이미 제출된 파일이 있는 경우)
  const canUploadFiles =
    (assignmentDetails?.files && assignmentDetails.files.length > 0) ||
    (submittedFiles && submittedFiles.length > 0);

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
                className="underline text-sm text-[#4881FF] hover:text-blue-700">
                {f.fileName} 다운로드
              </button>
            </div>
          ))}

          {assignment.description}
        </div>

        {isSubmitted && !isEditMode ? (
          // 제출 완료 상태 (읽기 모드)
          <div className="mb-13">
            <div className="w-full p-8 bg-[#F9F9F9] border-t-2 border-[#232323] min-h-64">
              {submittedContent}
            </div>

            {/* 제출된 파일들 표시 */}
            {submittedFiles && submittedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">제출된 파일</h3>
                <div className="bg-[#F9F9F9] p-8 border-t-2 border-[#232323]">
                  {submittedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="mb-2 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() =>
                          handleFileDownload(file.fileUrl, file.fileName)
                        }
                        className="underline text-sm text-[#4881FF] hover:text-blue-700">
                        {file.fileName} 다운로드
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-10 gap-2">
              <div className="py-2 text-sm text-[#4881FF] font-medium">
                과제 제출이 완료되었습니다.
              </div>
              <button
                type="button"
                onClick={handleEditMode}
                className="px-4 py-2 text-sm text-white bg-[#6B6B6B] rounded-md hover:bg-[#525252]">
                수정하기
              </button>
            </div>
          </div>
        ) : (
          // 작성/수정 모드
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
            {canUploadFiles && (
              <>
                <h1 className="text-2xl font-bold mb-6">파일 업로드</h1>

                <div className="bg-[#F9F9F9] p-8 mt-3 mb-6 border-t-2 border-[#232323] text-sm">
                  {/* 기존 제출된 파일들 (수정 모드일 때) */}
                  {isEditMode && submittedFiles.length > 0 && (
                    <div className="mb-6">
                      {submittedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="mb-2 flex justify-between items-center">
                          <span className="underline text-[#4881FF]">
                            {file.fileName}
                          </span>
                          <button
                            type="button"
                            className="text-xs underline text-gray-700"
                            onClick={() => handleSubmittedFileRemove(idx)}>
                            삭제
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 새 파일 추가 영역 */}
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
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">
                  취소
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-[#4881FF] rounded-md hover:bg-blue-700">
                {isSubmitted ? "과제 수정" : "과제 제출"}
              </button>
            </div>
          </form>
        )}

        <AssignmentAdminComments feedback={assignment.feedback} />
      </div>
    </div>
  );
}
