import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/axios";
import Breadcrumb from "../../../components/Breadcrumb";

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

  const handleFileDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("다운로드 실패");

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
      window.open(fileUrl, "_blank"); // 실패 시 백업
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-24 sm:mt-44 pb-24">
      {/* 제목 */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl fontBold mb-10 sm:mb-16">
        {lecture.trackType} 자료실
      </h1>

      {/* 경로 */}
      <div className="mb-12">
        <Breadcrumb />
      </div>

      <hr className="border border-gray-200 mb-12" />

      {/* 강의 제목 */}
      <h2 className="text-lg sm:text-xl fontSB sm:fontBold mb-4">
        {lecture.title}
      </h2>

      <div className="bg-[#F9F9F9] border-t-[1.5px] mb-12 sm:mb-20 text-sm sm:text-base">
        {lecture.content && (
          <div className="p-6 sm:p-8 whitespace-pre-line break-words">
            {lecture.content}
          </div>
        )}
      </div>

      {/* 파일 다운로드 */}
      <h3 className="text-lg sm:text-xl fontSB sm:fontBold mb-4">
        파일 다운로드
      </h3>
      <div className="bg-[#F9F9F9] border-t-[1.5px] p-6 sm:p-8">
        {lecture.joinLectureFiles?.map((file) => (
          <a
            key={file.fileName}
            onClick={() => handleFileDownload(file.fileUrl, file.fileName)}
            className="text-blue-500 underline flex items-center mb-2 text-xs sm:text-base"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
              alt="파일 아이콘"
              className="w-5 h-5 mr-2"
            />
            {file.fileName}
            {typeof file.size === "number" && (
              <span className="ml-1">({(file.size / 1024).toFixed(1)} KB)</span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LectureDetail;
