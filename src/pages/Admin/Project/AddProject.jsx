import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddProject() {
  const [thumbnail, setThumbnail] = useState(null);
  const [formData, setFormData] = useState({
    classTh: "",
    title: "",
    subTitle: "",
    projectUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [existingImageData, setExistingImageData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // 편집 모드 초기화
  useEffect(() => {
    if (
      location.state &&
      location.state.editMode &&
      location.state.projectData
    ) {
      const projectData = location.state.projectData;
      setEditMode(true);
      setProjectId(projectData.id);
      setFormData({
        classTh: projectData.classTh.toString(),
        title: projectData.title,
        subTitle: projectData.subTitle,
        projectUrl: projectData.projectUrl,
      });
      setExistingImageUrl(projectData.imageUrl);

      // 기존 이미지 데이터 저장
      setExistingImageData({
        imageName: projectData.imageName,
        imageType: projectData.imageType,
        fileSize: projectData.fileSize,
        imageUrl: projectData.imageUrl,
        imageKey: projectData.imageKey,
      });
    }
  }, [location.state]);

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

  // 프로젝트 등록/수정 함수
  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.subTitle ||
      !formData.classTh ||
      !formData.projectUrl ||
      (!thumbnail && !existingImageUrl)
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      let projectData = {
        classTh: formData.classTh, // 문자열로 전송
        title: formData.title,
        subTitle: formData.subTitle,
        projectUrl: formData.projectUrl,
      };

      // 새로운 이미지가 업로드된 경우
      if (thumbnail) {
        const fileInfo = await uploadImageToS3(thumbnail);
        projectData = {
          ...projectData,
          imageName: fileInfo.fileName.split(".")[0], // 확장자 제거
          imageType: fileInfo.fileType,
          fileSize: fileInfo.fileSize,
          imageUrl: fileInfo.fileUrl,
          imageKey: fileInfo.fileKey,
        };
      } else if (editMode && existingImageData) {
        // 수정 모드에서 기존 이미지 정보 유지
        projectData = {
          ...projectData,
          imageName: existingImageData.imageName,
          imageType: existingImageData.imageType,
          fileSize: existingImageData.fileSize,
          imageUrl: existingImageData.imageUrl,
          imageKey: existingImageData.imageKey,
        };
      }

      let response;
      if (editMode) {
        // 수정 모드 - id 포함해서 전송
        projectData.id = projectId;
        response = await API.put("/admin/project/update", projectData);
        alert("프로젝트가 성공적으로 수정되었습니다!");
      } else {
        // 등록 모드
        response = await API.post("/admin/project/add", projectData);
        alert("프로젝트가 성공적으로 등록되었습니다!");
      }

      // 폼 초기화
      setFormData({
        classTh: "",
        title: "",
        subTitle: "",
        projectUrl: "",
      });
      setThumbnail(null);
      setExistingImageUrl("");
      setExistingImageData(null);

      navigate("/admin/project");
    } catch (error) {
      console.error(`프로젝트 ${editMode ? "수정" : "등록"} 오류:`, error);
      alert(`프로젝트 ${editMode ? "수정" : "등록"} 중 오류가 발생했습니다.`);
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
    setExistingImageUrl("");
    setExistingImageData(null);

    navigate("/admin/project");
  };

  return (
    <>
      <div className="min-h-screen mx-auto bg-black text-white">
        <div className="w-full md:w-4/5 mx-auto py-30 md:py-40">
          {/* 제목 */}
          <div className="pb-10 sm:pb-16 mx-auto text-center font-extrabold md:w-fit md:pr-20 md:text-start md:mx-0">
            <div className="text-[35px] sm:text-[40px] text-[#3B79FF]">
              LIKELION
            </div>
            <div className="text-[50px] sm:text-[55px] text-white">
              PROJECTS
            </div>
          </div>

          <div className="mx-[7%] text-base sm:text-xl">
            <p className="text-2xl sm:text-3xl pb-5 sm:pb-10 mb-5 sm:mb-8 md:mb-15 border-b-1 font-bold">
              프로젝트 {editMode ? "수정" : "등록"}
            </p>

            <div>
              <p className="mb-2">프로젝트 제목 입력</p>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="text-sm md:text-lg text-[#3b3b3b] md:min-w-[500px] w-full md:w-2/5 p-3.5 mt-2 mb-4 bg-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="제목을 입력해주세요."
              />
            </div>

            <div className="mt-5 sm:mt-15">
              <p className="mb-2">프로젝트 부제목 입력</p>
              <input
                type="text"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleInputChange}
                className="text-sm md:text-lg text-[#3b3b3b] md:min-w-[500px] w-full md:w-2/5 p-3.5 mt-2 mb-4 bg-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="부제목을 입력해주세요."
              />
            </div>

            <div className="mt-5 sm:mt-15">
              <p className="mb-2">기수</p>
              <input
                type="number"
                name="classTh"
                value={formData.classTh}
                onChange={handleInputChange}
                className="text-sm md:text-lg text-[#3b3b3b] md:min-w-[500px] w-full md:w-2/5 p-3.5 mt-2 mb-4 bg-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="숫자만 입력해주세요."
              />
            </div>

            <div className="mt-5 sm:mt-15">
              <p className="mb-2">프로젝트 URL</p>
              <input
                type="url"
                name="projectUrl"
                value={formData.projectUrl}
                onChange={handleInputChange}
                className="text-sm md:text-lg text-[#3b3b3b] md:min-w-[500px] w-full md:w-2/5 p-3.5 mt-2 mb-4 bg-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="프로젝트 URL을 입력해주세요."
              />
            </div>

            {/* 썸네일 첨부 */}
            <div className="mt-5 sm:mt-15">
              <p className="mb-2">썸네일 첨부</p>
              {editMode && existingImageUrl && !thumbnail && (
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">현재 이미지:</p>
                  <img
                    src={existingImageUrl}
                    alt="현재 썸네일"
                    className="w-32 h-24 object-cover rounded-md"
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    새 이미지를 업로드하면 기존 이미지가 교체됩니다.
                  </p>
                </div>
              )}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="text-sm md:text-lg bg-white text-[#3b3b3b] w-full md:w-2/5 md:min-w-[500px] px-8 py-3.5 rounded-md cursor-pointer"
                onClick={() =>
                  document.getElementById("thumbnailInput").click()
                }>
                {thumbnail ? (
                  <span>{thumbnail.name}</span>
                ) : (
                  <span className="text-[#3b3b3b]/[.5]">
                    <span className="underline text-black">파일선택</span>{" "}
                    <span className="text-sm md:text-base">
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

            <div className="flex items-center justify-end mt-15 sm:mt-25">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`text-base px-5.5 py-2 md:text-xl rounded-sm cursor-pointer mr-5 md:mr-10 ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#3B79FF] hover:bg-blue-600"
                }`}>
                {isLoading
                  ? `${editMode ? "수정" : "등록"} 중...`
                  : `${editMode ? "수정하기" : "등록하기"}`}
              </button>
              <button
                className="text-[#232323] bg-[#E9E9E9] text-base px-5.5 py-2 md:text-xl rounded-sm cursor-pointer hover:bg-gray-300"
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
