import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/axios";

const LectureDetail = () => {
  const { id } = useParams();
  const [lecture, setLecture] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await API.get(`/lecture/${id}`);
        setLecture(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("해당 강의 자료를 찾을 수 없습니다.");
        } else {
          setError("강의 자료를 불러오는 데 문제가 발생했습니다.");
        }
      }
    };

    fetchLecture();
  }, [id]);

  if (error) {
    return <div className="mt-44 text-center">{error}</div>;
  }

  if (!lecture) {
    return (
      <div className="mt-44 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <p>로딩 중...</p>
      </div>
    );
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

      <div className="bg-[#F9F9F9] border-t-[1.5px] mb-20 h-32">
        {lecture.content && <div className="p-8">{lecture.content}</div>}
      </div>

      {/* 파일 다운로드 */}
      <h3 className="text-xl fontSB mb-4">파일 다운로드</h3>
      <div className="bg-[#F9F9F9] border-t-[1.5px] p-8">
        {lecture.joinLectureFiles?.map((file) => (
          <a
            key={file.fileName}
            href={`data:${file.fileType};base64,${file.file}`}
            download={file.fileName}
            className="text-blue-500 underline flex items-center mb-2 text-[14px]"
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
