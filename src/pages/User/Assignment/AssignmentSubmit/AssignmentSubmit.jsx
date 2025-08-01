import React, { useState, useEffect, useRef } from "react";
import AssignmentAdminComments from "./AssignmentAdminComments";
import API from "../../../../utils/axios";
import axios from "axios";
import TrackTitle from "../../../../components/TrackTitle";
import Breadcrumb from "../../../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";

export default function AssignmentSubmit({ assignment }) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedContent, setSubmittedContent] = useState("");
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [files, setFiles] = useState([]); // 새로 추가할 파일들
  const [isEditMode, setIsEditMode] = useState(false);
  const [deletedFiles, setDeletedFiles] = useState([]); // 삭제될 파일들 추적
  const [isUploading, setIsUploading] = useState(false);

  // 드래그 앤 드롭 상태
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef();
  const dropZoneRef = useRef();

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

  // 드래그 앤 드롭 이벤트 핸들러
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // dropZone 영역을 완전히 벗어났을 때만 isDragOver를 false로 설정
    const rect = dropZoneRef.current?.getBoundingClientRect();
    if (rect) {
      const { left, right, top, bottom } = rect;
      const { clientX, clientY } = e;

      if (
        clientX < left ||
        clientX > right ||
        clientY < top ||
        clientY > bottom
      ) {
        setIsDragOver(false);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    }
  };

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
    const fileToRemove = submittedFiles[index];

    // 삭제될 파일을 deletedFiles에 추가 (DELETE status 포함)
    setDeletedFiles((prev) => [
      ...prev,
      {
        ...fileToRemove,
        status: "DELETE",
      },
    ]);

    // submittedFiles에서 제거
    setSubmittedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleEditMode = () => {
    setIsEditMode(true);
    setContent(submittedContent);
    setFiles([]);
    setDeletedFiles([]); // 수정 모드 진입시 삭제 목록 초기화
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setContent(submittedContent);
    setFiles([]);
    setSubmittedFiles(assignment.files || []); // 원본 파일 목록으로 복원
    setDeletedFiles([]); // 삭제 목록 초기화
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
        fileType: file.type.split("/")[1]?.toUpperCase() || "FILE",
        fileKey: fileKey || key || null,
      };
    } catch (err) {
      console.error("파일 업로드 중 에러:", err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let fileData = [];

      if (isSubmitted && isEditMode) {
        // 수정 모드: 변경사항만 처리

        // 1. 새로 추가된 파일들 업로드 (File 객체인 것들)
        if (files.length > 0) {
          const uploadPromises = files.map((file) => uploadFileToS3(file));
          const uploadedFiles = await Promise.all(uploadPromises);

          // 새로 업로드된 파일들에 NEW status 추가
          const newFileData = uploadedFiles.map((file) => ({
            ...file,
            status: "NEW",
          }));

          fileData.push(...newFileData);
        }

        // 2. 삭제된 파일들 추가
        if (deletedFiles.length > 0) {
          fileData.push(...deletedFiles);
        }

        // 변경사항이 없으면 빈 배열로 전송
        const submitPayload = {
          assignmentId: assignment.assignmentId,
          content: content,
          files: fileData,
        };

        console.log("수정할 과제 데이터:", submitPayload);
        console.log("파일 변경사항:", {
          hasChanges: fileData.length > 0,
          deletedFiles: deletedFiles,
          newFiles: fileData.filter((f) => f.status === "NEW"),
          totalChanges: fileData.length,
        });

        await API.put("/assignment/update", submitPayload);
        alert("과제가 수정되었습니다.");

        navigate(`/cybercampus/assignment/${assignment.track}`, {
          replace: true,
        });

        // 수정 완료 후 상태 업데이트
        // 기존 파일들에서 삭제된 것들 제외하고, 새로 업로드된 것들 추가
        const remainingFiles = (assignment.files || []).filter(
          (originalFile) =>
            !deletedFiles.some(
              (deleted) =>
                deleted.fileName === originalFile.fileName &&
                deleted.fileUrl === originalFile.fileUrl
            )
        );
        const newUploadedFiles = fileData.filter((f) => f.status === "NEW");
        const allCurrentFiles = [...remainingFiles, ...newUploadedFiles];

        setSubmittedFiles(allCurrentFiles);
        setSubmittedContent(content);
        setIsEditMode(false);
        setFiles([]);
        setDeletedFiles([]);
      } else {
        // 새 제출인 경우
        if (files.length > 0) {
          const uploadPromises = files.map((file) => uploadFileToS3(file));
          fileData = await Promise.all(uploadPromises);
        }

        const submitPayload = {
          assignmentId: assignment.assignmentId,
          content: content,
          files: fileData, // 새 제출시에는 모든 파일
        };

        console.log("제출할 과제 데이터:", submitPayload);
        await API.post("/assignment/submit", submitPayload);
        alert("과제가 제출되었습니다.");

        setIsSubmitted(true);
        setSubmittedContent(content);
        setSubmittedFiles(fileData);
        setFiles([]);

        navigate(`/cybercampus/assignment/${assignment.track}`, {
          replace: true,
        });
      }
    } catch (err) {
      console.error("과제 제출/수정 중 오류:", err);
      alert(
        isSubmitted ? "과제 수정에 실패했습니다." : "과제 제출에 실패했습니다."
      );
    } finally {
      setIsUploading(false);
    }
  };

  // 파일 업로드가 가능한지 확인 (과제에 파일이 첨부되어 있거나 이미 제출된 파일이 있는 경우)
  const canUploadFiles =
    (assignmentDetails?.files && assignmentDetails.files.length > 0) ||
    (submittedFiles && submittedFiles.length > 0) ||
    files.length > 0;

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col justify-start w-10/12 mx-auto sm:mt-50 mt-30 lg:w-8/12">
        <div className="flex items-center justify-between">
          <TrackTitle suffix="과제" />
        </div>
        <div className="flex justify-start w-full sm:mt-15 mt-8 pb-5 mb-6">
          <Breadcrumb />
        </div>

        <h1 className="font-bold mb-2 text-base sm:text-2xl">
          {assignment.title}
        </h1>

        <div
          className="bg-[#F9F9F9]  mt-3 mb-6 border-t-2 border-[#232323] py-6 px-5 text-sm sm:text-base sm:p-8"
          style={{ whiteSpace: "pre-line" }}>
          {assignmentDetails?.files?.map((f, idx) => (
            <div key={idx} className="mb-2 flex justify-between items-center">
              <button
                type="button"
                onClick={() => handleFileDownload(f.fileUrl, f.fileName)}
                className="underline  text-[#4881FF] hover:text-blue-700 text-xs sm:text-sm">
                {f.fileName} 다운로드
              </button>
            </div>
          ))}

          {assignment.description}
        </div>

        {isSubmitted && !isEditMode ? (
          // 제출 완료 상태 (읽기 모드)
          <div className="mb-13">
            <div
              className="w-full bg-[#F9F9F9] border-t-2 border-[#232323] min-h-10 p-5 text-sm sm:text-base sm:p-8"
              style={{ whiteSpace: "pre-line" }}>
              {submittedContent}
            </div>

            {/* 제출된 파일들 표시 */}
            {submittedFiles && submittedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-base sm:text-2xl font-bold mb-4">
                  제출된 파일
                </h3>
                <div className="bg-[#F9F9F9] border-t-2 border-[#232323] p-5 text-xs sm:text-sm sm:p-8">
                  {submittedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="mb-2 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() =>
                          handleFileDownload(file.fileUrl, file.fileName)
                        }
                        className="underline text-[#4881FF] hover:text-blue-700 text-xs sm:text-sm">
                        {file.fileName} 다운로드
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-10 gap-2">
              <div className="py-2  text-[#4881FF] font-medium text-xs mr-1 sm:text-sm sm:mr-5">
                과제 제출이 완료되었습니다.
              </div>
              <button
                type="button"
                onClick={handleEditMode}
                className="text-white bg-[#6B6B6B] rounded-md hover:bg-[#525252] text-xs px-3 sm:px-4 sm:py-2 sm:text-sm">
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
                className="w-full h-50 bg-[#F9F9F9] border-t-2 border-[#232323] focus:outline-none p-5 text-sm sm:text-base sm:p-8"
                placeholder="답안을 작성하세요."
                value={content}
                onChange={handleContentChange}
              />
            </div>

            {/* 파일 업로드 영역 */}
            {canUploadFiles && (
              <>
                <h1 className="text-base sm:text-2xl font-bold mb-3 sm:mb-6">
                  파일 업로드
                </h1>

                <div
                  ref={dropZoneRef}
                  className={`bg-[#F9F9F9] mt-3 mb-6 border-t-2 border-[#232323] p-5 sm:p-8 text-xs sm:text-sm transition-colors duration-200 ${
                    isDragOver ? "bg-blue-50 border-blue-400" : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}>
                  {/* 기존 제출된 파일들 (수정 모드일 때만 표시) */}
                  {isEditMode && submittedFiles.length > 0 && (
                    <div className="mb-1">
                      {submittedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center">
                          <span className="underline text-[#4881FF] hover:text-blue-700 flex items-center">
                            {file.fileName}
                          </span>
                          <button
                            type="button"
                            className="text-xs underline text-[#353535] hover:text-[#000000]"
                            onClick={() => handleSubmittedFileRemove(idx)}>
                            삭제
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 새 파일 추가 영역 */}
                  {files.length > 0 && (
                    <div className="mb-6">
                      {files.map((f, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center mb-1">
                          <span className="underline text-[#4881FF] hover:text-blue-700 flex items-center">
                            {f.name}
                          </span>
                          <button
                            type="button"
                            className="text-xs underline text-[#353535] hover:text-[#000000]"
                            onClick={() => handleFileRemove(idx)}>
                            삭제
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    className={`cursor-pointer hover:text-gray-700 text-xs sm:text-sm mt-6 mb-1 transition-colors duration-200 ${
                      isDragOver
                        ? "text-blue-600 font-semibold"
                        : "text-gray-500"
                    }`}
                    onClick={() => fileInputRef.current?.click()}>
                    <span className="underline font-semibold">파일선택</span>{" "}
                    {isDragOver
                      ? "또는 여기로 파일을 끌어오세요."
                      : "또는 여기로 파일을 끌어오세요."}
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    ref={fileInputRef}
                    disabled={isUploading}
                  />
                </div>
              </>
            )}

            <div className="flex justify-end gap-2 mb-10">
              <button
                type="submit"
                disabled={isUploading}
                className="py-2 text-white bg-[#4881FF] rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs px-3 sm:px-4 sm:py-2 sm:text-sm">
                {isUploading
                  ? "처리 중..."
                  : isSubmitted
                  ? "수정하기"
                  : "과제 제출"}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isUploading}
                  className="text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 text-xs px-3 sm:px-4 sm:py-2 sm:text-sm">
                  취소
                </button>
              )}
            </div>
          </form>
        )}

        {!isEditMode && (
          <AssignmentAdminComments feedback={assignment.feedback} />
        )}
      </div>
    </div>
  );
}
