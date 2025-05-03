import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../../utils/axios";

const AdminCCLecture = () => {
  const { track } = useParams();
  const trackParam = track.replace("-", "").toUpperCase();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(track);

  const itemsPerPage = 10;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await API.get(`/lecture/all/${trackParam}`, {
          withCredentials: true,
        });
        console.log(response.data);
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

  return (
    <div className="max-w-5xl mx-auto mt-44 pb-10 px-4">
      <h1 className="text-4xl fontBold mb-20">{track} 자료실</h1>
      <div className="text-sm text-gray-500 mb-6">
        홈 &gt; 사이버캠퍼스 &gt; 자료실
      </div>

      <table className="w-full text-center border-t-[0.5px] border-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 border-b-[0.5px]">번호</th>
            <th className="py-2 border-b-[0.5px]">제목</th>
            <th className="py-2 border-b-[0.5px]">수정</th>
            <th className="py-2 border-b-[0.5px]">선택</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.id} className="hover:bg-blue-50 cursor-pointer">
              <td className="py-2 border-b-[0.5px]">{i + 1}</td>
              <td className="py-2 border-b-[0.5px] text-left pl-4">
                {item.title}
              </td>
              <td className="py-2 border-b-[0.5px]">수정</td>
              <td className="py-2 border-b-[0.5px]">
                <input type="checkbox" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-6 text-sm">
        <Link to={`/admin/LectureManagement/${track}/LectureUpload`}>
          <div className="bg-[#3B79FF] text-white px-3 py-2 rounded-lg ">
            자료 등록
          </div>
        </Link>
        <div className="flex">
          <div className="bg-[#E9E9E9] text-[#838383] px-3 py-2 rounded-lg">
            전체 선택
          </div>
          <div className="bg-[#6C6868] text-white px-3 py-2 rounded-lg ml-3">
            선택 삭제
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 text-sm text-gray-700">
        <div>
          전체 게시물 수: {totalItems} &nbsp; 전체 페이지 수: {totalPages}
        </div>
        <div className="space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} className="border px-3 py-1">
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end items-center mt-4 space-x-2 text-sm">
        <select className="border px-2 py-1">
          <option>제목</option>
          <option>작성자</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          className="border px-2 py-1"
        />
        <button className="border px-3 py-1">검색</button>
      </div>
    </div>
  );
};

export default AdminCCLecture;
