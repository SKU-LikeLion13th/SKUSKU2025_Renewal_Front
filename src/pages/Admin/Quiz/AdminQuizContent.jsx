import React, { useState } from 'react';

export default function AdminQuizContent() {
  const [questionCount, setQuestionCount] = useState(1);
  const [questionTypes, setQuestionTypes] = useState([]);

  const handleQuestionCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuestionCount(value);
      setQuestionTypes(Array(value).fill(''));
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

  const renderQuestionBlock = (index) => (
    <div key={index} className='flex flex-col px-25 py-20 bg-[#F6F6F6] border-[#232323] border-[0.5px] rounded-[15px] w-full mt-20'>
      <div className='flex text-[20px] fontSB'>Question {String(index + 1).padStart(2, '0')}.</div>
      <input type="text" placeholder='문제를 입력해주세요.' className='flex w-[400px] mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3'/>

      <div className='flex mt-20 text-[20px] fontSB'>문제 형식</div>
      <div className='flex justify-between px-4 mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] md:min-w-[70%] lg:max-w-[55%]'>
        {['객관식', '주관식', '파일첨부'].map((type) => (
          <label key={type} className='flex text-[16px] text-[#232323] fontSB px-5 py-3'>
            <div className="flex mr-2.5">{type}</div>
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
                <img src="/assets/images/delete.png" alt="close" className='flex ml-2.5 w-4.5 h-4.5' />
              </label>
            ))}
          </div>
        </>
      )}

      {questionTypes[index] === '파일첨부' && (
        <div className='flex items-center mt-20'>
          <div className='flex text-[20px] fontSB'>파일 업로드</div>
          <div className='flex'>
            <label className='flex items-center ml-10 w-[300px] h-[40px] border-[1.18px] border-[#7D7D7D] rounded-md px-4 py-3 bg-white cursor-pointer text-[#9B9B9B] text-[15px] fontRegular'>
              <input type='file' className='hidden text-[#353535]' />
              파일선택 <span className='text-[#A6A6A6] ml-2'>또는 여기로 파일을 끌어오세요.</span>
            </label>
          </div>
        </div>
      )}

      {/* 주관식일 때는 아무것도 렌더링하지 않음 */}
      {questionTypes[index] === '주관식' && null}
          </div>
        );

  return (
    <div className='flex flex-col justify-start w-full min-h-screen mb-40'>
      <div className='flex mt-20 text-[20px] fontBold'>제목 입력</div>
      <input type="text" placeholder='제목을 입력해주세요.' className='flex w-[400px] mt-10 border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3'/>

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
        <div className='flex bg-[#3B79FF] text-white px-5 py-2 ml-7 rounded-[6.45px] cursor-pointer'>등록하기</div>
      </div>
    </div>
  );
}
