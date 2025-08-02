import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../../utils/axios";
import LectureControls from "./LectureControls";
import LectureTable from "./LectureTable";
import Breadcrumb from "../../../components/Breadcrumb";

const AdminCCLecture = () => {
  const { track } = useParams();
  const trackParam = track.replace("-", "").toUpperCase();
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await API.get(`/lecture/all/${trackParam}`, {
          withCredentials: true,
        });

        setAllData(response.data);
        setData(response.data);
      } catch (err) {
        setError("강의 자료를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, [trackParam]);

  const toggleSelect = (id) => {
    setSelectedItems((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      setIsAllSelected(newSelected.length === data.length);
      return newSelected;
    });
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedItems.map((id) => {
          const lecture = data.find((item) => item.id === id);
          // const fileKey =
          //   lecture?.files?.map((f) => f.fileKey).filter(Boolean) || [];

          const fileKey = [];

          // 1. files 배열이 있다면 거기서 추출
          if (lecture?.files?.length > 0) {
            fileKey.push(
              ...lecture.files.map((f) => f.fileKey).filter(Boolean)
            );
          }

          // 2. fileKey가 문자열로 직접 존재한다면 그것도 추가
          if (lecture?.fileKey && typeof lecture.fileKey === "string") {
            fileKey.push(lecture.fileKey);
          }

          return API.delete(`/admin/lecture/${id}`, {
            // headers: { "Content-Type": "application/json" },
            data: { fileKey },
            // withCredentials: true,
          });
        })
      );
      const updated = data.filter((item) => !selectedItems.includes(item.id));
      setData(updated);
      setAllData(updated);
      setSelectedItems([]);
      alert("선택한 강의자료가 삭제되었습니다.");
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      const allIds = data.map((item) => item.id);
      setSelectedItems(allIds);
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleSearch = (term) => {
    const filtered = allData.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
    setData(filtered);
    setCurrentPage(1);
  };

  // 페이지네이션 계산
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  // 빈 행 포함한 배열 만들기
  const paddedItems = [
    ...currentItems,
    ...Array(itemsPerPage - currentItems.length).fill(null),
  ];

  return (
    <div className="flex flex-col justify-start w-9/12 mx-auto sm:mt-50 mt-30 lg:w-8/12">
      <h1 className="flex fontBold sm:text-[35px] text-[23px]">
        {track} 자료실
      </h1>
      <div className="flex justify-start w-full sm:mt-15 mt-8 pb-5">
        <Breadcrumb />
      </div>

      <div className="flex justify-center w-full mt-8">
        <LectureTable
          track={track}
          paddedItems={paddedItems}
          startIndex={startIndex}
          selectedItems={selectedItems}
          toggleSelect={toggleSelect}
        />
      </div>

      <div className="flex justify-between md:mt-12 mt-6 text-sm">
        <Link to={`/admin/LectureManagement/${track}/LectureUpload`}>
          <div className="bg-[#3B79FF] text-white px-3 py-2 rounded-lg text-xs sm:text-sm md:text-base">
            자료 등록
          </div>
        </Link>
        <div className="flex">
          <button
            onClick={handleSelectAll}
            className="bg-[#E9E9E9] text-[#838383] px-3 py-2 rounded-lg text-xs sm:text-sm md:text-base "
          >
            {isAllSelected ? "선택 해제" : "전체 선택"}
          </button>
          <button
            onClick={handleDelete}
            disabled={selectedItems.length === 0}
            className={`px-3 py-2 rounded-lg ml-3 transition text-xs sm:text-sm md:text-base ${
              selectedItems.length > 0
                ? "bg-[#FF4D4D] text-white"
                : "bg-[#6C6868] text-white opacity-50 cursor-not-allowed"
            }`}
          >
            선택 삭제
          </button>
        </div>
      </div>

      <LectureControls
        totalItems={totalItems}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default AdminCCLecture;
