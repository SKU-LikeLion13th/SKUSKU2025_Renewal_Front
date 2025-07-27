import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/axios";

const ReviewBoard = ({ trackType }) => {
  const navigate = useNavigate();
  const headers = ["번호", "제목", "제출여부", "나의점수"];
  const [quizzes, setQuizzes] = useState([]);
  const [flexValues, setFlexValues] = useState(["1", "7", "1", "1"]);

  useEffect(() => {
    const updateFlexValues = () => {
      if (window.innerWidth < 640) {
        setFlexValues(["1", "5.5", "1.75", "1.75"]);
      } else {
        setFlexValues(["1", "7", "1", "1"]);
      }
    };

    updateFlexValues();
    window.addEventListener("resize", updateFlexValues);

    return () => window.removeEventListener("resize", updateFlexValues);
  }, []);

    useEffect(() => {
      const fetchQuizzes = async () => {
        try {
          const response = await API.get(`/reviewWeek/${trackType}`);
          console.log("받아온 데이터 (정렬 전):", response.data);
          console.log(response.data.map(d => d.reviewWeekId));

          const sortedResponseData = [...response.data].sort((a, b) => {
            return Number(b.reviewWeekId) - Number(a.reviewWeekId);
          });

          const quizList = sortedResponseData.map((quiz, index) => ({
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
        fetchQuizzes();
      }
    }, [trackType]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full sm:text-[15px] text-[12px] border-t-[2.5px] border-t-[#232323] border-b border-b-[#9A9A9A] bg-[#F7F7F7] p-2">
        {headers.map((header, index) => (
          <div
            key={index}
            className="flex justify-center sm:px-1 px-0.5 fontBold"
            style={{ flex: flexValues[index] }}
          >
            {header}
          </div>
        ))}
      </div>

      <div className="flex w-full min-h-[250px] sm:min-h-[590px] mb-5 flex-col">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz.reviewWeekId} className="flex w-full border-b border-b-[#E0E0E0] p-2">
              <div className="flex justify-center sm:px-1 px-0.5 sm:text-[13.5px] text-[12px]" style={{ flex: flexValues[0] }}>
                {quiz.Id}
              </div>
              <div 
                className="flex justify-start sm:px-1 px-0.5 sm:text-[13.5px] text-[12px] cursor-pointer"
                style={{ flex: flexValues[1] }}
                onClick={() =>
                  navigate(`/cybercampus/review/${trackType}/quiz/${quiz.reviewWeekId}`, {
                    state: {
                      title: quiz.title,
                      trackType: trackType,
                    },
                  })
                }
              >
                {quiz.title}
              </div>
              <div
                className={`flex justify-center sm:px-1 px-0.5 sm:text-[13.5px] text-[12px] ${
                  quiz.IsSubmit === "제출" ? "text-[#3B79FF] font-bold" : ""
                }`}
                style={{ flex: flexValues[2] }}
              >
                {quiz.IsSubmit}
              </div>
              <div className="flex justify-center sm:px-1 px-0.5 sm:text-[13.5px] text-[12px]" style={{ flex: flexValues[3] }}>
                {quiz.score} / {quiz.total}
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full text-[#888] text-sm sm:text-base py-10">
            등록된 복습퀴즈가 없습니다.
          </div>
        )}
      </div>

          </div>
        );
      };
export default ReviewBoard;
