import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../../utils/axios";
import { useDropzone } from "react-dropzone";

const AdminCCLectureEdit = () => {
  const { track, lectureId } = useParams();
  const trackParam = track.replace("-", "").toUpperCase();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLectureDetail = async () => {
      try {
        const response = await API.get(`/lecture/${lectureId}`);
        const lecture = response.data;
        setTitle(lecture.title);
        setContent(lecture.content);
      } catch (err) {
        console.error("상세 정보 불러오기 실패:", err);
        setError("강의자료 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchLectureDetail();
  }, [lectureId]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  // 파일 업로드 처리
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    multiple: true,
    accept: ".pdf, .doc, .docx, .pptx, .xlsx, .jpg, .png, .zip", // 허용된 파일 형식
  });

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("id", lectureId);
      formData.append("trackType", trackParam);
      formData.append("title", title);
      formData.append("content", content);

      // 파일이 있는 경우 formData에 추가
      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("files", file); // 서버에서 files를 배열로 받을 수 있어야 함
        });
      }

      // PUT 요청 보내기
      await API.put(`/admin/lecture/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("수정이 완료되었습니다.");
    } catch (err) {
      console.error("수정 중 오류:", err);
      setError("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-44 px-4 pb-20">
      <h1 className="text-4xl fontBold mb-20">{track} 자료 수정</h1>
      <div className="text-sm text-gray-500 mb-12">
        홈 &gt; 사이버캠퍼스 &gt; 자료실 &gt; 자료 수정
      </div>
      <div className="border w-full mb-12"></div>

      {/* 제목 */}
      <div className="mb-20">
        <h2 className="text-xl fontSB mb-8">자료 게시물 제목</h2>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력해 주세요."
          className="border-[0.5px] border-gray-350 py-3 px-3 w-120 rounded-md placeholder-[#949494]"
        />
      </div>

      {/* 내용 */}
      <div className="mb-16">
        <h3 className="text-xl fontSB mb-8">게시물 내용</h3>
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
            {files.length > 0 ? (
              <ul className="text-sm text-gray-700">
                {files.map((file, index) => (
                  <li key={index}>
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                <span className="fontBold underline mr-4">파일선택</span>또는
                여기로 파일을 끌어오세요.
              </p>
            )}
          </div>
        </div>

        {/* 수정 완료 버튼 */}
        <div className="flex items-center">
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-[#4881FF] text-white rounded-md"
          >
            수정 완료
          </button>
        </div>
      </div>

      {/* 오류 메시지 */}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default AdminCCLectureEdit;
