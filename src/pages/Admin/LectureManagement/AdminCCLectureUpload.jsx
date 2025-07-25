import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../utils/axios";
import axios from "axios";
import FileUploader from "../../../components/FileUploader";
import Breadcrumb from "../../../components/Breadcrumb";

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
      // presigned URL 요청
      const presignedReqBody = files.map(({ file }) => ({
        fileName: file.name,
        mimeType: file.type,
      }));

      const presignedRes = await axios.post(
        "https://backend.sku-sku.com/s3/presigned-urls",
        presignedReqBody,
        { withCredentials: true }
      );
      console.log(presignedRes.data);

      const presignedUrls = presignedRes.data;

      // presigned URL로 S3에 직접 업로드 (uploadUrl로 PUT요청)
      const uploadPromises = files.map((fileObj, idx) =>
        axios.put(presignedUrls[idx].uploadUrl, fileObj.file, {
          headers: { "Content-Type": fileObj.file.type },
        })
      );
      await Promise.all(uploadPromises);

      // 업로드된 파일 정보로 게시물 등록
      const fileInfoList = presignedUrls.map((urlObj, idx) => {
        const { type } = files[idx].file;
        const [mainType, ext] = type.split("/");
        return {
          fileUrl: urlObj.cdnUrl,
          fileName: files[idx].file.name,
          fileType: `${ext.toUpperCase()}`, // 확장자만 대문자
          fileSize: files[idx].file.size,
          fileKey: urlObj.fileKey || urlObj.key || null,
        };
      });

      console.log(fileInfoList);
      // 강의 등록 요청
      const payload = {
        trackType: track.replace("-", "").toUpperCase(),
        title,
        content,
        files: fileInfoList,
      };

      console.log(JSON.stringify(payload, null, 2));

      // 업로드 완
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-28 pb-24">
      <h1 className="text-2xl sm:text-4xl fontBold sm:mb-20 mb-10">
        {track} 자료 등록
      </h1>
      <div className="mb-8">
        <Breadcrumb/>
      </div>
      <div className="border border-gray-200 mb-12"></div>

      <div className="mb-14">
        <h2 className="text-lg sm:text-xl fontSB sm:fontBold mb-4">
          자료 게시물 제목
        </h2>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력해 주세요."
          className="w-full max-w-md border border-gray-300 py-2 px-3 rounded-md placeholder-[#949494] text-sm"
        />
      </div>

      <div className="mb-12">
        <h3 className="text-lg sm:text-xl fontSB sm:fontBold mb-4">
          게시물 내용
        </h3>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="내용을 입력해 주세요."
          className="bg-[#F9F9F9] w-full h-40 resize-none p-4 rounded-md text-sm placeholder-[#949494]"
        />
      </div>

      <div className="mb-8">
        <FileUploader onUploadComplete={handleUploadComplete} />

        <div className="mt-12 text-right">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#4881FF] text-white rounded-md"
          >
            등록하기
          </button>
        </div>
      </div>

      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default AdminCCLectureUpload;
