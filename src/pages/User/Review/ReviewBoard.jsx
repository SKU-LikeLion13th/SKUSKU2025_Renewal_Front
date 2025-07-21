import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/axios";

const ReviewBoard = ({ trackType }) => {
  const navigate = useNavigate();
  const headers = ["번호", "제목", "제출여부", "나의점수"];
  const flexValues = ["1", "7", "1", "1"];
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await API.get(`/reviewWeek/${trackType}`);
        console.log("받아온 데이터:", response.data);

        const quizList = response.data.map((quiz, index) => ({
          Id: index + 1,
          title: quiz.title,
          score: quiz.score,
          total: quiz.total,
          IsSubmit: quiz.isSubmit,
          reviewWeekId: quiz.reviewWeekId,
        }));

        setQuizzes(quizList);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    if (trackType) {
      fetchQuizzes(); // 함수에 파라미터 직접 넘기지 않아도 됨 (useEffect에서 접근 가능)
    }
  }, [trackType]); // trackType이 바뀌면 다시 호출됨

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full border-t-[2.5px] border-t-[#232323] border-b border-b-[#9A9A9A] bg-[#F7F7F7] p-2">
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
        {quizzes.map((quiz) => (
          <div key={quiz.reviewWeekId} className="flex w-full border-b border-b-[#E0E0E0] p-2">
            <div className="flex justify-center px-1 text-[13.5px]" style={{ flex: flexValues[0] }}>
              {quiz.Id}
            </div>
            <div 
              className="flex justify-start px-1 text-[13.5px] cursor-pointer"
              style={{ flex: flexValues[1] }}
              onClick={() => navigate(`/cybercampus/quiz/${quiz.reviewWeekId}`, { state: { title: quiz.title } })}
            >
              {quiz.title}
            </div>
            <div
              className={`flex justify-center px-1 text-[13.5px] ${
                quiz.IsSubmit === "제출" ? "text-[#3B79FF] font-bold" : ""
              }`}
              style={{ flex: flexValues[2] }}
            >
              {quiz.IsSubmit}
            </div>
            <div className="flex justify-center px-1 text-[13.5px]" style={{ flex: flexValues[3] }}>
              {quiz.score} / {quiz.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewBoard;
