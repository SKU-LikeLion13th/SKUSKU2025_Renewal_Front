import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAssignment() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileFormat, setFileFormat] = useState("Subjective"); // 주관식 or 파일첨부
  const [fileFormats, setFileFormats] = useState([]); // 파일 포맷 목록
  const [fileFormatInput, setFileFormatInput] = useState("");
  const fileInputRef = useRef(null);

  // 파일 포맷 추가
  const handleAddFileFormat = () => {
    if (fileFormatInput.trim() === "") return;
    setFileFormats([...fileFormats, fileFormatInput]);
    setFileFormatInput("");
  };

  // 파일 포맷 엔터키로 추가
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFileFormat();
    }
  };

  // 파일 선택 버튼 클릭
  const handleFileSelectClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택시 처리
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => file.name);
      setFileFormats([...fileFormats, ...newFiles]);
    }
  };

  // 드래그 이벤트 처리
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 파일 드롭 처리
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(
        (file) => file.name
      );
      setFileFormats([...fileFormats, ...newFiles]);
    }
  };

  // 파일 삭제 처리
  const handleRemoveFile = (index) => {
    const updatedFiles = [...fileFormats];
    updatedFiles.splice(index, 1);
    setFileFormats(updatedFiles);
  };

  // 등록하기 버튼 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!title.trim()) {
      alert("과제 제목을 입력해주세요.");
      return;
    }

    if (!description.trim()) {
      alert("과제 설명을 입력해주세요.");
      return;
    }

    if (fileFormat === "file" && fileFormats.length === 0) {
      alert("최소 하나의 파일 포맷을 추가해주세요.");
      return;
    }

    // 과제 데이터 구성
    const assignmentData = {
      title,
      description,
      fileFormat,
      fileFormats: fileFormat === "file" ? fileFormats : [],
    };

    console.log("제출할 과제 데이터:", assignmentData);
    alert("과제가 등록되었습니다.");

    // 폼 초기화
    setTitle("");
    setDescription("");
    setFileFormat("file");
    setFileFormats([]);
  };

  return (
    <>
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

                {/* 파일 업로드 - 파일첨부 형식일 때만 표시 */}
                {fileFormat === "file" && (
                  <div className="mt-8">
                    {/* 파일 업로드 라벨과 선택 버튼을 한 줄에 표시 */}
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
                        />
                        <button
                          type="button"
                          onClick={handleFileSelectClick}
                          className="text-[#353535] underline cursor-pointer">
                          파일선택
                        </button>
                        <span className="ml-3 text-[#A6A6A6] text-sm">
                          또는 여기로 파일을 끌어오세요.
                        </span>
                      </div>
                    </div>

                    {/* 선택된 파일 포맷 목록 - 별도의 줄에 표시 */}
                    {fileFormats.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {fileFormats.map((format, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                            <span>{format}</span>
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

              {/* 버튼 영역 - 폼 요소와 별개로 전체 너비에서 오른쪽에 배치 */}
              <div className="my-10 flex justify-end gap-4 w-full">
                <button
                  type="button"
                  className="min-w-25 py-1.5 cursor-pointer text-[#838383] bg-[#E9E9E9] rounded-md"
                  onClick={() => {
                    navigate(-1);
                  }}>
                  나가기
                </button>
                <button
                  type="submit"
                  className="min-w-25 py-1.5 bg-[#3B79FF] cursor-pointer text-white rounded-md">
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
