import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../../utils/axios";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Breadcrumb from "../../../components/Breadcrumb";

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
        console.log(lecture);
        setTitle(lecture.title);
        setContent(lecture.content || "");
        setFiles(
          lecture.joinLectureFiles.map((file) => ({
            ...file,
            fileName: file.fileName,
            // fileSize: file.Size,
            fileSize: file.fileSize ?? 0,
            // mimeType: file.mimeType,
            fileType: file.mimeType,
            fileUrl: file.fileUrl,
            fileKey: file.fileKey,
            status: "KEEP",
          }))
        );
        console.log("joinLectureFiles:", lecture.joinLectureFiles);
        // console.log("파일 목록 확인", lecture.joinLectureFiles);
        console.log("params:", { track, lectureId });
      } catch (err) {
        console.error("상세 정보 불러오기 실패:", err);
        setError("강의자료 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchLectureDetail();
  }, [lectureId]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const uploaded = await Promise.all(
        acceptedFiles.map(async (file) => {
          try {
            // 1. presigned URL 요청
            const presignRes = await axios.post(
              "https://backend.sku-sku.com/s3/presigned-urls",
              [
                {
                  fileName: file.name,
                  mimeType: file.type,
                },
              ]
            );

            const presignData = Array.isArray(presignRes.data)
              ? presignRes.data[0]
              : presignRes.data;

            console.log("presignRes.data:", presignRes.data);
            console.log("file.type:", file.type);
            console.log("fileUrl:", presignData.fileUrl);
            console.log("fileKey:", presignData.fileKey);

            // 2. S3 업로드 (fetch 사용 권장)
            await fetch(presignData.uploadUrl, {
              method: "PUT",
              headers: {
                "Content-Type": file.type || "application/octet-stream",
              },
              body: file,
            });

            // 3. 업로드 성공 후 파일 정보 반환
            return {
              fileName: file.name,
              fileSize: file.size,
              fileType: file.type || "application/octet-stream",
              fileUrl: presignData.cdnUrl, // 보통 cdnUrl 또는 fileUrl
              fileKey: presignData.key,
              status: "NEW",
            };
          } catch (error) {
            console.error("파일 업로드 실패:", error);
            return null;
          }
        })
      );
      setFiles((prev) => [...prev, ...uploaded.filter((f) => f !== null)]);
    },

    multiple: true,
    accept: ".pdf, .doc, .docx, .pptx, .xlsx, .jpg, .png, .zip",
  });

  const handleFileDelete = (index) => {
    setFiles((prevFiles) => {
      const updated = [...prevFiles];
      if (updated[index].status === "NEW") {
        // 새로 추가된 파일은 그냥 목록에서 제거
        updated.splice(index, 1);
      } else {
        // 기존 파일은 status를 DELETE로 변경
        updated[index].status = "DELETE";
      }
      return [...updated];
    });
  };

  const handleUpdate = async () => {
    try {
      // 삭제된 파일을 제외하고 백엔드가 요구하는 모든 파일 상태 포함
      const payload = {
        id: parseInt(lectureId, 10),
        trackType: trackParam,
        title,
        content,
        files: files.map((f) => ({
          fileName: f.fileName,
          fileType: f.fileType,
          fileSize: f.fileSize,
          fileUrl: f.fileUrl,
          fileKey: f.fileKey,
          status: f.status,
        })),
      };
      console.log("업데이트 요청 payload:", JSON.stringify(payload, null, 2));

      await API.put("/admin/lecture/update", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      alert("수정이 완료되었습니다.");
    } catch (err) {
      console.error("수정 중 오류:", err);
      setError("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 mt-24 sm:mt-44 pb-24">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl fontBold mb-10 sm:mb-16">
        {track} 자료 수정
      </h1>
      <div className="mb-8">
        <Breadcrumb/>
      </div>

      <hr className="border border-gray-200 mb-12" />

      {/* 제목 */}
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

      {/* 내용 */}
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

      {/* 파일 업로드 */}
      <div className="mb-12">
        <h3 className="text-lg sm:text-xl fontSB sm:fontBold mb-4">
          파일 업로드
        </h3>
        <div
          {...getRootProps()}
          className="border border-gray-300 p-4 rounded-md cursor-pointer bg-white mb-4"
        >
          <input {...getInputProps()} />
          <p className="text-gray-500 text-sm">
            <span className="font-semibold underline mr-2">파일 선택</span>
            또는 여기로 파일을 끌어오세요.
          </p>
        </div>
        {files.length > 0 && (
          <ul className="text-sm text-gray-700 space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center flex-wrap gap-2"
              >
                <span>
                  {file.fileName} ({(file.fileSize / 1024).toFixed(1)} KB)
                  {file.status === "DELETE" && (
                    <span className="text-red-500 ml-2">[삭제됨]</span>
                  )}
                </span>
                {file.status !== "DELETE" && (
                  <button
                    onClick={() => handleFileDelete(index)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    삭제
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 버튼 */}
      <div className="flex justify-start">
        <button
          onClick={handleUpdate}
          className="px-6 py-2 bg-[#4881FF] text-white rounded-md text-sm"
        >
          수정 완료
        </button>
      </div>

      {/* 에러 메시지 */}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default AdminCCLectureEdit;
