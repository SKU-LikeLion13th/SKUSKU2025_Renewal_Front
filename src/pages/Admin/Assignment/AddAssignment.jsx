import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API from "../../../utils/axios";
import axios from "axios";
import TrackTitle from "../../../components/TrackTitle";
import Breadcrumb from "../../../components/Breadcrumb";

export default function AddAssignment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { track } = useParams();

  const { state } = location;
  const isEdit = state?.isEdit || false;
  const assignmentId = state?.assignmentId || null;
  const initialData = state?.assignmentDetail || {};

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileFormat, setFileFormat] = useState("Subjective");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [originalFiles, setOriginalFiles] = useState([]); // 원본 파일들 저장
  const [deletedFiles, setDeletedFiles] = useState([]); // 삭제된 파일들 추적
  const [isUploading, setIsUploading] = useState(false);

  // 드래그 앤 드롭 상태
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");

      if (initialData.files && initialData.files.length > 0) {
        setFileFormat("file");
        // 기존 파일들 저장 (File 객체가 아닌 형태로)
        setOriginalFiles(initialData.files);
        setSelectedFiles(initialData.files);
      } else {
        setFileFormat("Subjective");
      }
    }
  }, [isEdit, initialData]);

  // S3 업로드 함수 (기존과 동일)
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
        fileType: file.type.split("/")[1].toUpperCase(),
        fileKey: fileKey || key || null,
      };
    } catch (err) {
      console.error("파일 업로드 중 에러:", err);
      throw err;
    }
  };

  const handleFileSelectClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  // 개선된 드래그 앤 드롭 이벤트 핸들러
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

    if (e.dataTransfer.files.length > 0) {
      setSelectedFiles((prev) => [
        ...prev,
        ...Array.from(e.dataTransfer.files),
      ]);
    }
  };

  const handleRemoveFile = (index) => {
    const fileToRemove = selectedFiles[index];

    // 원본 파일인지 확인 (File 객체가 아닌 경우 = 기존에 업로드된 파일)
    if (!(fileToRemove instanceof File)) {
      setDeletedFiles((prev) => [
        ...prev,
        {
          ...fileToRemove,
          status: "DELETE",
        },
      ]);
    }

    // selectedFiles에서 제거
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("과제 제목을 입력해주세요.");
      return;
    }
    if (!description.trim()) {
      alert("과제 설명을 입력해주세요.");
      return;
    }
    if (fileFormat === "file" && selectedFiles.length === 0) {
      alert("최소 하나의 파일을 선택해주세요.");
      return;
    }

    setIsUploading(true);

    try {
      let fileData = [];

      if (fileFormat === "file") {
        if (isEdit) {
          // 수정 모드: 변경사항만 처리

          // 1. 새로 추가된 파일들 업로드 (File 객체인 것들)
          const newFiles = selectedFiles.filter((file) => file instanceof File);
          const uploadPromises = newFiles.map((file) => uploadFileToS3(file));
          const uploadedFiles = await Promise.all(uploadPromises);

          // 2. 새로 업로드된 파일들에 NEW status 추가
          const newFileData = uploadedFiles.map((file) => ({
            ...file,
            status: "NEW",
          }));

          // 3. 삭제된 파일들과 새로 추가된 파일들만 포함
          fileData = [...deletedFiles, ...newFileData];
        } else {
          // 등록 모드: 기존 로직 유지
          const filesToUpload = selectedFiles.filter((f) => f instanceof File);
          const uploadPromises = filesToUpload.map((file) =>
            uploadFileToS3(file)
          );
          fileData = await Promise.all(uploadPromises);
        }
      }

      // payload 준비
      const assignmentData = {
        ...(isEdit && { assignmentId }),
        title,
        description,
        trackType: track.toUpperCase(),
        quizType: "ESSAY_QUESTION",
        files: fileFormat === "file" ? fileData : [],
      };

      if (isEdit) {
        console.log("수정할 과제 데이터:", assignmentData);
        console.log("파일 변경사항:", {
          deletedFiles: deletedFiles,
          newFiles: fileData.filter((f) => f.status === "NEW"),
        });

        await API.put("/admin/assignment/update", assignmentData);
        alert("과제가 수정되었습니다.");
      } else {
        console.log("등록할 과제 데이터:", assignmentData);
        await API.post("/admin/assignment/upload", assignmentData);
        alert("과제가 등록되었습니다.");
      }

      navigate(-1);
    } catch (error) {
      console.error("과제 저장 오류:", error);
      alert("과제 저장 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col justify-start w-9/12 mx-auto sm:mt-50 mt-30 lg:w-8/12">
        <div className="flex items-center justify-between">
          {isEdit ? (
            <TrackTitle suffix="과제 수정" />
          ) : (
            <TrackTitle suffix="과제 등록" />
          )}
        </div>
        <div className="flex justify-start w-full sm:mt-15 mt-8 pb-5 mb-6">
          <Breadcrumb />
        </div>
        <div className="border-t-2 border-[#232323]">
          <form onSubmit={handleSubmit}>
            <div className="w-full lg:w-2/5">
              <div className="mt-8">
                <label className="font-bold mb-4 block text-lg sm:text-xl">
                  과제 제목
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="과제 제목을 입력하세요."
                  className="w-full border border-gray-300 rounded p-3 text-sm sm:text-base"
                />
              </div>

              <div className="mt-8">
                <label className="font-bold mb-4 block text-lg sm:text-xl">
                  과제 설명
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="과제 설명을 입력하세요."
                  className="w-full border border-gray-300 rounded p-3 h-36 text-sm sm:text-base"
                />
              </div>

              <div className="mt-8">
                <label className="font-bold mb-4 block text-lg sm:text-xl">
                  문제 형식
                </label>
                <div className="flex justify-evenly items-center border border-gray-300 rounded p-4">
                  <div className="flex items-center gap-2 mr-10">
                    <input
                      type="radio"
                      id="subjective"
                      name="fileFormat"
                      checked={fileFormat === "Subjective"}
                      onChange={() => setFileFormat("Subjective")}
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor="subjective"
                      className="text-sm sm:text-base">
                      주관식
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="fileUpload"
                      name="fileFormat"
                      checked={fileFormat === "file"}
                      onChange={() => setFileFormat("file")}
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor="fileUpload"
                      className="text-sm sm:text-base">
                      파일첨부
                    </label>
                  </div>
                </div>
              </div>

              {fileFormat === "file" && (
                <div className="mt-8">
                  <div className="flex flex-col gap-4 sm:items-center sm:flex sm:flex-row">
                    <label className="font-bold text-lg sm:text-xl">
                      파일 업로드
                    </label>
                    <div
                      ref={dropZoneRef}
                      className={`flex items-center border rounded py-1.5 px-4 transition-all duration-200 ${
                        isDragOver
                          ? "border-blue-400 bg-blue-50"
                          : "border-[#7D7D7D] bg-white"
                      }`}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}>
                      <input
                        type="file"
                        ref={fileInputRef}
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isUploading}
                      />
                      <button
                        type="button"
                        onClick={handleFileSelectClick}
                        disabled={isUploading}
                        className={`text-sm underline ${
                          isUploading
                            ? "cursor-not-allowed opacity-50 text-gray-400"
                            : isDragOver
                            ? "cursor-pointer text-blue-600 font-semibold"
                            : "cursor-pointer text-[#353535]"
                        }`}>
                        {isUploading ? "업로드 중..." : "파일선택"}
                      </button>
                      <span
                        className={`ml-3 text-xs transition-colors duration-200 ${
                          isDragOver
                            ? "text-blue-600 font-medium"
                            : "text-[#A6A6A6]"
                        }`}>
                        {isDragOver
                          ? "또는 여기로 파일을 끌어오세요."
                          : "또는 여기로 파일을 끌어오세요."}
                      </span>
                    </div>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedFiles.map((file, index) => {
                        const fileName = file.name || file.fileName || "파일";
                        const fileSize = file.size || file.fileSize || 0;
                        const isOriginalFile = file.isOriginal;

                        return (
                          <div
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs flex items-center sm:text-sm ${
                              isOriginalFile
                                ? "bg-blue-100 border border-blue-300"
                                : "bg-gray-100"
                            }`}>
                            <span>{fileName}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="ml-2 text-gray-500 hover:text-red-500 transition-colors duration-150">
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="my-10 flex justify-end gap-4 w-full text-sm sm:text-base">
              <button
                type="submit"
                disabled={isUploading}
                className={`px-3 py-1.5 rounded-md text-white sm:min-w-25 transition-colors duration-200 ${
                  isUploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#3B79FF] cursor-pointer hover:bg-blue-600"
                }`}>
                {isUploading
                  ? "업로드 중..."
                  : isEdit
                  ? "수정하기"
                  : "등록하기"}
              </button>
              <button
                type="button"
                className="px-5 py-1.5 cursor-pointer text-[#838383] bg-[#E9E9E9] rounded-md sm:min-w-25 hover:bg-gray-300 transition-colors duration-200"
                onClick={() => navigate(-1)}>
                나가기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
