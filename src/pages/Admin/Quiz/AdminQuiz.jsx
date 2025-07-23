import React from 'react'
import AdminReviewTitle from '../Review/AdminReviewTitle'
import ReviewLocation from '../../User/Review/ReviewLocation'
import AdminQuizContent from './AdminQuizContent'

export default function AdminQuiz() {
  return (
    <div className='flex min-h-screen mx-auto'>
      <div className='flex flex-col justify-start w-9/12 mx-auto sm:mt-50 mt-30 lg:w-8/12'>
        <AdminReviewTitle />
        
        <div className='flex justify-start w-full sm:mt-14 mt-8 sm:pb-14 pb-8 border-b-[#232323] border-b-[2.57px]'>
          <ReviewLocation />
        </div>

        <div className='flex w-full'>
          <AdminQuizContent />
        </div>
      </div>
    </div>
  )
}