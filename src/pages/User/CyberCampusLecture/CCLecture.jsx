import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../../utils/axios";
import LectureControls from "../../Admin/LectureManagement/LectureControls";
import LectureTable from "./LectureTable";

const CyberCampusLecture = () => {
  const { track } = useParams();
  const trackParam = track.replace("-", "").toUpperCase();
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        const response = await API.get(`/lecture/all/${trackParam}`, {
          withCredentials: true,
        });
        setAllData(response.data);
        setData(response.data);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("예상치 못한 데이터 구조:", response.data);
          setData([]);
        }
      } catch (error) {
        console.error("강의자료 불러오기 실패:", error);
        setData([]);
      }
    };

    fetchLectureData();
  }, [trackParam]);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    const filtered = allData.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setData(filtered);
    setCurrentPage(1);
  };

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const paddedItems = [
    ...data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    ...Array(Math.max(15 - data.length, 0)).fill(null),
  ];

  return (
    <div className="max-w-5xl mx-auto mt-44 pb-10 px-4">
      <h1 className="text-4xl fontBold mb-20">{track} 자료실</h1>
      <div className="text-sm text-gray-500 mb-6">
        홈 &gt; 사이버캠퍼스 &gt; 자료실
      </div>

      <LectureTable data={paddedItems} />

      <LectureControls
        totalItems={data.length}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default CyberCampusLecture;
