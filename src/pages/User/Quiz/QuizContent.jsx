import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function QuizContent({ quiz, reviewWeekId, currentQuestionIndex, setCurrentQuestionIndex }) {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const redirectPath = localStorage.getItem("redirectAfterLogin") || "";
  const pathParts = redirectPath.split("/");
  const trackType = pathParts[pathParts.length - 1] || "";
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  const openImageModal = (src) => {
    setModalImageSrc(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImageSrc("");
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div>퀴즈를 찾을 수 없습니다.</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerChange = (id, answer) => {
    setSelectedAnswer((prev) => {
      const updated = {
        ...prev,
        [id]: answer,
      };
      console.log("답안 저장:", updated); // ← 확인용
      return updated;
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitAnswers = async () => {
    // 문제 중에 답변이 없거나 빈 문자열인 문제 확인
    const unanswered = quiz.questions.some(q => !selectedAnswer[q.id] || selectedAnswer[q.id].trim() === "");

    if (unanswered) {
      alert("모든 문제에 답안을 입력해 주세요.");
      return; // 제출 중단
    }

    const quizResponseList = quiz.questions.map((q) => ({
      quizId: q.id,
      quizAnswer: selectedAnswer[q.id] || "",
    }));

    const payload = {
      reviewWeekId,
      quizResponseList,
    };

    try {
      const response = await axios.post(
        "http://backend.sku-sku.com/reviewQuiz/solve",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        alert("퀴즈가 성공적으로 제출되었습니다!");
        navigate(`/cybercampus/review/${trackType}`);
      } else {
        alert("제출에 실패했습니다.");
      }
    } catch (error) {
      console.error("제출 중 오류:", error);
      alert("제출 중 오류가 발생했습니다.");
    }
  };


  return (
    <div className="flex w-full min-h-[590px] flex-col">
      {currentQuestion ? (
        <div className="flex flex-col p-3">
          <div className="font-semibold">Question {currentQuestionIndex + 1}.</div>

          <div className="flex mt-1 font-bold">{currentQuestion.content}</div>

          {/* 파일 렌더링 (객관식/주관식 공통) */}
          <div className="mt-4 mb-6">
            {/* 이미지 파일들 */}
            <div className="flex flex-wrap justify-around gap-4 mb-4">
              {Array.isArray(currentQuestion.files) &&
                currentQuestion.files
                  .filter((file) => /^(jpg|jpeg|png|gif|bmp|webp)$/i.test(file.fileType))
                  .map((file, index) => (
                    <img
                      key={index}
                      src={file.fileUrl}
                      alt={`question-${currentQuestion.id}-image-${index}`}
                      className="flex object-contain max-h-60 w-fit my-2"
                      onClick={() => openImageModal(file.fileUrl)}
                    />
                  ))}
            </div>

            {/* 이미지 아닌 파일들 */}
            <div className="flex justify-end">
              {Array.isArray(currentQuestion.files) &&
                currentQuestion.files
                  .filter((file) => !/^(jpg|jpeg|png|gif|bmp|webp)$/i.test(file.fileType))
                  .map((file, index) => (
                    <div key={index} className="mt-2">
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3B79FF] underline text-sm"
                      >
                        {file.fileName}
                      </a>
                    </div>
                  ))}
            </div>
          </div>

          {currentQuestion.answerChoiceList?.length > 0 &&
          currentQuestion.quizType === "MULTIPLE_CHOICE" ? (
            <div className="flex flex-col mt-2">
              {currentQuestion.answerChoiceList.map((choice, index) => (
                <label key={index} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={choice}
                    checked={selectedAnswer[currentQuestion.id] === choice}
                    onChange={() => handleAnswerChange(currentQuestion.id, choice)}
                    className="my-3 mr-2"
                  />
                  {choice}
                </label>
              ))}
            </div>
          ) : (
            <div className="w-full min-h-[200px] text-[16px] my-6 bg-[#F4F4F4] p-4">
              <textarea
                placeholder="답안을 입력해주세요."
                className="w-full h-full p-4 overflow-hidden resize-none"
                rows="1"
                value={selectedAnswer[currentQuestion.id] || ""}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              />
            </div>
          )}

          <div className="flex w-full">
            {currentQuestionIndex > 0 && (
              <button
                className="flex px-6 py-1.5 my-4 text-[13px] text-[#838383] bg-[#E9E9E9] rounded-[5.95px]"
                onClick={goToPrevQuestion}
              >
                이전
              </button>
            )}

            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <button
                className="flex px-6 py-1.5 my-4 text-[14px] text-white bg-[#4881FF] rounded-[5.95px] ml-auto"
                onClick={goToNextQuestion}
              >
                다음
              </button>
            ) : (
              <button
                className="flex px-6 py-1.5 my-4 text-[14px] text-white bg-[#4881FF] rounded-[5.95px] ml-auto"
                onClick={handleSubmitAnswers}
              >
                답안 제출하기
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>모든 질문을 완료했습니다.</p>
      )}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeModal} // 배경 클릭 시 닫기
        >
          <img
            src={modalImageSrc}
            alt="확대 이미지"
            className="max-w-[80vw] max-h-[90vh] rounded-lg"
            onClick={(e) => e.stopPropagation()} // 이미지 클릭 시 이벤트 전파 차단
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={closeModal}
            aria-label="닫기"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
