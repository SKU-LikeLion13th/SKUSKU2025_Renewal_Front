import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/axios";  // axios 인스턴스 임포트

const AdminReviewBoard = () => {
  const headers = ["번호", "제목", "수정", "선택"];
  const flexValues = ["1", "7", "1", "1"];
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [ReviewQuizList, setReviewQuizList] = useState([]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
  const fetchReviewQuiz = async () => {
    try {
      const res = await API.get("/admin/reviewQuiz");
      console.log("데이터:", res.data);
      setReviewQuizList(res.data);
    } catch (err) {
      console.error("리뷰 퀴즈 불러오기 실패:", err);
    }
  };

  fetchReviewQuiz();
}, []);

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
        {ReviewQuizList.length > 0 ? (
          ReviewQuizList.map((item, idx) => (
            <div
              key={item.reviewWeekId}
              className="flex w-full border-b border-b-[#E0E0E0] p-2"
            >
              <div
                className="flex justify-center px-1 text-[13.5px]"
                style={{ flex: flexValues[0] }}
              >
                {idx + 1}
              </div>

              <div
                className="flex justify-start px-1 text-[13.5px]"
                style={{ flex: flexValues[1] }}
              >
                {item.title}
              </div>

              <div
                className="flex justify-center px-1 text-[13.5px]"
                style={{ flex: flexValues[2] }}
              >
                수정
              </div>

              <div
                className="flex justify-center px-1 text-[13.5px]"
                style={{ flex: flexValues[3] }}
              >
                <input type="checkbox" onChange={handleCheckboxChange} />
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center p-10 text-gray-500">
            등록된 과제가 없습니다.
          </div>
        )}

        <div className="flex justify-between w-full mt-10 text-[14px] fontLight">
          <div
            className="flex bg-[#3B79FF] text-white px-4 py-1.5 rounded-[5.95px] cursor-pointer"
            onClick={() => navigate("/admin/adminQuiz")}
          >
            문제 등록
          </div>

          <div className="flex">
            <div className="flex bg-[#E9E9E9] text-[#838383] px-4 py-1.5 rounded-[5.95px] cursor-pointer">
              전체 선택
            </div>
            <div
              className={`flex ml-5 text-white px-4 py-1.5 rounded-[5.95px] ${
                isChecked ? "bg-[#E65252]" : "bg-[#6C6868]"
              } cursor-pointer`}
            >
              선택 삭제
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviewBoard;
