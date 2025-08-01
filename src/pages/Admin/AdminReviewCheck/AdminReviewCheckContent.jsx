import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/axios";

const headers = ["이름", "제목", "점수", "횟수", "날짜"];

export default function AdminReviewCheckContent() {
  const { reviewWeekId } = useParams();
  const weekId = Number(reviewWeekId);

  // 기본 flexValues
  const [flexValues, setFlexValues] = useState(["1", "6", "1", "1", "1"]);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 화면 크기에 따라 flexValues 변경
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setFlexValues(["2", "4", "2", "2", "2"]); // 화면 작을 때 flexValues
      } else {
        setFlexValues(["1", "6", "1", "1", "1"]); // 화면 클 때 flexValues
      }
    }

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize); // 리사이즈 이벤트 등록
    return () => window.removeEventListener("resize", handleResize); // 정리
  }, []);

  useEffect(() => {
    if (!weekId) return;

    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const [year, month, day] = dateStr.split("T")[0].split("-");
      return `${year.slice(2)}.${month}.${day}`;
    };

    async function fetchData() {
      try {
        const res = await API.get(`/admin/reviewQuiz/${weekId}`);
        setPosts(
          res.data.lionQuizList.map((item, idx) => ({
            reviewWeekId: idx,
            lionName: item.lionName,
            title: res.data.title,
            score: item.score,
            total: item.total,
            count: item.count,
            updateDate: formatDate(item.updateDate),
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [weekId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[250px] sm:min-h-[500px]">
        로딩 중...
      </div>
    );

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

      <div className="flex w-full min-h-[250px] sm:min-h-[500px] flex-col">
        {posts.length > 0 ? (
          posts.map((item) => (
            <div
              key={item.reviewWeekId}
              className="flex w-full border-b border-b-[#E0E0E0] p-2 items-center"
            >
              <div
                className="flex justify-center px-1 text-[12px] sm:text-[13.5px] fontSB"
                style={{ flex: flexValues[0] }}
              >
                {item.lionName}
              </div>

              <div
                className="flex justify-start px-1 text-[12px] sm:text-[13.5px] cursor-pointer"
                style={{ flex: flexValues[1] }}
              >
                {item.title}
              </div>

              <div
                className="flex justify-center px-1 text-[12px] sm:text-[13.5px]"
                style={{ flex: flexValues[2] }}
              >
                <span className="text-[#0EC891]">{item.score}&nbsp;</span> / {item.total}
              </div>

              <div
                className="flex justify-center px-1 text-[12px] sm:text-[13.5px]"
                style={{ flex: flexValues[3] }}
              >
                {item.count}
              </div>

              <div
                className="flex justify-center px-1 text-[12px] sm:text-[13.5px]"
                style={{ flex: flexValues[4] }}
              >
                {item.updateDate}
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center min-h-[250px] sm:min-h-[500px] text-gray-500">
            제출한 아기사자가 없습니다.
          </div>
        )}
      </div>

      <div className="flex justify-between w-full mt-10 text-[14px] fontLight">
        <div className="flex bg-[#3B79FF] text-white px-4 py-1.5 mb-4 rounded-[5.95px] cursor-pointer">
          문제 등록
        </div>
      </div>
    </div>
  );
}
