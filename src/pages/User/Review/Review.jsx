import React from 'react'
import ReviewLocation from '../../../components/ReviewLocation'
import ReviewBoard from '../../../components/ReviewBoard'

export default function Review() {
  
  return (
    <div className='flex mx-auto min-h-screen'>
      <div className='flex flex-col w-8/12 mt-30 mx-auto justify-start'>
        {/* Title */}
        <div className='flex fontBold text-[35px]'>
          파트별 복습공간
        </div>
        
        {/* Location */}
        <div className='flex w-full mt-14 justify-start'>
          <ReviewLocation />
        </div>

        {/* Content */}
        <div className='flex w-full mt-14 justify-center'>
          <ReviewBoard />
        </div>
      </div>
    </div>
  )
}
