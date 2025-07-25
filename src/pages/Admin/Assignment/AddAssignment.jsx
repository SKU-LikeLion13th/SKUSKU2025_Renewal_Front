import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API from "../../../utils/axios";
import axios from "axios";
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
  const fileInputRef = useRef(null);

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

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

        // await API.put("/admin/assignment/update", assignmentData);
        alert("과제가 수정되었습니다.");
      } else {
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
      <div className="flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12">
        <div className="flex items-center justify-between">
          <p className="text-4xl font-bold my-15">
            {isEdit
              ? `${trackToTitle(track)} 과제 수정`
              : `${trackToTitle(track)} 과제 등록`}
          </p>
        </div>
        <div className="mb-10">
          <Breadcrumb/>
        </div>
        <div className="border-t-2 border-[#232323]">
          <form onSubmit={handleSubmit}>
            <div className="w-2/5">
              <div className="mt-8">
                <label className="text-xl font-bold mb-4 block">
                  과제 제목
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="과제 제목을 입력하세요."
                  className="w-full border border-gray-300 rounded p-3 text-base"
                />
              </div>

              <div className="mt-8">
                <label className="text-xl font-bold mb-4 block">
                  과제 설명
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="과제 설명을 입력하세요."
                  className="w-full border border-gray-300 rounded p-3 h-36 text-base"
                />
              </div>

              <div className="mt-8">
                <label className="text-xl font-bold mb-4 block">
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
                    <label htmlFor="subjective" className="text-base">
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
                    <label htmlFor="fileUpload" className="text-base">
                      파일첨부
                    </label>
                  </div>
                </div>
              </div>

              {fileFormat === "file" && (
                <div className="mt-8">
                  <div className="flex gap-4 items-center">
                    <label className="text-xl font-bold">파일 업로드</label>
                    <div
                      className="flex items-center border border-[#7D7D7D] rounded py-1.5 px-4"
                      onDragOver={handleDragOver}
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
                        className={`text-[#353535] underline ${
                          isUploading
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}>
                        {isUploading ? "업로드 중..." : "파일선택"}
                      </button>
                      <span className="ml-3 text-[#A6A6A6] text-sm">
                        또는 여기로 파일을 끌어오세요.
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
                            className={`px-3 py-1 rounded-full text-sm flex items-center ${
                              isOriginalFile
                                ? "bg-blue-100 border border-blue-300"
                                : "bg-gray-100"
                            }`}>
                            <span
                              title={`${fileName} (${Math.round(
                                fileSize / 1024
                              )}KB)${
                                isOriginalFile ? " - 기존 파일" : " - 새 파일"
                              }`}>
                              {fileName}
                              {isOriginalFile && (
                                <span className="ml-1 text-blue-600 text-xs">
                                  기존
                                </span>
                              )}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="ml-2 text-gray-500 hover:text-red-500">
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* 삭제 예정 파일들 표시 (개발자 확인용, 필요시 제거 가능) */}
                  {isEdit && deletedFiles.length > 0 && (
                    <div className="mt-2 text-red-600 text-sm">
                      삭제 예정:{" "}
                      {deletedFiles.map((f) => f.fileName || f.name).join(", ")}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="my-10 flex justify-end gap-4 w-full">
              <button
                type="button"
                className="min-w-25 py-1.5 cursor-pointer text-[#838383] bg-[#E9E9E9] rounded-md"
                onClick={() => navigate(-1)}>
                나가기
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className={`min-w-25 py-1.5 rounded-md text-white ${
                  isUploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#3B79FF] cursor-pointer"
                }`}>
                {isUploading
                  ? "업로드 중..."
                  : isEdit
                  ? "수정하기"
                  : "등록하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function trackToTitle(track) {
  const map = {
    BACKEND: "BACK-END",
    FRONTEND: "FRONT-END",
    DESIGN: "DESIGN",
  };
  return map[track?.toUpperCase()] || track;
}
