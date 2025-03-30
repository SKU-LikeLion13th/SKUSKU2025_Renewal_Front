import React from 'react'
import ReviewLocation from '../../../components/Review/ReviewLocation'
import ReviewBoard from '../../../components/Review/ReviewBoard'
import ReviewSearch from '../../../components/Review/ReviewSearch'

export default function Review() {
  const postsPerPage = 5; // 한 페이지에 표시할 게시물 개수
  const quizzes = [
    { Id: 1, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 2, title: "2주차 복습퀴즈", IsSubmit: "미제출", score: 0, total: 6 },
    { Id: 3, title: "3주차 복습퀴즈", IsSubmit: "미제출", score: 0, total: 7 },
    { Id: 4, title: "4주차 복습퀴즈", IsSubmit: "제출", score: 5, total: 8 },
    { Id: 5, title: "5주차 복습퀴즈", IsSubmit: "제출", score: 6, total: 9 },
  ];

  const totalPosts = quizzes.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className='flex mx-auto min-h-screen'>
      <div className='flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12'>
        <div className='flex fontBold text-[35px]'>
          파트별 복습공간
        </div>

        <div className='flex w-full mt-14 justify-start'>
          <ReviewLocation />
        </div>

        <div className='flex w-full mt-14 justify-center'>
          <ReviewBoard quizzes={quizzes} />
        </div>

        <div className='flex w-full'>
          <ReviewSearch totalPosts={totalPosts} totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}
