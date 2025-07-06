import React, { useState } from "react";
import axios from "axios";
import API from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const [thumbnail, setThumbnail] = useState(null);
  const [formData, setFormData] = useState({
    classTh: "",
    title: "",
    subTitle: "",
    projectUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // S3에 이미지 업로드하는 함수
  const uploadImageToS3 = async (file) => {
    try {
      const presignedRes = await API.post("/s3/presigned-urls", [
        {
          fileName: file.name,
          mimeType: file.type,
        },
      ]);

      const { uploadUrl, cdnUrl, fileKey, key } = presignedRes.data[0];

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
      console.error("업로드 중 에러", err);
      throw err;
    }
  };

  // 프로젝트 등록 함수
  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.subTitle ||
      !formData.classTh ||
      !formData.projectUrl ||
      !thumbnail
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // 이미지 S3에 업로드
      const fileInfo = await uploadImageToS3(thumbnail);

      // 프로젝트 데이터
      const projectData = {
        classTh: formData.classTh,
        title: formData.title,
        subTitle: formData.subTitle,
        projectUrl: formData.projectUrl,
        imageName: fileInfo.fileName.split(".")[0], // 확장자 제거
        imageType: fileInfo.fileType,
        fileSize: fileInfo.fileSize,
        imageUrl: fileInfo.fileUrl,
        imageKey: fileInfo.fileKey,
      };

      // 프로젝트 등록 요청
      const response = await API.post("/admin/project/add", projectData);

      console.log("프로젝트 등록 성공:", response.data);
      alert("프로젝트가 성공적으로 등록되었습니다!");

      // 폼 초기화
      setFormData({
        classTh: "",
        title: "",
        subTitle: "",
        projectUrl: "",
      });
      setThumbnail(null);

      navigate("/admin/project");
    } catch (error) {
      console.error("프로젝트 등록 오류:", error);
      alert("프로젝트 등록 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      classTh: "",
      title: "",
      subTitle: "",
      projectUrl: "",
    });
    setThumbnail(null);

    navigate("/admin/project");
  };

  return (
    <>
      <div className="min-h-screen mx-auto bg-black text-white">
        <div className="w-4/5 mx-auto py-40">
          {/* 제목 */}
          <div className="pb-16 mx-auto text-center font-extrabold md:w-fit md:pr-20 md:text-start md:mx-0">
            <div className="text-[40px] text-[#3B79FF]">LIKELION</div>
            <div className="text-[55px] text-white">PROJECTS</div>
          </div>

          <div className="mx-[7%] text-xl ">
            <p className="text-3xl pb-10 mb-15 border-b-1 font-bold">
              프로젝트 등록
            </p>

            <div>
              <p className="mb-5">프로젝트 제목 입력</p>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="text-lg text-[#3b3b3b] min-w-[500px] w-2/5 p-3.5 mt-2 mb-4 bg-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="제목을 입력해주세요."
              />
            </div>

            <div className="mt-15">
              <p className="mb-5">프로젝트 부제목 입력</p>
              <input
                type="text"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleInputChange}
                className="text-lg text-[#3b3b3b] min-w-[500px] w-2/5 p-3.5 mt-2 mb-4 bg-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="부제목을 입력해주세요."
              />
            </div>

            <div className="mt-15">
              <p className="mb-5">기수</p>
              <input
                type="number"
                name="classTh"
                value={formData.classTh}
                onChange={handleInputChange}
                className="text-lg text-[#3b3b3b] min-w-[500px] w-2/5 p-3.5 mt-2 mb-4 bg-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="숫자만 입력해주세요."
              />
            </div>

            <div className="mt-15">
              <p className="mb-5">프로젝트 URL</p>
              <input
                type="url"
                name="projectUrl"
                value={formData.projectUrl}
                onChange={handleInputChange}
                className="text-lg text-[#3b3b3b] min-w-[500px] w-2/5 p-3.5 mt-2 mb-4 bg-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="프로젝트 URL을 입력해주세요."
              />
            </div>

            {/* 썸네일 첨부 */}
            <div className="mt-10">
              <p className="mb-5">썸네일 첨부</p>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="text-lg bg-white text-[#3b3b3b] w-2/5 min-w-[500px] px-8 py-3.5 rounded-md cursor-pointer"
                onClick={() =>
                  document.getElementById("thumbnailInput").click()
                }>
                {thumbnail ? (
                  <span>{thumbnail.name}</span>
                ) : (
                  <span className="text-[#3b3b3b]/[.5]">
                    <span className="underline text-black">파일선택</span>{" "}
                    <span className="text-base">
                      &nbsp; 또는 여기로 파일을 끌어오세요.
                    </span>
                  </span>
                )}
              </div>
              <input
                type="file"
                id="thumbnailInput"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex items-center justify-end mt-25">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-5.5 py-2 rounded-sm cursor-pointer mr-10 ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#3B79FF] hover:bg-blue-600"
                }`}>
                {isLoading ? "등록 중..." : "등록하기"}
              </button>
              <button
                className="text-[#232323] bg-[#E9E9E9] px-5.5 py-2 rounded-sm cursor-pointer hover:bg-gray-300"
                onClick={handleCancel}>
                취소하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
