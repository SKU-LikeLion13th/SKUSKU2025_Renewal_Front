import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../../utils/axios';
import axios from 'axios';

export default function AdminQuizContent() {
  const [questionCount, setQuestionCount] = useState(1);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [filesByQuestion, setFilesByQuestion] = useState({});
  const [dragStates, setDragStates] = useState({}); // 각 문제별 드래그 상태 관리

  const { trackType } = useParams();
  const navigate = useNavigate();

  const handleQuestionCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuestionCount(value);
      setQuestionTypes((prev) => {
        const updated = [...prev];
        while (updated.length < value) updated.push('');
        return updated.slice(0, value);
      });
      // 문제 수 변경 시 파일 상태 초기화 또는 자르기
      setFilesByQuestion((prev) => {
        const copy = {...prev};
        Object.keys(copy).forEach(key => {
          if (parseInt(key) >= value) delete copy[key];
        });
        return copy;
      });
      // 드래그 상태도 초기화
      setDragStates((prev) => {
        const copy = {...prev};
        Object.keys(copy).forEach(key => {
          if (parseInt(key) >= value) delete copy[key];
        });
        return copy;
      });
    } else {
      setQuestionCount(0);
      setQuestionTypes([]);
      setFilesByQuestion({});
      setDragStates({});
    }
  };

  const handleTypeChange = (index, type) => {
    const updatedTypes = [...questionTypes];
    updatedTypes[index] = type;
    setQuestionTypes(updatedTypes);
  };

  const handleFileChange = (index, files) => {
    setFilesByQuestion((prev) => ({
      ...prev,
      [index]: files,
    }));
  };

  // 각 문제별 드래그 앤 드롭 핸들러
  const handleDragOver = (e, questionIndex) => {
    e.preventDefault();
    e.stopPropagation();
    setDragStates(prev => ({
      ...prev,
      [questionIndex]: true
    }));
  };

  const handleDragEnter = (e, questionIndex) => {
    e.preventDefault();
    e.stopPropagation();
    setDragStates(prev => ({
      ...prev,
      [questionIndex]: true
    }));
  };

  const handleDragLeave = (e, questionIndex) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 현재 요소의 경계를 벗어났는지 확인
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setDragStates(prev => ({
        ...prev,
        [questionIndex]: false
      }));
    }
  };

  const handleDrop = (e, questionIndex) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragStates(prev => ({
      ...prev,
      [questionIndex]: false
    }));

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      // 기존 파일과 새로 드롭된 파일을 합치기
      const existingFiles = filesByQuestion[questionIndex] || [];
      const newFiles = [...existingFiles, ...droppedFiles];
      handleFileChange(questionIndex, newFiles);
    }
  };

  // 파일 제거 함수
  const removeFile = (questionIndex, fileIndex) => {
    const currentFiles = filesByQuestion[questionIndex] || [];
    const updatedFiles = currentFiles.filter((_, index) => index !== fileIndex);
    handleFileChange(questionIndex, updatedFiles);
  };

  const handleSubmit = async () => {
    try {
      const title = document.querySelector("input[placeholder='제목을 입력해주세요.']").value;

      if (!title) {
        alert("제목을 입력해주세요.");
        return;
      }

      // 문제 수 유효성 검사
      if (questionCount < 1) {
        alert("문제는 최소 1개 이상이어야 합니다.");
        return;
      }

      // 문제별 유효성 검사
      for (let i = 0; i < questionCount; i++) {
        const content = document.querySelectorAll("input[placeholder='문제를 입력해주세요.']")[i]?.value.trim();
        const type = questionTypes[i];

        if (!content) {
          alert(`문제 ${i + 1}의 내용을 입력해주세요.`);
          return;
        }

        if (!type) {
          alert(`문제 ${i + 1}의 형식을 선택해주세요.`);
          return;
        }

        if (type === '객관식') {
          const choiceInputs = document.querySelectorAll(`input[name="answer-${i}"]`);
          const textInputs = Array.from(choiceInputs).map((input) =>
            input.parentElement.querySelector('input[type="text"]').value.trim()
          );
          const hasAtLeastOneChoice = textInputs.some(text => text !== "");
          const selectedAnswer = Array.from(choiceInputs).some((input) => input.checked);

          if (!hasAtLeastOneChoice) {
            alert(`문제 ${i + 1}의 보기를 하나 이상 입력해주세요.`);
            return;
          }

          if (!selectedAnswer) {
            alert(`문제 ${i + 1}의 정답을 선택해주세요.`);
            return;
          }
        }

        if (type === '주관식') {
          const subjectiveAnswer = document.querySelector(`input[name="subjective-answer-${i}"]`)?.value.trim();
          if (!subjectiveAnswer) {
            alert(`문제 ${i + 1}의 주관식 정답을 입력해주세요.`);
            return;
          }
        }
      }

      // 1) 모든 문제에서 선택한 파일들을 배열로 모으기
      const allFiles = [];
      const questionFileIndices = {}; // 문제별로 파일이 allFiles내 인덱스 시작 위치 기억

      let fileCountSoFar = 0;
      for (let i = 0; i < questionCount; i++) {
        const filesForQ = filesByQuestion[i] || [];
        questionFileIndices[i] = fileCountSoFar;
        fileCountSoFar += filesForQ.length;
        allFiles.push(...filesForQ);
      }

      // 2) presigned URL 요청 (파일이 없으면 빈 배열 보내기)
      const presignedReqBody = allFiles.map((file) => ({
        fileName: file.name,
        mimeType: file.type,
      }));

      let presignedUrls = [];
      if (presignedReqBody.length > 0) {
        const presignedRes = await axios.post(
          "https://backend.sku-sku.com/s3/presigned-urls",
          presignedReqBody,
          { withCredentials: true }
        );
        presignedUrls = presignedRes.data;
      }

      // 3) S3에 파일 업로드
      const uploadPromises = allFiles.map((file, idx) =>
        axios.put(presignedUrls[idx].uploadUrl, file, {
          headers: { "Content-Type": file.type },
        })
      );
      await Promise.all(uploadPromises);

      // 4) 파일 업로드 후 반환 받은 URL 기반 파일정보 만들기
      const fileInfoList = presignedUrls.map((urlObj, idx) => {
        const file = allFiles[idx];
        const ext = file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN';
        return {
          fileUrl: urlObj.cdnUrl,
          fileName: file.name,
          fileType: ext,
          fileSize: file.size,
          fileKey: urlObj.fileKey || urlObj.key || null,
        };
      });

      // 5) 각 문제별 files 배열 채우기
      const reviewQuizDTOList = [];
      for (let index = 0; index < questionTypes.length; index++) {
        const type = questionTypes[index];
        const content = document.querySelectorAll("input[placeholder='문제를 입력해주세요.']")[index]?.value || "";
        const explanationInput = document.querySelectorAll("input[placeholder='해설을 입력해주세요.']")[index]?.value || "";

        const quizData = {
          quizType: type === '객관식' ? 'MULTIPLE_CHOICE' : 'ESSAY_QUESTION',
          content,
          answerChoiceList: [],
          answer: "",
          files: [],
          explanation: explanationInput,
        };

        // 객관식 답변 및 보기 처리 (기존 코드 유지)
        if (type === '객관식') {
          const choiceInputs = document.querySelectorAll(`input[name="answer-${index}"]`);
          const textInputs = Array.from(choiceInputs).map((input) =>
            input.parentElement.querySelector('input[type="text"]').value
          );

          const selectedAnswer = Array.from(choiceInputs).find((input) => input.checked);
          const answer = selectedAnswer ? textInputs[Array.from(choiceInputs).indexOf(selectedAnswer)] : "";

          quizData.answerChoiceList = textInputs;
          quizData.answer = answer;
        }

        if (type === '주관식') {
          const answerInput = document.querySelector(`input[name="subjective-answer-${index}"]`)?.value || "";
          quizData.answer = answerInput;
        }

        // 문제별 업로드한 파일 정보 매핑
        const filesForThisQuestion = filesByQuestion[index] || [];
        if (filesForThisQuestion.length > 0) {
          const startIdx = questionFileIndices[index];
          quizData.files = fileInfoList.slice(startIdx, startIdx + filesForThisQuestion.length);
        } else {
          quizData.files = [];
        }

        reviewQuizDTOList.push(quizData);
      }

      // 6) payload 준비
      const payload = {
        title,
        trackType,
        reviewQuizDTOList,
      };

      // 7) 서버 전송
      const response = await API.post("/admin/reviewQuiz/add", payload);

      if (response.status === 201 || response.status === 200) {
        alert("퀴즈가 성공적으로 등록되었습니다.");
        navigate(`/admin/reviewQuiz/${trackType}`);
      } else {
        alert(`오류 발생: ${response.statusText}`);
      }
    } catch (err) {
      alert("요청 실패: " + (err.response?.data?.message || err.message));
      console.error("상세 오류:", err);
    }
  };

  const renderQuestionBlock = (index) => (
    <div key={index} className='flex flex-col px-10 py-8 sm:px-25 sm:py-20 bg-[#F6F6F6] border-[#232323] border-[0.5px] rounded-[15px] w-full sm:mt-20 mt-10'>
      <div className='flex text-[15px] sm:text-[20px] fontSB'>Question {String(index + 1).padStart(2, '0')}.</div>
      <input type="text" placeholder='문제를 입력해주세요.' className='flex w-fit lg:w-[50%] sm:w-[74%] sm:text-[16px] text-[12.5px] sm:mt-10 mt-3 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[#949494] fontSB sm:px-5 sm:py-3 px-4 py-2' />

      <div className='flex w-fit sm:mt-20 mt-8 sm:text-[20px] text-[15px] fontSB'>문제 형식</div>
      <div className='flex justify-around max-w-fit sm:flex-row sm:px-4 sm:mt-10 mt-3 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px]'>
        {['객관식', '주관식'].map((type) => (
          <label key={type} className='flex sm:text-[16px] text-[11px] text-[#232323] fontSB sm:px-5 sm:py-3 px-4 py-2'>
            <div className="flex mr-2.5 w-fit">{type}</div>
            <input
              type="radio"
              name={`quizType-${index}`}
              value={type}
              className='w-fit'
              checked={questionTypes[index] === type}
              onChange={() => handleTypeChange(index, type)}
            />
          </label>
        ))}
      </div>

      {questionTypes[index] === '객관식' && (
        <>
          <div className='flex sm:mt-20 mt-8 sm:text-[20px] text-[15px] fontSB'>보기 입력</div>
          <div className='flex flex-col w-full px-4 sm:py-7 py-5 sm:mt-10 mt-4 bg-[#FFFFFF] border-[#232323] border-[1px] rounded-[7px]'>
            {[...Array(5)].map((_, i) => (
              <label key={i} className='flex w-fit items-center py-1 sm:py-2 sm:pl-5 fontRegular'>
                <input type="radio" name={`answer-${index}`} className='w-5' />
                <input type='text' placeholder='보기를 입력해 주세요.' className="flex ml-1.5 sm:ml-2.5 w-fit sm:text-[19px] text-[12.5px] text-[#121212] px-2 py-1" />
              </label>
            ))}
          </div>
        </>
      )}

      {questionTypes[index] === '주관식' && (
        <>
          <div className='flex sm:mt-20 mt-8 sm:text-[20px] text-[15px] fontSB'>정답 입력</div>
          <input
            type="text"
            placeholder='정답을 입력해주세요.'
            name={`subjective-answer-${index}`}
            className='flex sm:w-[400px] w-fit sm:mt-10 mt-3 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] sm:text-[16px] text-[12.5px] text-[#949494] fontSB sm:px-5 sm:py-3 px-4 py-2'
          />
        </>
      )}

      {/* 파일첨부 input 추가 */}
      <div className="flex sm:mt-20 mt-8 sm:text-[20px] text-[15px] fontSB">파일 업로드</div>
      <div
        className={`
          flex w-fit sm:mt-10 mt-3 bg-[#FFFFFF] border-[1.51px] rounded-[7px] sm:px-5 sm:py-3 px-4 py-2 cursor-pointer
          ${dragStates[index] 
            ? 'border-[#3B79FF] bg-[#F0F4FF]' 
            : 'border-[#E5E5E5]'
          }
        `}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragEnter={(e) => handleDragEnter(e, index)}
        onDragLeave={(e) => handleDragLeave(e, index)}
        onDrop={(e) => handleDrop(e, index)}
        onClick={() => document.getElementById(`file-upload-${index}`).click()}
      >
        <span className="sm:text-[14px] text-[9.5px] text-[#232323] underline">파일 선택</span>
        <input
          id={`file-upload-${index}`}
          type="file"
          multiple
          onChange={(e) => handleFileChange(index, Array.from(e.target.files))}
          className="hidden"
        />

        <div className="ml-3 sm:text-[14px] text-[9.5px]">
          {filesByQuestion[index]?.length > 0 ? (
            <span className="text-[#232323]">선택된 파일: {filesByQuestion[index].length}개</span>
          ) : (
            <span className={`${dragStates[index] ? 'text-[#3B79FF]' : 'text-[#A6A6A6]'}`}>
              {dragStates[index] ? '파일을 여기에 놓으세요' : '또는 여기로 파일을 끌어오세요.'}
            </span>
          )}
        </div>
      </div>

      {/* 선택된 파일 목록 표시 */}
      {filesByQuestion[index] && filesByQuestion[index].length > 0 && (
        <div className="flex flex-col sm:mt-5 mt-3 bg-[#F9F9F9] border-[#E5E5E5] border-[1px] rounded-[7px] sm:px-4 sm:py-3 px-3 py-2">
          <div className="sm:text-[12px] text-[10px] text-[#666666] fontSB">
            선택된 파일:
          </div>
          <div className="flex flex-col gap-1 mt-2">
            {filesByQuestion[index].map((file, fileIndex) => (
              <div key={fileIndex} className="flex items-center justify-between">
                <span className="sm:text-[11px] text-[9px] text-[#232323] truncate flex-1">
                  • {file.name}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index, fileIndex);
                  }}
                  className="ml-2 sm:text-[11px] text-[9px] text-[#FF4444] hover:text-[#FF0000]"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className='flex sm:mt-20 mt-8 sm:text-[20px] text-[15px] fontSB'>해설 입력</div>
      <input type="text" placeholder='해설을 입력해주세요.' className='flex lg:w-[50%] sm:w-[74%] w-fit sm:mt-10 mt-3 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] sm:text-[16px] text-[12.5px] text-[#949494] fontSB sm:px-5 sm:py-3 px-4 py-2' />
    </div>
  );

  return (
    <div className='flex flex-col justify-start w-full min-h-screen mb-40'>
      <div className='flex sm:mt-20 mt-10 sm:text-[20px] text-[17px] fontBold'>제목 입력</div>
      <input type="text" placeholder='제목을 입력해주세요.' className='flex w-fit sm:mt-10 mt-5 border-[#E5E5E5] border-[1.51px] rounded-[7px] sm:text-[16px] text-[12.5px] text-[#949494] fontSB sm:px-5 sm:py-3 px-4 py-2' />

      <div className='flex sm:mt-20 mt-8 sm:text-[20px] text-[17px] fontBold'>문제 갯수</div>
      <input
        type="number"
        placeholder='숫자만 입력해 주세요.'
        className='flex w-fit sm:mt-10 mt-5 border-[#E5E5E5] border-[1.51px] rounded-[7px] sm:text-[16px] text-[12.5px] text-[#949494] fontSB sm:px-5 sm:py-3 px-4 py-2'
        onChange={handleQuestionCountChange}
        min={0}
      />

      {Array.from({ length: questionCount }).map((_, index) => renderQuestionBlock(index))}

      <div className='flex justify-end sm:mt-20 mt-10'>
        <div
          className='flex bg-[#E9E9E9] text-[#838383] sm:px-5 sm:py-2 px-4 py-1.5 rounded-[6.45px] cursor-pointer'
          onClick={() => navigate(-1)}  // 이전 페이지로 이동
        >
          나가기
        </div>
        <div
          className='flex bg-[#3B79FF] text-white sm:px-5 sm:py-2 px-4 py-1.5 sm:ml-7 ml-2 rounded-[6.45px] cursor-pointer'
          onClick={handleSubmit}
        >
          등록하기
        </div>
      </div>
    </div>
  );
}