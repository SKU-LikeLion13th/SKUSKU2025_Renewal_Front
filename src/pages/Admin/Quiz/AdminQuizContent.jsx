import React from 'react'

export default function AdminQuizContent() {
  return (
    <div className='flex flex-col justify-start w-full min-h-screen mb-40'>
      <div className='flex mt-20 text-[20px] fontBold'>제목 입력</div>
      <input type="text" placeholder='제목을 입력해주세요.' className='flex w-[400px] mt-10 border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3'/>

      <div className='flex mt-20 text-[20px] fontBold'>문제 갯수</div>
      <input type="number" placeholder='숫자만 입력해 주세요.' className='flex w-[400px] mt-10 border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3'/>

      <div className='flex flex-col px-25 py-20 bg-[#F6F6F6] border-[#232323] border-[0.5px] rounded-[15px] w-full mt-20'>
        <div className='flex text-[20px] fontSB'>Question 01.</div>
        <input type="text" placeholder='문제를 입력해주세요.' className='flex w-[400px] mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px] text-[16px] text-[#949494] fontSB px-5 py-3'/>

        <div className='flex mt-20 text-[20px] fontSB'>문제 형식</div>
        <div className='flex justify-between w-[400px] px-4 mt-10 bg-[#FFFFFF] border-[#E5E5E5] border-[1.51px] rounded-[7px]'>
          <label className='flex text-[16px] text-[#232323] fontSB px-5 py-3'>
            <div className="flex mr-2.5">객관식</div>
            <input type="radio" name='quizType' value='객관식' className='w-5' />
          </label>
          
          <label className='flex text-[16px] text-[#232323] fontSB px-5 py-3'>
            <div className="flex mr-2.5">주관식</div>
            <input type="radio" name='quizType' value='주관식' className='w-5' />
          </label>
          
          <label className='flex text-[16px] text-[#232323] fontSB px-5 py-3'>
            <div className="flex mr-2.5">파일첨부</div>
            <input type="radio" name='quizType' value='파일첨부' className='w-5' />
          </label>
        </div>

        <div className='flex mt-20 text-[20px] fontSB'>보기 입력</div>
        <div className='flex flex-col w-full px-4 py-7 mt-10 bg-[#FFFFFF] border-[#232323] border-[1px] rounded-[7px]'>
          <label className='flex items-center py-2 pl-5 fontRegular'>
            <input type="radio" name='quizType' value='객관식' className='w-5' />
            <input type='text' placeholder='보기를 입력해 주세요.' className="flex ml-2.5 w-[180px] text-[19px] text-[#121212] px-2 py-1"/ >
            <img src="/assets/images/delete.png" alt="close" className='flex ml-2.5 w-4.5 h-4.5' />
          </label>

          <label className='flex items-center py-2 pl-5 fontRegular'>
            <input type="radio" name='quizType' value='객관식' className='w-5' />
            <input type='text' placeholder='보기를 입력해 주세요.' className="flex ml-2.5 w-[180px] text-[19px] text-[#121212] px-2 py-1"/ >
            <img src="/assets/images/delete.png" alt="close" className='flex ml-2.5 w-4.5 h-4.5' />
          </label>

          <label className='flex items-center py-2 pl-5 fontRegular'>
            <input type="radio" name='quizType' value='객관식' className='w-5' />
            <input type='text' placeholder='보기를 입력해 주세요.' className="flex ml-2.5 w-[180px] text-[19px] text-[#121212] px-2 py-1"/ >
            <img src="/assets/images/delete.png" alt="close" className='flex ml-2.5 w-4.5 h-4.5' />
          </label>

          <label className='flex items-center py-2 pl-5 fontRegular'>
            <input type="radio" name='quizType' value='객관식' className='w-5' />
            <input type='text' placeholder='보기를 입력해 주세요.' className="flex ml-2.5 w-[180px] text-[19px] text-[#121212] px-2 py-1"/ >
            <img src="/assets/images/delete.png" alt="close" className='flex ml-2.5 w-4.5 h-4.5' />
          </label>

          <label className='flex items-center py-2 pl-5 fontRegular'>
            <input type="radio" name='quizType' value='객관식' className='w-5' />
            <input type='text' placeholder='보기를 입력해 주세요.' className="flex ml-2.5 w-[180px] text-[19px] text-[#121212] px-2 py-1"/ >
            <img src="/assets/images/delete.png" alt="close" className='flex ml-2.5 w-4.5 h-4.5' />
          </label>
        </div>
      </div>

      <div className='flex justify-end mt-20'>
        <div className='flex bg-[#E9E9E9] text-[#838383] px-5 py-2 rounded-[6.45px]'>나가기</div>
        <div className='flex bg-[#3B79FF] text-white px-5 py-2 ml-7 rounded-[6.45px]'>등록하기</div>
      </div>
    </div>
  )
}