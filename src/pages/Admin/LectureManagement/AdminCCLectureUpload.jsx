import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../utils/axios";
import axios from "axios";
import FileUploader from "../../../components/FileUploader";

const AdminCCLectureUpload = () => {
  const { track } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]); // 실제 파일 객체 저장
  const [error, setError] = useState(null);

  const fileUploaderRef = useRef();
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleUploadComplete = (selectedFiles) => {
    setFiles(selectedFiles); // [{ file: File, name: string, type: string }]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || files.length === 0) {
      alert("제목, 내용, 파일을 모두 입력해 주세요.");
      return;
    }

    try {
      // 1. presigned URL 요청
      const presignedReqBody = files.map((fileObj) => ({
        fileName: fileObj.file.name,
        mimeType: fileObj.file.type,
      }));

      const presignedRes = await axios.post(
        "https://backend.sku-sku.com/s3/presigned-urls",
        presignedReqBody,
        { withCredentials: true }
      );

      const presignedUrls = presignedRes.data;

      // 2. 실제 파일 S3에 업로드
      const uploadPromises = files.map((fileObj, idx) =>
        axios.put(presignedUrls[idx].uploadUrl, fileObj.file, {
          headers: { "Content-Type": fileObj.file.type },
        })
      );
      await Promise.all(uploadPromises);

      // 3. 강의 등록 요청
      const payload = {
        trackType: track.replace("-", "").toUpperCase(),
        title,
        content,
        fileUrls: presignedUrls.map((urlObj) => urlObj.cdnUrl),
      };

      const res = await API.post("/admin/lecture/add", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.status === 201) {
        alert("강의자료가 성공적으로 추가되었습니다.");
        navigate(`/admin/LectureManagement/${track}`);
      } else {
        throw new Error("등록 실패");
      }
    } catch (err) {
      console.error(err);
      setError("등록 중 오류가 발생했습니다.");
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-44 px-4 pb-20">
      <h1 className="text-4xl fontBold mb-20">{track} 자료 등록</h1>
      <div className="text-sm text-gray-500 mb-12">
        홈 &gt; 사이버캠퍼스 &gt; 자료실 &gt; 자료 등록
      </div>
      <div className="border w-full mb-12"></div>

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

      <div className="mb-16">
        <h3 className="text-xl fontSB mb-8">게시물 내용</h3>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="내용을 입력해 주세요."
          className="bg-[#F9F9F9] w-full h-30 resize-none p-5 placeholder-[#949494]"
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg fontSB mb-4">파일 업로드</h3>
        <FileUploader onUploadComplete={handleUploadComplete} error={error} />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-[#4881FF] text-white rounded-md"
        >
          등록하기
        </button>
      </div>

      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default AdminCCLectureUpload;
