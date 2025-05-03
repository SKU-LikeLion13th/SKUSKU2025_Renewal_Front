import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import API from "../../../utils/axios";

const AdminCCLectureUpload = () => {
  const { track } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  console.log(`이동할 경로: /LectureManagement/${track}`);

  // 제목 입력
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 내용
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // 드래그 앤 드롭 파일 처리
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]); // 첫 번째 파일만 사용
    },
    multiple: false,
    accept: ".pdf, .doc, .docx, .pptx, .xlsx, .jpg, .png, .zip",
  });

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file || !content) {
      alert("제목, 내용, 파일을 모두 입력해 주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("trackType", track.replace("-", "").toUpperCase());
    formData.append("title", title);
    formData.append("content", content);
    formData.append("files", file);
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(
          `${key}: ${value.name} (${value.type}, ${value.size} bytes)`
        );
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    try {
      const response = await API.post("/admin/lecture/add", formData, {
        headers: {
          credentials: "include",
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        alert("강의자료가 성공적으로 추가되었습니다.");
        navigate(`/admin/LectureManagement/${track}`);
      } else {
        throw new Error("강의자료를 추가하는 데 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("강의자료를 추가하는 데 실패했습니다.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-44 px-4 pb-20">
      {/* 제목 */}
      <h1 className="text-4xl fontBold mb-20">{track} 자료 등록</h1>

      {/* 경로 */}
      <div className="text-sm text-gray-500 mb-16">
        홈 &gt; 사이버캠퍼스 &gt; 자료실 &gt; 자료 등록
      </div>

      {/* 강의 제목 */}
      <div className="mb-20">
        <h2 className="text-xl fontSB mb-4">자료 게시물 제목</h2>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력해 주세요."
          className="border-[0.5px] border-gray-350 py-3 px-3 w-120 rounded-md placeholder-[#949494]"
        />
      </div>

      {/* 강의 설명 (내용 박스) */}
      <div className="mb-20">
        <h3 className="text-xl fontSB mb-4">게시물 내용</h3>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="내용을 입력해 주세요."
          className="bg-[#F9F9F9] w-full h-30 resize-none p-5 placeholder-[#949494]"
        />
      </div>

      {/* 파일 업로드 (드래그 앤 드롭) */}
      <div className="flex mb-6 items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-lg fontSB mr-4">파일 업로드</h3>
          <div
            {...getRootProps()}
            className="border px-5 py-2 border-gray-300 rounded-md cursor-pointer"
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="text-sm text-gray-700">
                선택한 파일: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                <span className="fontBold underline mr-4">파일선택</span>또는
                여기로 파일을 끌어오세요.
              </p>
            )}
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#4881FF] text-white rounded-md"
          >
            등록하기
          </button>
        </div>
      </div>

      {/* 오류 메시지 */}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default AdminCCLectureUpload;
