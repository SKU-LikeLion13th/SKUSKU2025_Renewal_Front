import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API from '../../../utils/axios';
import AdminReviewTitle from './AdminReviewTitle';
import ReviewLocation from '../../User/Review/ReviewLocation';
import Breadcrumb from '../../../components/Breadcrumb';

export default function AdminReviewUpdate() {
  const { reviewWeekId, trackType } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [filesByQuestion, setFilesByQuestion] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [quizContents, setQuizContents] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [questionStates, setQuestionStates] = useState([]); 
  const [originalQuizData, setOriginalQuizData] = useState([]);

  useEffect(() => {
    if (!reviewWeekId) return;

    const fetchQuiz = async () => {
      try {
        const response = await API.get(`/reviewQuiz/${reviewWeekId}`);

        if (response.status === 200) {
          const data = response.data;
          
          setOriginalQuizData(data);

          setQuestionCount(data.length);

          const types = data.map((q) => (q.quizType === 'MULTIPLE_CHOICE' ? '객관식' : '주관식'));
          setQuestionTypes(types);

          const contents = data.map((q) => ({
            content: q.content,
            answerChoiceList: q.answerChoiceList || [],
            answer: q.answer || '',
            explanation: q.explanation || '',
            files: q.files ? (Array.isArray(q.files) ? q.files : [q.files]) : [],
          }));
          setQuizContents(contents);

          const initialStates = data.map((q) => ({
            reviewQuizId: q.reviewQuizId || q.id,
            status: 'KEEP',
            isModified: false
          }));
          setQuestionStates(initialStates);

          setSelectedFiles({});
          setFilesByQuestion({});
        }
      } catch (err) {
        console.error('퀴즈 불러오기 실패', err);
      }
    };

    fetchQuiz();
  }, [reviewWeekId]);

  const hasQuestionChanged = (index, newContent) => {
    if (index >= originalQuizData.length) return true;
    
    const original = originalQuizData[index];
    const current = {
      content: newContent.content,
      answerChoiceList: newContent.answerChoiceList,
      answer: newContent.answer,
      explanation: newContent.explanation,
      quizType: questionTypes[index] === '객관식' ? 'MULTIPLE_CHOICE' : 'ESSAY_QUESTION'
    };

    return (
      original.content !== current.content ||
      original.answer !== current.answer ||
      original.explanation !== current.explanation ||
      original.quizType !== current.quizType ||
      JSON.stringify(original.answerChoiceList || []) !== JSON.stringify(current.answerChoiceList || [])
    );
  };

  // 🚩 문제 상태 업데이트 함수
  const updateQuestionStatus = (index, newStatus) => {
    setQuestionStates(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index].status = newStatus;
        updated[index].isModified = newStatus === 'UPDATE';
      }
      return updated;
    });
  };

  const handleDeleteQuestion = (index) => {
    if (!window.confirm(`문제 ${index + 1}번을 삭제하시겠습니까?`)) return;

    // 🚩 기존 문제라면 DELETE 상태로 표시 (실제 삭제는 하지 않음)
    if (index < originalQuizData.length) {
      updateQuestionStatus(index, 'DELETE');
      // UI에서는 숨기기 위해 별도 상태 관리 또는 필터링 필요
      // 여기서는 간단히 삭제 처리
    }

    setQuestionCount((prev) => prev - 1);

    setQuestionTypes((prev) => prev.filter((_, i) => i !== index));
    setQuizContents((prev) => prev.filter((_, i) => i !== index));
    setQuestionStates((prev) => prev.filter((_, i) => i !== index));

    // 파일 상태 재정렬
    setFilesByQuestion((prev) => {
      const updated = {};
      Object.entries(prev).forEach(([key, val]) => {
        const i = parseInt(key);
        if (i < index) updated[i] = val;
        else if (i > index) updated[i - 1] = val;
      });
      return updated;
    });

    setSelectedFiles((prev) => {
      const updated = {};
      Object.entries(prev).forEach(([key, val]) => {
        const i = parseInt(key);
        if (i < index) updated[i] = val;
        else if (i > index) updated[i - 1] = val;
      });
      return updated;
    });
  };

  const handleQuestionCountChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (!isNaN(value) && value >= 0) {
      const previousCount = questionCount;
      console.log(previousCount);
      setQuestionCount(value);

      // 문제 형식 업데이트
      setQuestionTypes((prev) => {
        const updated = [...prev];
        while (updated.length < value) updated.push('');
        return updated.slice(0, value);
      });

      // 문제 내용 업데이트
      setQuizContents((prev) => {
        const updated = [...prev];
        while (updated.length < value) {
          updated.push({
            content: '',
            answerChoiceList: [],
            answer: '',
            explanation: '',
            files: [],
          });
        }
        return updated.slice(0, value);
      });

      // 🚩 문제 상태 업데이트
      setQuestionStates((prev) => {
        const updated = [...prev];
        
        // 새로 추가된 문제들은 CREATE 상태
        while (updated.length < value) {
          updated.push({
            reviewQuizId: null, // 새 문제는 null
            status: 'CREATE',
            isModified: false
          });
        }
        
        return updated.slice(0, value);
      });

      // 파일 상태 정리
      setFilesByQuestion((prev) => {
        const copy = { ...prev };
        Object.keys(copy).forEach((key) => {
          if (parseInt(key) >= value) delete copy[key];
        });
        return copy;
      });

      setSelectedFiles((prev) => {
        const copy = { ...prev };
        Object.keys(copy).forEach((key) => {
          if (parseInt(key) >= value) delete copy[key];
        });
        return copy;
      });

    } else {
      setQuestionCount(0);
      setQuestionTypes([]);
      setQuizContents([]);
      setQuestionStates([]);
      setFilesByQuestion({});
      setSelectedFiles({});
    }
  };

  const handleTypeChange = (index, type) => {
    const updatedTypes = [...questionTypes];
    updatedTypes[index] = type;
    setQuestionTypes(updatedTypes);

    // 🚩 기존 문제이고 타입이 변경되었다면 UPDATE 상태로 변경
    if (index < originalQuizData.length) {
      const originalType = originalQuizData[index].quizType === 'MULTIPLE_CHOICE' ? '객관식' : '주관식';
      if (originalType !== type) {
        updateQuestionStatus(index, 'UPDATE');
      } else {
        // 다른 변경사항이 있는지 확인 후 상태 결정
        const hasOtherChanges = hasQuestionChanged(index, quizContents[index]);
        updateQuestionStatus(index, hasOtherChanges ? 'UPDATE' : 'KEEP');
      }
    }
  };

  const handleContentChange = (index, value) => {
    const updatedContents = [...quizContents];
    updatedContents[index] = {
      ...updatedContents[index],
      content: value,
    };
    setQuizContents(updatedContents);

    // 🚩 기존 문제라면 변경 여부 확인 후 상태 업데이트
    if (index < originalQuizData.length) {
      const hasChanged = hasQuestionChanged(index, updatedContents[index]);
      updateQuestionStatus(index, hasChanged ? 'UPDATE' : 'KEEP');
    }
  };

  const handleExplanationChange = (index, value) => {
    const updatedContents = [...quizContents];
    updatedContents[index] = {
      ...updatedContents[index],
      explanation: value,
    };
    setQuizContents(updatedContents);

    // 🚩 기존 문제라면 변경 여부 확인 후 상태 업데이트
    if (index < originalQuizData.length) {
      const hasChanged = hasQuestionChanged(index, updatedContents[index]);
      updateQuestionStatus(index, hasChanged ? 'UPDATE' : 'KEEP');
    }
  };

  const handleChoiceChange = (questionIndex, choiceIndex, value) => {
    const updatedContents = [...quizContents];
    const answerChoiceList = [...(updatedContents[questionIndex].answerChoiceList || [])];
    answerChoiceList[choiceIndex] = value;
    updatedContents[questionIndex].answerChoiceList = answerChoiceList;
    setQuizContents(updatedContents);

    // 🚩 상태 업데이트
    if (questionIndex < originalQuizData.length) {
      const hasChanged = hasQuestionChanged(questionIndex, updatedContents[questionIndex]);
      updateQuestionStatus(questionIndex, hasChanged ? 'UPDATE' : 'KEEP');
    }
  };

  const handleAnswerSelect = (questionIndex, choiceIndex) => {
    const updatedContents = [...quizContents];
    const selectedAnswer = updatedContents[questionIndex].answerChoiceList[choiceIndex] || '';
    updatedContents[questionIndex].answer = selectedAnswer;
    setQuizContents(updatedContents);

    // 🚩 상태 업데이트
    if (questionIndex < originalQuizData.length) {
      const hasChanged = hasQuestionChanged(questionIndex, updatedContents[questionIndex]);
      updateQuestionStatus(questionIndex, hasChanged ? 'UPDATE' : 'KEEP');
    }
  };

  const handleSubjectiveAnswerChange = (questionIndex, value) => {
    const updatedContents = [...quizContents];
    updatedContents[questionIndex].answer = value;
    setQuizContents(updatedContents);

    // 🚩 상태 업데이트
    if (questionIndex < originalQuizData.length) {
      const hasChanged = hasQuestionChanged(questionIndex, updatedContents[questionIndex]);
      updateQuestionStatus(questionIndex, hasChanged ? 'UPDATE' : 'KEEP');
    }
  };

  const handleFileChange = (index, e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => ({
      ...prev,
      [index]: files,
    }));

    setFilesByQuestion((prev) => ({
      ...prev,
      [index]: files,
    }));

    if (index < originalQuizData.length) {
      updateQuestionStatus(index, 'UPDATE');
    }
  };

  const handleExistingFileDelete = (questionIndex, fileIndex) => {
    setQuizContents((prev) => {
      const updated = [...prev];
      const files = [...(updated[questionIndex]?.files || [])];
      files.splice(fileIndex, 1);
      updated[questionIndex].files = files;
      return updated;
    });

    if (questionIndex < originalQuizData.length) {
      updateQuestionStatus(questionIndex, 'UPDATE');
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (isUpdating) return; 
    setIsUpdating(true);


    for (let index = 0; index < questionCount; index++) {
      const state = questionStates[index];
      const type = questionTypes[index];
      const content = quizContents[index]?.content?.trim();
      const answer = quizContents[index]?.answer?.trim();

      if (state.status === 'CREATE') {
        if (!content) {
          alert(`${index + 1}번 문제의 내용을 입력해주세요.`);
          return;
        }

        if (!type) {
          alert(`${index + 1}번 문제의 형식을 선택해주세요.`);
          return;
        }

        if (type === '객관식') {
          const choices = quizContents[index]?.answerChoiceList || [];
          const nonEmptyChoices = choices.filter((c) => c.trim() !== '');
          if (nonEmptyChoices.length < 2) {
            alert(`${index + 1}번 객관식 문제는 보기 2개 이상이 필요합니다.`);
            return;
          }
          if (!answer) {
            alert(`${index + 1}번 객관식 문제의 정답을 선택해주세요.`);
            return;
          }
        }

        if (type === '주관식' && !answer) {
          alert(`${index + 1}번 주관식 문제의 정답을 입력해주세요.`);
          return;
        }
      }
    }

    try {
      const allFiles = [];
      const questionFileIndices = {};

      let fileCountSoFar = 0;
      for (let i = 0; i < questionCount; i++) {
        const filesForQ = filesByQuestion[i] || [];
        questionFileIndices[i] = fileCountSoFar;
        fileCountSoFar += filesForQ.length;
        allFiles.push(...filesForQ);
      }

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

      const uploadPromises = allFiles.map((file, idx) =>
        axios.put(presignedUrls[idx].uploadUrl, file, {
          headers: { "Content-Type": file.type },
        })
      );
      await Promise.all(uploadPromises);

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

      const reviewQuizDTOList = [];
      for (let index = 0; index < questionCount; index++) {
        const type = questionTypes[index];
        const content = quizContents[index]?.content || "";
        const explanationInput = quizContents[index]?.explanation || "";
        const questionState = questionStates[index];

        const quizData = {
          reviewQuizId: questionState?.reviewQuizId || null, // 🚩 새 문제는 null, 기존 문제는 ID 유지
          status: questionState?.status || 'CREATE', // 🚩 상태 추가
          quizType: type === '객관식' ? 'MULTIPLE_CHOICE' : 'ESSAY_QUESTION',
          content,
          answerChoiceList: [],
          answer: "",
          files: [],
          explanation: explanationInput,
        };

        if (type === '객관식') {
          quizData.answerChoiceList = quizContents[index]?.answerChoiceList || [];
          quizData.answer = quizContents[index]?.answer || "";
        }

        if (type === '주관식') {
          quizData.answer = quizContents[index]?.answer || "";
        }

        const filesForThisQuestion = filesByQuestion[index] || [];
        if (filesForThisQuestion.length > 0) {
          const startIdx = questionFileIndices[index];
          quizData.files = fileInfoList.slice(startIdx, startIdx + filesForThisQuestion.length);
        } else {
          quizData.files = quizContents[index]?.files || [];
        }

        reviewQuizDTOList.push(quizData);
      }

      originalQuizData.forEach((originalQuiz, index) => {
        if (index >= questionCount || questionStates[index]?.status === 'DELETE') {
          reviewQuizDTOList.push({
            reviewQuizId: originalQuiz.reviewQuizId || originalQuiz.id,
            status: 'DELETE',
            quizType: originalQuiz.quizType,
            content: originalQuiz.content,
            answerChoiceList: originalQuiz.answerChoiceList || [],
            answer: originalQuiz.answer || '',
            files: originalQuiz.files || [],
            explanation: originalQuiz.explanation || '',
          });
        }
      });

      const payload = {
        title,
        trackType,
        reviewQuizDTOList,
      };

      const response = await API.put(`/admin/reviewQuiz/update/${reviewWeekId}`, payload);

      if (response.status === 200) {
        alert("퀴즈가 성공적으로 수정되었습니다.");
        navigate(`/admin/reviewQuiz/${trackType}`);
      } else {
        alert(`오류 발생: ${response.statusText}`);
      }
    } catch (err) {
      alert("요청 실패: " + (err.response?.data?.message || err.message));
      console.error("상세 오류:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const renderQuestionBlock = (index) => (
    <div key={index} className='flex flex-col px-10 py-8 sm:px-25 sm:py-20 bg-[#F6F6F6] border-[#232323] border-[0.5px] rounded-[15px] w-full sm:mt-20 mt-10'>
      <div className="flex justify-between items-center mb-5">
        <div className='flex items-center text-[15px] sm:text-[20px] fontSB'>
          Question {String(index + 1).padStart(2, '0')}.
        </div>
        <button
          type="button"
          className="text-[12px] sm:text-[14px] text-red-500 underline"
          onClick={() => handleDeleteQuestion(index)}
        >
          삭제
        </button>
      </div>

      {/* 나머지 렌더링 로직은 동일 */}
      <input
        type="text"
        placeholder='문제를 입력해주세요.'
        className='flex w-fit lg:w-[50%] sm:w-[74%] sm:text-[16px] text-[13px] sm:mt-10 mt-3 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[#949494] fontSB sm:px-5 sm:py-3 px-4 py-2'
        value={quizContents[index]?.content || ''}
        onChange={(e) => handleContentChange(index, e.target.value)}
      />

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
              <label key={i} className='flex items-center py-1 sm:py-2 sm:pl-5 fontRegular'>
                <input
                  type="radio"
                  name={`answer-${index}`}
                  className='w-5'
                  checked={quizContents[index]?.answer === (quizContents[index]?.answerChoiceList?.[i] || '')}
                  onChange={() => handleAnswerSelect(index, i)}
                />
                <input
                  type='text'
                  placeholder='보기를 입력해 주세요.'
                  className="flex ml-1.5 sm:ml-2.5 w-fit sm:text-[19px] text-[12.5px] text-[#121212] px-2 py-1"
                  value={quizContents[index]?.answerChoiceList?.[i] || ''}
                  onChange={(e) => handleChoiceChange(index, i, e.target.value)}
                />
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
            value={quizContents[index]?.answer || ''}
            onChange={(e) => handleSubjectiveAnswerChange(index, e.target.value)}
          />
        </>
      )}

      <div className="flex sm:mt-20 mt-8 sm:text-[20px] text-[15px] fontSB">파일 업로드</div>
      <label
        htmlFor={`file-upload-${index}`}
        className="flex w-fit sm:mt-10 mt-3 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] sm:px-5 sm:py-3 px-4 py-2 cursor-pointer"
      >
        <span className="sm:text-[14px] text-[9.5px] text-[#232323] underline">파일 선택</span>
        <input
          id={`file-upload-${index}`}
          type="file"
          multiple
          onChange={(e) => handleFileChange(index, e)}
          className="hidden"
        />

        <div className="ml-3 sm:text-[14px] text-[9.5px]">
          {selectedFiles[index] && selectedFiles[index].length > 0 ? (
            <ul className="text-[#232323] list-disc ml-5">
              {selectedFiles[index].map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <ul className="text-[#232323] ml-5">
              {quizContents[index]?.files?.map((file, i) => (
                <li key={i} className="flex items-center text-[13px] sm:text-[14px] mb-1">
                  <span className="mr-2">{file.fileName || file}</span>
                  <button
                    type="button"
                    onClick={() => handleExistingFileDelete(index, i)}
                    className="text-red-500 text-[11px] sm:text-[12px] underline cursor-pointer"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>

      <div className='flex sm:mt-20 mt-8 sm:text-[20px] text-[15px] fontSB'>해설 입력</div>
      <input
        type="text"
        placeholder='해설을 입력해주세요.'
        className='flex lg:w-[50%] sm:w-[74%] mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] sm:text-[16px] text-[12.5px] text-[#949494] fontSB sm:px-5 sm:py-3 px-4 py-2'
        value={quizContents[index]?.explanation || ''}
        onChange={(e) => handleExplanationChange(index, e.target.value)}
      />
    </div>
  );

  return (
    <div className='flex flex-col w-full lg:w-8/12 mx-auto min-h-screen px-10 sm:mb-40 mb-20 sm:mt-20 mt-10'>
      <div className='flex flex-col items-start sm:mt-50 mt-30 lg:w-8/12'>
        <AdminReviewTitle />
      </div>

      <div className='flex justify-start w-full sm:mt-14 mt-8 sm:pb-14 pb-8 border-b-[#232323] border-b-[2.57px]'>
        <Breadcrumb/>
      </div>

      <div className='flex w-full flex-col min-h-screen mb-40'>

        <div className='flex sm:mt-20 mt-18 sm:text-[20px] text-[17px] fontBold'>제목 입력</div>
        <input
          type="text"
          placeholder='제목을 입력해주세요.'
          className='flex w-fit sm:mt-10 mt-5 border-[#E5E5E5] border-[1.51px] rounded-[7px] sm:text-[16px] text-[12.5px] text-[#949494] fontSB sm:px-5 sm:py-3 px-4 py-2'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className='flex sm:mt-20 mt-8 sm:text-[20px] text-[17px] fontBold'>문제 갯수</div>
        <input
          type="number"
          placeholder='숫자만 입력해 주세요.'
          className='flex w-fit sm:mt-10 mt-5 border-[#E5E5E5] border-[1.51px] rounded-[7px] sm:text-[16px] text-[12.5px] text-[#949494] fontSB sm:px-5 sm:py-3 px-4 py-2'
          onChange={handleQuestionCountChange}
          value={questionCount}
          min={0}
        />

        {Array.from({ length: questionCount }).map((_, index) => renderQuestionBlock(index))}

        <div className='flex justify-end sm:mt-20 mt-10'>
          <button
            className={`flex items-center justify-center bg-[#3B79FF] text-white sm:px-5 sm:py-2 px-4 py-1.5 sm:ml-7 ml-2 text-[14px] sm:text-[15px] rounded-[6.45px] cursor-pointer${
              isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? '수정 중...' : '수정하기'}
          </button>
        </div>
      </div>
    </div>
  );
}