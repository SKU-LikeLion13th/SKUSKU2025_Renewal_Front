import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LectureDetail = () => {
  const { id } = useParams();
  const [lecture, setLecture] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await axios.get(`/lecture/${id}`);
        setLecture(response.data);
      } catch (err) {
        setError("강의자료를 찾을 수 없습니다.");
      }
    };

    fetchLecture();
  }, [id]);

  if (error) {
    return <div className="mt-44 text-center">{error}</div>;
  }

  if (!lecture) {
    return <div className="mt-44 text-center">로딩 중...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-44 px-4 pb-20">
      {/* 제목 */}
      <h1 className="text-4xl fontBold mb-20">{lecture.trackType} 자료실</h1>

      {/* 경로 */}
      <div className="text-sm text-gray-500 mb-16">
        홈 &gt; 사이버캠퍼스 &gt; 자료실 &gt; 다운로드
      </div>

      {/* 강의 제목 */}
      <h2 className="text-xl fontSB mb-2">{lecture.title}</h2>

      {/* 강의 설명 (내용 박스) */}
      <h3 className="text-xl fontSB mb-4">강의 자료</h3>
      <div className="bg-gray-50 border border-gray-300 p-4 mb-20">
        {lecture.content && (
          <>
            <h3 className="text-xl fontSB mb-2">내용</h3>
            <div className="bg-gray-50 border border-gray-300 p-6 mb-10">
              {lecture.content}
            </div>
          </>
        )}
      </div>

      {/* 파일 다운로드 */}
      <h3 className="text-xl fontSB mb-4">파일 다운로드</h3>
      <div className="bg-gray-50 border border-gray-300 p-4">
        {lecture.joinLectureFiles?.map((file) => (
          <a
            key={file.fileName}
            href={`data:${file.fileType};base64,${file.file}`}
            download={file.fileName}
            className="text-blue-600 underline flex items-center mb-2"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
              alt="파일 아이콘"
              className="w-5 h-5 mr-2"
            />
            {file.fileName} ({(file.size / 1024).toFixed(1)} KB)
          </a>
        ))}
      </div>
    </div>
  );
};

export default LectureDetail;
