import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/axios";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../../../utils/Insider-loading.json";

export default function QuizContent({ quiz, reviewWeekId, currentQuestionIndex, setCurrentQuestionIndex }) {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackType } = useParams();

  useEffect(() => {
    const fetchSubmittedAnswers = async () => {
      try {
        const res = await API.get(`/reviewQuiz/${reviewWeekId}`);
        if (Array.isArray(res.data)) {
          const savedAnswers = {};
          res.data.forEach((quizItem) => {
            if (quizItem.response) {
              savedAnswers[quizItem.id] = quizItem.response;
            }
          });
          setSelectedAnswer(savedAnswers);
        }
      } catch (err) {
        console.error("제출된 답안을 불러오는 데 실패했습니다:", err);
      }
    };

    fetchSubmittedAnswers();
  }, [reviewWeekId]);

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
    if (isSubmitting) return;

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
        setIsSubmitting(true);
        
        const response = await API.post("/reviewQuiz/solve", payload);

        if (response.status === 200) {
          const { score, total } = response.data;
          alert(`퀴즈 제출 완료!\n총 ${total}문제 중 ${score}문제를 맞혔습니다.`);
          navigate(`/cybercampus/review/${trackType}`);
        } else {
          alert("제출에 실패했습니다.");
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error("제출 중 오류:", error);
        alert("제출 중 오류가 발생했습니다.");
        setIsSubmitting(false);
      }
  };

  const handleFileDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("다운로드 실패");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
      window.open(fileUrl, "_blank"); // 실패 시 백업
    }
  };
  
  return (
    <div className="flex relative w-full min-h-[590px] flex-col">
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
                      <div
                        name={file.fileUrl}
                        onClick={(e) => {
                          e.preventDefault(); // 기본 링크 이동 막기!
                          handleFileDownload(file.fileUrl, file.fileName);
                        }}
                        className="text-[#3B79FF] underline text-sm"
                      >
                        {file.fileName} 다운로드
                      </div>
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
                className={`flex px-6 py-1.5 my-4 text-[14px] text-white rounded-[5.95px] ml-auto ${
                  isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#4881FF]"
                }`}
                onClick={handleSubmitAnswers}
                disabled={isSubmitting}
              >
                {isSubmitting ? "채점 중..." : "답안 제출하기"}
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
      
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center justify-center bg-white px-8 py-10 rounded-2xl shadow-xl">
            <Lottie
              animationData={loadingAnimation}
              loop
              autoplay
              style={{ width: 150, height: 150 }}
            />
            <div className="mt-4 text-black text-xl font-semibold">채점 중...</div>
          </div>
        </div>
      )}
    </div>
  );
}
