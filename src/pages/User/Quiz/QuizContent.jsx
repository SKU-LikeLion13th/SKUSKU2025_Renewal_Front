import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import quizData from "../../../utils/QuizData.json";
import images from "../../../utils/Images";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function QuizContent() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fileNames, setFileNames] = useState({});  // 업로드된 파일 이름 상태 추가
  // const navigate = useNavigate();

  useEffect(() => {
    console.log("URL id:", quizId, typeof quizId);
    const selectedQuiz = quizData.find(q => q.Id === Number(quizId));
    setQuiz(selectedQuiz || null);
  }, [quizId]);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleFileUpload = (questionId, files) => {
    const fileArray = Array.from(files);
    const newFileNames = fileArray.map((file) => file.name); // 파일 이름 배열 생성
    setUploadedFiles((prev) => ({
      ...prev,
      [questionId]: (prev[questionId] || []).concat(fileArray),
    }));

    setFileNames((prev) => ({
      ...prev,
      [questionId]: newFileNames.join(", "), // 파일 이름을 쉼표로 구분하여 상태에 저장
    }));
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const goToPrevQuestion = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleDivClick = (e) => {
    e.target.querySelector("input")?.focus();
  };

  const submitQuizToServer = async () => {
    if (!quiz) return;
  
    const formData = new FormData();
    formData.append("title", quiz.title || "제목 없음");
    formData.append("trackType", quiz.trackType || "BACKEND");
  
    const reviewQuizDTOList = quiz.questions.map((q) => {
      const questionId = q.questionId;
      const answer = selectedAnswer?.[questionId] || "";
      const explanation = q.explanation || "";
  
      return {
        quizType: q.quizType,
        content: q.content,
        answerChoiceList: q.AnswerChoiceList || [],
        answer,
        explanation,
      };
    });
  
    formData.append("reviewQuizDTOList", JSON.stringify(reviewQuizDTOList));
  
    for (const questionId in uploadedFiles) {
      const files = uploadedFiles[questionId];
      files.forEach((file) => {
        formData.append(`files-${questionId}`, file);
      });
    }    
  
    try {
      const response = await axios.post("/admin/reviewQuiz/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 201) {
        alert("퀴즈가 성공적으로 출제되었습니다!");
        // navigate("/admin");
      } else {
        alert("퀴즈 출제 실패: " + response.status);
      }
    } catch (error) {
      console.error("퀴즈 출제 중 에러 발생:", error);
      alert("퀴즈 출제 중 오류가 발생했습니다.");
    }
  };

  console.log(uploadedFiles);
console.log(fileNames);


  if (!quiz) {
    return <div>퀴즈를 찾을 수 없습니다.</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="flex w-full min-h-[590px] flex-col">
      {currentQuestion ? (
        <div className="flex flex-col p-3">
          <div className="font-semibold">
            Question {currentQuestion.questionId}.
          </div>

          <div className="flex mt-1 font-bold">{currentQuestion.content}</div>

          {currentQuestion.AnswerChoiceList.length > 0 && currentQuestion.quizType === "MULTIPLE_CHOICE" ? (
            <div className="flex items-start justify-between mt-2">
              <div className="flex flex-col mt-5">
                {currentQuestion.AnswerChoiceList.map((choice, index) => (
                  <label key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.questionId}`}
                      value={choice}
                      checked={selectedAnswer?.[currentQuestion.questionId] === choice}
                      onChange={() => handleAnswerChange(currentQuestion.questionId, choice)}
                      className="my-3 mr-2"
                    />
                    {choice}
                  </label>
                ))}
              </div>

              <div className="flex flex-col gap-2 mb-10">
                {Array.isArray(currentQuestion.file) &&
                  currentQuestion.file.map((fileName, index) => (
                    <img
                      key={index}
                      src={images[fileName]}
                      alt={`question-${currentQuestion.questionId}-image-${index}`}
                      className="flex object-contain w-[100%] max-h-60"
                    />
                  ))}
              </div>

              {/* 파일 업로드 영역 */}
              <div className="mt-4">
                <label className="block mb-1 font-semibold">파일 업로드</label>
                <div
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFileUpload(currentQuestion.questionId, e.dataTransfer.files);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  className="w-full p-4 text-center border-2 border-dashed rounded-md cursor-pointer bg-gray-50"
                >
                  {fileNames[currentQuestion.questionId] || "파일을 여기에 드래그하거나 클릭하여 업로드하세요."}

                  {/* label을 밖에 두어야 합니다 */}
                  <label
                    htmlFor={`file-upload-${currentQuestion.questionId}`}
                    className="cursor-pointer text-blue-500 underline ml-2 inline-block"
                  >
                    파일 선택
                  </label>

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(currentQuestion.questionId, e.target.files)}
                    className="hidden"
                    id={`file-upload-${currentQuestion.questionId}`}
                  />
                </div>

                {/* 업로드한 파일 리스트 및 삭제 기능 추가 */}
                <div className="flex flex-col mt-2 gap-2">
                  {(uploadedFiles[currentQuestion.questionId] || []).map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                      <span className="truncate w-[80%]">{file.name}</span>
                      <button
                        className="text-red-500 text-sm ml-2"
                        onClick={() => {
                          setUploadedFiles((prev) => {
                            const updated = [...(prev[currentQuestion.questionId] || [])];
                            updated.splice(index, 1);
                            return {
                              ...prev,
                              [currentQuestion.questionId]: updated,
                            };
                          });
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full min-h-[200px] text-[16px] my-6 bg-[#F4F4F4] p-4" onClick={handleDivClick}>
              <textarea
                placeholder="답안을 입력해주세요."
                className="w-full h-full p-4 overflow-hidden resize-none"
                rows="1"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onChange={(e) =>
                  handleAnswerChange(currentQuestion.questionId, e.target.value)
                }
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

            <button
              className="flex px-6 py-1.5 my-4 text-[13px] text-white bg-[#4881FF] rounded-[5.95px] ml-auto"
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex >= quiz.questions.length - 1}
            >
              다음
            </button>
          </div>

          {/* 퀴즈 출제 버튼 */}
          {currentQuestionIndex === quiz.questions.length - 1 && (
            <button
              className="mt-4 px-6 py-2 text-white bg-green-600 rounded-[6px]"
              onClick={submitQuizToServer}
            >
              퀴즈 출제
            </button>
          )}
        </div>
      ) : (
        <p>모든 질문을 완료했습니다.</p>
      )}
    </div>
  );
}
