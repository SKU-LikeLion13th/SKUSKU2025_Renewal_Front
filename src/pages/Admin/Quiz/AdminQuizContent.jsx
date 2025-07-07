import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../utils/axios';

export default function AdminQuizContent() {
  const [questionCount, setQuestionCount] = useState(1);
  const [questionTypes, setQuestionTypes] = useState([]);
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
    } else {
      setQuestionCount(0);
      setQuestionTypes([]);
    }
  };

  const handleTypeChange = (index, type) => {
    const updatedTypes = [...questionTypes];
    updatedTypes[index] = type;
    setQuestionTypes(updatedTypes);
  };

  const handleSubmit = async () => {
    const title = document.querySelector("input[placeholder='제목을 입력해주세요.']").value;
    const reviewQuizDTOList = [];

    try {
      for (let index = 0; index < questionTypes.length; index++) {
        const type = questionTypes[index];
        const content = document.querySelectorAll("input[placeholder='문제를 입력해주세요.']")[index]?.value || "";
        const explanationInput = document.querySelectorAll("input[placeholder='해설을 입력해주세요.']")[index]?.value || "";

        const quizData = {
          quizType: type === '객관식' ? 'MULTIPLE_CHOICE' : 'ESSAY_QUESTION',
          content: content,
          answerChoiceList: [],
          answer: "",
          files: [],
          explanation: explanationInput
        };

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
          const answerInput = document.querySelectorAll("input[placeholder='정답을 입력해주세요.']")[index]?.value || "";
          quizData.answer = answerInput;
        }

        reviewQuizDTOList.push(quizData);
      }

      const payload = {
        title: title,
        trackType: 'BACKEND',
        reviewQuizDTOList: reviewQuizDTOList
      };

      const response = await API.post("/admin/reviewQuiz/add", payload);

      if (response.status === 201 || response.status === 200) {
        alert("퀴즈가 성공적으로 등록되었습니다.");
        navigate('/admin/adminreview');
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
      <input type="text" placeholder='문제를 입력해주세요.' className='flex lg:w-[50%] sm:w-[74%] mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3' />

      <div className='flex mt-20 text-[20px] fontSB'>문제 형식</div>
      <div className='flex flex-col justify-between min-w-fit w-[50%] sm:flex-row px-4 mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px]'>
        {['객관식', '주관식'].map((type) => (
          <label key={type} className='flex text-[16px] text-[#232323] fontSB px-5 py-3'>
            <div className="flex mr-2.5 w-fit">{type}</div>
            <input
              type="radio"
              name={`quizType-${index}`}
              value={type}
              className='w-5'
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
                <input type="radio" name={`answer-${index}`} className='w-5' />
                <input type='text' placeholder='보기를 입력해 주세요.' className="flex ml-2.5 w-[180px] text-[19px] text-[#121212] px-2 py-1" />
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
          />
        </>
      )}

      <div className='flex mt-20 text-[20px] fontSB'>해설 입력</div>
      <input type="text" placeholder='해설을 입력해주세요.' className='flex lg:w-[50%] sm:w-[74%] mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3' />
    </div>
  );

  return (
    <div className='flex flex-col justify-start w-full min-h-screen mb-40'>
      <div className='flex mt-20 text-[20px] fontBold'>제목 입력</div>
      <input type="text" placeholder='제목을 입력해주세요.' className='flex w-[400px] mt-10 border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3' />

      <div className='flex mt-20 text-[20px] fontBold'>문제 갯수</div>
      <input
        type="number"
        placeholder='숫자만 입력해 주세요.'
        className='flex w-[400px] mt-10 border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3'
        onChange={handleQuestionCountChange}
        min={0}
      />

      {Array.from({ length: questionCount }).map((_, index) => renderQuestionBlock(index))}

      <div className='flex justify-end mt-20'>
        <div className='flex bg-[#E9E9E9] text-[#838383] px-5 py-2 rounded-[6.45px] cursor-pointer'>나가기</div>
        <div
          className='flex bg-[#3B79FF] text-white px-5 py-2 ml-7 rounded-[6.45px] cursor-pointer'
          onClick={handleSubmit}
        >
          등록하기
        </div>
      </div>
    </div>
  );
}
