import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API from '../../../utils/axios';

export default function AdminReviewUpdate() {
  const { reviewWeekId, trackType } = useParams(); // URL 파라미터로 받는다고 가정
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [filesByQuestion, setFilesByQuestion] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [quizContents, setQuizContents] = useState([]); // 문제 내용, 답 등 담음

  // 1. 기존 퀴즈 데이터 불러오기 (수정 모드 초기화)
  useEffect(() => {
    if (!reviewWeekId) return;

    const fetchQuiz = async () => {
      try {
        const response = await API.get(`/reviewQuiz/${reviewWeekId}`);

        if (response.status === 200) {
          const data = response.data;

          // 제목 세팅 (예시는 첫번째 항목의 제목을 받아오나, 따로 API로 받아야 하면 수정)
          // API에서 제목이 따로 없으면, 직접 입력 받도록 수정 필요
          // 여기서는 trackType이 param에 있으니 제목은 빈 문자열 유지

          // 문제 갯수 세팅
          setQuestionCount(data.length);

          // 문제 유형, 내용, 답, 파일, 해설 세팅
          const types = data.map((q) => (q.quizType === 'MULTIPLE_CHOICE' ? '객관식' : '주관식'));
          setQuestionTypes(types);

          setQuizContents(
            data.map((q) => ({
              content: q.content,
              answerChoiceList: q.answerChoiceList || [],
              answer: q.answer || '',
              explanation: q.explanation || '',
              files: q.files ? (Array.isArray(q.files) ? q.files : [q.files]) : [],
            }))
          );

          // 기존 파일은 실제 File 객체가 아니라 url 정보임. 업로드 파일과는 별도로 관리할 수 있음
          // 편의를 위해 selectedFiles와 filesByQuestion 초기화는 비워둠
          setSelectedFiles({});
          setFilesByQuestion({});
        }
      } catch (err) {
        console.error('퀴즈 불러오기 실패', err);
      }
    };

    fetchQuiz();
  }, [reviewWeekId]);

  // 문제 수 변경 시 상태 관리
  const handleQuestionCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuestionCount(value);

      setQuestionTypes((prev) => {
        const updated = [...prev];
        while (updated.length < value) updated.push('');
        return updated.slice(0, value);
      });

      setQuizContents((prev) => {
        const updated = [...prev];
        while (updated.length < value) updated.push({
          content: '',
          answerChoiceList: [],
          answer: '',
          explanation: '',
          files: [],
        });
        return updated.slice(0, value);
      });

      // 문제 수 줄어들면 파일 상태도 정리
      setFilesByQuestion((prev) => {
        const copy = { ...prev };
        Object.keys(copy).forEach(key => {
          if (parseInt(key) >= value) delete copy[key];
        });
        return copy;
      });

      setSelectedFiles((prev) => {
        const copy = { ...prev };
        Object.keys(copy).forEach(key => {
          if (parseInt(key) >= value) delete copy[key];
        });
        return copy;
      });

    } else {
      setQuestionCount(0);
      setQuestionTypes([]);
      setQuizContents([]);
      setFilesByQuestion({});
      setSelectedFiles({});
    }
  };

  const handleTypeChange = (index, type) => {
    const updatedTypes = [...questionTypes];
    updatedTypes[index] = type;
    setQuestionTypes(updatedTypes);
  };

  const handleContentChange = (index, value) => {
    const updatedContents = [...quizContents];
    updatedContents[index] = {
      ...updatedContents[index],
      content: value,
    };
    setQuizContents(updatedContents);
  };

  const handleExplanationChange = (index, value) => {
    const updatedContents = [...quizContents];
    updatedContents[index] = {
      ...updatedContents[index],
      explanation: value,
    };
    setQuizContents(updatedContents);
  };

  // 객관식 보기 변경
  const handleChoiceChange = (questionIndex, choiceIndex, value) => {
    const updatedContents = [...quizContents];
    const answerChoiceList = [...(updatedContents[questionIndex].answerChoiceList || [])];
    answerChoiceList[choiceIndex] = value;
    updatedContents[questionIndex].answerChoiceList = answerChoiceList;
    setQuizContents(updatedContents);
  };

  // 객관식 정답 선택 변경
  const handleAnswerSelect = (questionIndex, choiceIndex) => {
    const updatedContents = [...quizContents];
    const selectedAnswer = updatedContents[questionIndex].answerChoiceList[choiceIndex] || '';
    updatedContents[questionIndex].answer = selectedAnswer;
    setQuizContents(updatedContents);
  };

  // 주관식 정답 변경
  const handleSubjectiveAnswerChange = (questionIndex, value) => {
    const updatedContents = [...quizContents];
    updatedContents[questionIndex].answer = value;
    setQuizContents(updatedContents);
  };

  // 파일 선택 변경
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
  };

  const handleUpdate = async () => {
    try {
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

      // 5) 각 문제별 files 배열 채우기 및 DTO 준비
      const reviewQuizDTOList = [];
      for (let index = 0; index < questionCount; index++) {
        const type = questionTypes[index];
        const content = quizContents[index]?.content || "";
        const explanationInput = quizContents[index]?.explanation || "";

        const quizData = {
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
          // 기존에 있는 파일 url 정보가 있으면 그거 쓰도록
          quizData.files = quizContents[index]?.files || [];
        }

        reviewQuizDTOList.push(quizData);
      }

      // 6) payload 준비
      const payload = {
        title,
        trackType,
        reviewQuizDTOList,
      };

      // 7) 수정 API 호출
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
    }
  };

  const renderQuestionBlock = (index) => (
    <div key={index} className='flex flex-col px-25 py-20 bg-[#F6F6F6] border-[#232323] border-[0.5px] rounded-[15px] w-full mt-20'>
      <div className='flex text-[20px] fontSB'>Question {String(index + 1).padStart(2, '0')}.</div>
      <input
        type="text"
        placeholder='문제를 입력해주세요.'
        className='flex lg:w-[50%] sm:w-[74%] mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3'
        value={quizContents[index]?.content || ''}
        onChange={(e) => handleContentChange(index, e.target.value)}
      />

      <div className='flex w-fit mt-20 text-[20px] fontSB'>문제 형식</div>
      <div className='flex flex-col justify-around max-w-fit sm:flex-row px-4 mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px]'>
        {['객관식', '주관식'].map((type) => (
          <label key={type} className='flex text-[16px] text-[#232323] fontSB px-5 py-3'>
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
          <div className='flex mt-20 text-[20px] fontSB'>보기 입력</div>
          <div className='flex flex-col w-full px-4 py-7 mt-10 bg-[#FFFFFF] border-[#232323] border-[1px] rounded-[7px]'>
            {[...Array(5)].map((_, i) => (
              <label key={i} className='flex items-center py-2 pl-5 fontRegular'>
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
                  className="flex ml-2.5 w-[180px] text-[19px] text-[#121212] px-2 py-1"
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
          <div className='flex mt-20 text-[20px] fontSB'>정답 입력</div>
          <input
            type="text"
            placeholder='정답을 입력해주세요.'
            name={`subjective-answer-${index}`}
            className='flex w-[400px] mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3'
            value={quizContents[index]?.answer || ''}
            onChange={(e) => handleSubjectiveAnswerChange(index, e.target.value)}
          />
        </>
      )}

      {/* 파일첨부 input 추가 */}
      <div className="flex mt-20 text-[20px] fontSB">파일 업로드</div>
      <label
        htmlFor={`file-upload-${index}`}
        className="flex w-fit mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] px-5 py-3 cursor-pointer"
      >
        <span className="text-[14px] text-[#232323] underline">파일 선택</span>
        <input
          id={`file-upload-${index}`}
          type="file"
          multiple
          onChange={(e) => handleFileChange(index, e)}
          className="hidden"
        />

        <div className="ml-3 text-[14px]">
          {selectedFiles[index] && selectedFiles[index].length > 0 ? (
            <ul className="text-[#232323] list-disc ml-5">
              {selectedFiles[index].map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <ul className="text-[#232323] list-disc ml-5">
              {quizContents[index]?.files?.map((file, i) => (
                <li key={i}>{file.fileName || file}</li>
              ))}
            </ul>
          )}
        </div>
      </label>

      <div className='flex mt-20 text-[20px] fontSB'>해설 입력</div>
      <input
        type="text"
        placeholder='해설을 입력해주세요.'
        className='flex lg:w-[50%] sm:w-[74%] mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3'
        value={quizContents[index]?.explanation || ''}
        onChange={(e) => handleExplanationChange(index, e.target.value)}
      />
    </div>
  );

  return (
    <div className='flex flex-col justify-start w-full min-h-screen mb-40 px-10'>
      <div className='flex mt-20 text-[20px] fontBold'>제목 입력</div>
      <input
        type="text"
        placeholder='제목을 입력해주세요.'
        className='flex w-[400px] mt-10 border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className='flex mt-20 text-[20px] fontBold'>문제 갯수</div>
      <input
        type="number"
        placeholder='숫자만 입력해 주세요.'
        className='flex w-[400px] mt-10 border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3'
        onChange={handleQuestionCountChange}
        value={questionCount}
        min={0}
      />

      {Array.from({ length: questionCount }).map((_, index) => renderQuestionBlock(index))}

      <div className='flex justify-end mt-20'>
        <div
          className='flex bg-[#3B79FF] text-white px-5 py-2 ml-7 rounded-[6.45px] cursor-pointer'
          onClick={handleUpdate}
        >
          수정하기
        </div>
      </div>
    </div>
  );
}
