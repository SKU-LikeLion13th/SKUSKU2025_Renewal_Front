import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";

const headers = ["번호", "제목", "수정", "삭제"];
const flexValues = ["1", "7", "1", "1"];

export default function AdminReviewBoard({ posts, trackType, setAllPosts }) {
  const navigate = useNavigate();

  const handleDelete = async (weekId) => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await axios.delete(`/admin/reviewQuiz/delete/${weekId}`);
      setAllPosts((prevList) => prevList.filter((item) => item.reviewWeekId !== weekId));
      alert("삭제가 완료되었습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full sm:text-[15px] text-[13px] border-t-[2.5px] border-t-[#232323] border-b border-b-[#9A9A9A] bg-[#F7F7F7] p-2">
        {headers.map((header, index) => (
          <div
            key={index}
            className="flex justify-center px-1 fontBold"
            style={{ flex: flexValues[index] }}
          >
            {header}
          </div>
        ))}
      </div>

      <div className="flex w-full min-h-[590px] flex-col">
        {posts.length > 0 ? (
          posts.map((item, idx) => (
            <div
              key={item.reviewWeekId}
              className="flex w-full border-b border-b-[#E0E0E0] p-2 items-center"
            >
              <div className="flex justify-center px-1 text-[13.5px]" style={{ flex: flexValues[0] }}>
                {idx + 1}
              </div>

              <div
                className="flex justify-start px-1 text-[13.5px] cursor-pointer"
                style={{ flex: flexValues[1] }}
                onClick={() => navigate(`/admin/reviewQuiz/${trackType}/reviewUpdate/${item.reviewWeekId}`)}
              >
                {item.title}
              </div>

              <div
                className="flex justify-center px-1 text-[13.5px] cursor-pointer"
                style={{ flex: flexValues[2] }}
                onClick={() => navigate(`/admin/reviewQuiz/${trackType}/reviewUpdate/${item.reviewWeekId}`)}
              >
                수정
              </div>

              <div
                className="flex justify-center px-1 text-[13.5px] text-red-600 cursor-pointer underline"
                style={{ flex: flexValues[3] }}
                onClick={() => handleDelete(item.reviewWeekId)}
              >
                삭제
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center p-10 text-gray-500">등록된 과제가 없습니다.</div>
        )}

        <div className="flex justify-between w-full mt-10 text-[14px] fontLight">
          <div
            className="flex bg-[#3B79FF] text-white px-4 py-1.5 rounded-[5.95px] cursor-pointer"
            onClick={() => navigate(`/admin/reviewQuiz/${trackType}/reviewAdd`)}
          >
            문제 등록
          </div>
        </div>
      </div>
    </div>
  );
}
