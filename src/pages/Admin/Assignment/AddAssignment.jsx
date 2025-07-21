import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/axios";
import axios from "axios";

export default function AddAssignment() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileFormat, setFileFormat] = useState("Subjective");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // S3에 파일 업로드 함수
  const uploadFileToS3 = async (file) => {
    try {
      // presigned URL 요청 (파일명, MIME 타입 전달)
      const presignedRes = await API.post("/s3/presigned-urls", [
        {
          fileName: file.name,
          mimeType: file.type,
        },
      ]);

      const { uploadUrl, cdnUrl, fileKey, key } = presignedRes.data[0];

      // presigned URL로 실제 파일 업로드 (PUT)
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
      let uploadedFileData = [];

      if (fileFormat === "file") {
        // 선택한 파일들 S3에 업로드
        const uploadPromises = selectedFiles.map((file) =>
          uploadFileToS3(file)
        );
        uploadedFileData = await Promise.all(uploadPromises);
      }

      // 항상 quizType은 ESSAY_QUESTION, files는 파일첨부 시 업로드한 파일 데이터, 아니면 빈 배열
      const assignmentData = {
        title,
        description,
        trackType: "BACKEND",
        quizType: "ESSAY_QUESTION",
        files: fileFormat === "file" ? uploadedFileData : [],
      };

      console.log("등록할 과제 데이터:", assignmentData);

      // 과제 등록 API 호출
      await API.post("/admin/assignment/upload", assignmentData);

      alert("과제가 등록되었습니다.");
      setTitle("");
      setDescription("");
      setFileFormat("Subjective");
      setSelectedFiles([]);
      navigate(-1);
    } catch (error) {
      console.error("과제 등록 오류:", error);
      alert("과제 등록 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12">
        <div className="flex items-center justify-between">
          <p className="text-4xl font-bold my-15">BACK-END 과제 등록</p>
        </div>

        <div className="border-t-2 border-[#232323]">
          <form onSubmit={handleSubmit}>
            <div className="w-2/5">
              {/* 과제 제목 */}
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

              {/* 과제 설명 */}
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

              {/* 문제 형식 */}
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

              {/* 파일 업로드 */}
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
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                          <span
                            title={`${file.name} (${Math.round(
                              file.size / 1024
                            )}KB)`}>
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="ml-2 text-gray-500 hover:text-red-500">
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 버튼 영역 */}
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
                {isUploading ? "업로드 중..." : "등록하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
